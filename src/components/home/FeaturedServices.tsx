import React, { useEffect, useState } from 'react';
import ServiceCard from '@/components/common/ServiceCard';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import RazorpayPayment from '@/components/payment/razorpay-payment';

const API_URL = import.meta.env.VITE_API_URL;
// enter your full 
const FeaturedServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [orderAddress, setOrderAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("cod");

  // Fetch services
  const getServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services?type=featured&limit=6`);
      setServices(response.data?.services);
    } catch (error) {
      console.error('Error fetching featured services:', error);
    }
  };

  // Get user data from local storage
  const getUserFromLocalStorage = async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsedData = JSON.parse(authData);
        setUserData(parsedData?.user || null);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setUserData(null);
    }
  };

  // Handle direct booking
  const handleBookNowClick = async (service) => {
    if (bookingInProgress) return;

    if (!userData || !userData._id) {
      navigate("/auth/login");
      return;
    }

    setSelectedService(service);
    setOrderAddress(userData?.address || "");
    setShowAddressModal(true);
  };

  // Proceed to payment after address confirmation
  const proceedToPayment = () => {
    if (!orderAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a delivery address",
        variant: "destructive"
      });
      return;
    }

    setShowAddressModal(false);
    setShowPaymentModal(true);
  };

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

      toast({
        title: "Success",
        description: "Service booked successfully!"
      });
      setShowPaymentModal(false);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/auth/login");
        return;
      }
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to book service",
        variant: "destructive"
      });
    } finally {
      setBookingInProgress(false);
    }
  };

  // Handle payment mode selection
  const handlePaymentModeSelection = async (mode) => {
    setPaymentMode(mode);

    if (mode === "cod") {
      await completeBooking();
    }
  };

  // Handle successful Razorpay payment
  const handlePaymentSuccess = (paymentDetails) => {
    completeBooking({
      id: paymentDetails.razorpay_payment_id,
      orderId: paymentDetails.razorpay_order_id,
      signature: paymentDetails.razorpay_signature
    });
  };

  useEffect(() => {
    getServices();
    getUserFromLocalStorage();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Featured Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The following are the Featured services offered by Pro Found Expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              price={service.price}
              image={service.image}
              category={service.category}
              providerName={service.providerName}
              providerImage={service.providerImage}
              rating={service.rating}
              reviews={service.reviews}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
              onBookNow={() => handleBookNowClick(service)}
            />
          ))}
        </div>

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
                  placeholder="Enter your full address & Phone number"
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
      </div>
    </section>
  );
};

export default FeaturedServices;