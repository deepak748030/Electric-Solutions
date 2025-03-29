import { useEffect, useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Search, X } from 'lucide-react'
import Button from "@/components/common/Button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"
import axios from "axios"
import { toast } from "sonner"
import RazorpayPayment from "../components/payment/razorpay-payment"
//  enter your full address 
// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Services = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get("location") || "")
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("")
  const [selectedOthers, setSelectedOthers] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [userData, setUserData] = useState<any | null>(null)
  const [bookingInProgress, setBookingInProgress] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [orderAddress, setOrderAddress] = useState("")
  const [paymentMode, setPaymentMode] = useState("cod") // Default to cash on delivery

  // Get unique categories and locations from services
  const availableCategories = [...new Set(services.map(service => service.category))]
  const availableLocations = [...new Set(services.flatMap(service => service.locations || []))]

  // Pagination settings
  const servicesPerPage = 6

  // Function to get services data
  const getServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data?.services || []);
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  // Update URL parameters
  const updateUrlParams = (location: string, category: string) => {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (category) params.set("category", category)
    setSearchParams(params)
  }

  // Handle filter changes
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value)
    updateUrlParams(value, selectedCategory)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    updateUrlParams(selectedLocation, value)
  }

  // Handle direct booking
  const handleDirectBooking = async (service) => {
    if (bookingInProgress) return;

    if (!userData || !userData._id) {
      navigate("/auth/login");
      return;
    }

    setSelectedService(service);

    // Set initial address from user data
    setOrderAddress(userData?.address || "");

    // Show address confirmation modal
    setShowAddressModal(true);
  }

  // Proceed to payment after address confirmation
  const proceedToPayment = () => {
    if (!orderAddress.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }

    setShowAddressModal(false);
    setShowPaymentModal(true);
  }

  // Complete booking process
  const completeBooking = async (paymentDetails = null) => {
    if (!selectedService || !userData?._id) return;

    setBookingInProgress(true);

    try {
      const orderData = {
        userId: userData._id,
        customer: userData.name,
        phone: userData.mobile || "",
        service: selectedService.title,
        price: parseInt(selectedService.price.replace(/[^\d]/g, "")),
        date: new Date().toISOString(),
        status: "Pending",
        address: orderAddress,
        paymentMode: paymentMode,
        paymentDetails: paymentDetails || null
      };

      await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success("Service booked successfully!");
      setShowPaymentModal(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/auth/login");
        return;
      }
      toast.error(error.response?.data?.message || "Failed to book service");
    } finally {
      setBookingInProgress(false);
    }
  }

  // Handle payment mode selection
  const handlePaymentModeSelection = async (mode) => {
    setPaymentMode(mode);

    if (mode === "cod") {
      // For cash on delivery, complete booking directly
      await completeBooking();
    }
    // For online payment, the RazorpayPayment component will handle it
  }

  // Handle successful Razorpay payment
  const handlePaymentSuccess = (paymentDetails) => {
    completeBooking({
      id: paymentDetails.razorpay_payment_id,
      orderId: paymentDetails.razorpay_order_id,
      signature: paymentDetails.razorpay_signature
    });
  }

  // Get user data from local storage
  const getUserFromLocalStorage = async () => {
    try {
      const authData = localStorage.getItem('auth')
      if (authData) {
        const parsedData = JSON.parse(authData)
        setUserData(parsedData?.user || null)

        // If no user ID, redirect to login
        if (!parsedData?.user?._id) {
          navigate("/auth/login");
        }
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error('Error retrieving user data:', error)
      setUserData(null)
      navigate("/auth/login");
    }
  }

  // Effect to fetch services and user data on component mount
  useEffect(() => {
    getServices()
    getUserFromLocalStorage()
  }, [])

  // Apply filters to services
  const applyFilters = () => {
    let filtered = [...services]

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((service) =>
        service.locations && service.locations.includes(selectedLocation)
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    // Filter by price range
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map((price) => Number.parseInt(price.replace(/[^\d]/g, "")))

      filtered = filtered.filter((service) => {
        const servicePrice = Number.parseInt(service.price.replace(/[^\d]/g, ""))
        if (max) {
          return servicePrice >= min && servicePrice <= max
        } else {
          // For "2000+" case
          return servicePrice >= min
        }
      })
    }

    // Sort by "Others" filter
    if (selectedOthers) {
      switch (selectedOthers) {
        case "most-popular":
          filtered = filtered.filter((service) => service.type === "popular")
          break
        case "highest-rated":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        default:
          break
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredServices(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Get current services for pagination
  const getCurrentServices = () => {
    const indexOfLastService = currentPage * servicesPerPage
    const indexOfFirstService = indexOfLastService - servicesPerPage
    return filteredServices.slice(indexOfFirstService, indexOfLastService)
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Effect to apply filters when services or filter values change
  useEffect(() => {
    if (services.length > 0) {
      applyFilters()
    }
  }, [services, selectedCategory, selectedPriceRange, selectedOthers, searchQuery, selectedLocation])

  // Effect to handle URL parameter changes
  useEffect(() => {
    const locationParam = searchParams.get("location")
    const categoryParam = searchParams.get("category")

    if (locationParam !== selectedLocation) {
      setSelectedLocation(locationParam || "")
    }
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam || "")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb Banner */}
      <div className="bg-gray-800 text-white py-20 px-4 mt-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Our Services</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-blue">Our Services</span>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Location Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">Location</div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {availableLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">Category</div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">Price Range</div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="0-500">₹0 - ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="1000-2000">₹1000 - ₹2000</option>
                  <option value="2000+">₹2000+</option>
                </select>
              </div>
            </div>

            {/* Others Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">Others</div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedOthers}
                  onChange={(e) => setSelectedOthers(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="most-popular">Most Popular</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getCurrentServices().length > 0 ? (
              getCurrentServices().map((service) => (
                <div key={service._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg?height=200&width=300"}
                      alt={service.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-blue/90 text-white text-xs px-3 py-1 rounded-full">
                      {service.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white font-bold text-brand-blue px-3 py-1 rounded-full shadow">
                      ₹{service.price}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>

                    <div className="flex items-center mb-4">
                      <img
                        src={service.providerImage || "/placeholder.svg?height=50&width=50"}
                        alt={service.providerName}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">{service.providerName}</span>

                      <div className="ml-auto flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= Math.round(service.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        {/* <span className="ml-1 text-xs text-gray-500">({service.reviews})</span> */}
                      </div>
                    </div>

                    <Button
                      fullWidth
                      variant="primary"
                      className="bg-brand-blue text-white"
                      onClick={() => handleDirectBooking(service)}
                      disabled={bookingInProgress}
                    >
                      {bookingInProgress ? "Booking..." : "Book Now"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No services found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredServices.length > 0 && (
            <div className="flex flex-start my-8 justify-start">
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}
                        href="#"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(currentPage + 1)
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Delivery Address</h2>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Please confirm or update your delivery address:</p>
              <textarea
                value={orderAddress}
                onChange={(e) => setOrderAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter your full address & mobile"
              />
            </div>

            <Button
              fullWidth
              variant="primary"
              className="bg-brand-blue text-white"
              onClick={proceedToPayment}
              disabled={!orderAddress.trim()}
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Payment Method</h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => handlePaymentModeSelection("cod")}>
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  checked={paymentMode === "cod"}
                  onChange={() => setPaymentMode("cod")}
                  className="mr-3"
                />
                <label htmlFor="cod" className="flex-grow cursor-pointer">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when your service is delivered</p>
                </label>
              </div>

              <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={() => handlePaymentModeSelection("online")}>
                <input
                  type="radio"
                  id="online"
                  name="payment"
                  checked={paymentMode === "online"}
                  onChange={() => setPaymentMode("online")}
                  className="mr-3"
                />
                <label htmlFor="online" className="flex-grow cursor-pointer">
                  <p className="font-medium">Pay Online</p>
                  <p className="text-sm text-gray-500">Pay securely with Razorpay</p>
                </label>
              </div>
            </div>

            {paymentMode === "online" && selectedService && (
              <RazorpayPayment
                amount={parseInt(selectedService.price.replace(/[^\d]/g, ""))}
                name={selectedService.title}
                email={userData?.email}
                phone={userData?.mobile}
                onSuccess={handlePaymentSuccess}
              />
            )}

            {paymentMode === "cod" && (
              <Button
                fullWidth
                variant="primary"
                className="bg-brand-blue text-white"
                onClick={() => completeBooking()}
                disabled={bookingInProgress}
              >
                {bookingInProgress ? "Processing..." : "Confirm Order"}
              </Button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Services
