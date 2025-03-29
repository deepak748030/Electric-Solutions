"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    ArrowRight,
    Pencil,
    Trash,
    Phone,
    MapPin,
    Package,
    Clock,
    Check,
    AlertTriangle,
    X,
    CreditCard,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function UserOrders() {
    const API_URL = import.meta.env.VITE_API_URL

    // User profile state
    const [profile, setProfile] = useState({
        name: "not available",
        mobile: "not available",
        avatar: "/placeholder.svg?height=200&width=200",
        address: "not available",
    })
    const [userId, setUserId] = useState()

    // Profile editing state
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [editedProfile, setEditedProfile] = useState({ ...profile })
    const [isProfileUpdateLoading, setIsProfileUpdateLoading] = useState(false)

    // Order editing state
    const [editingOrder, setEditingOrder] = useState(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [orderToDelete, setOrderToDelete] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getDataFromLocalStorage = () => {
            try {
                const res = localStorage.getItem("auth")
                if (res) {
                    const data = JSON.parse(res)
                    if (data?.user?._id) {
                        setUserId(data.user._id)
                        const userData = {
                            _id: data.user?._id || "",
                            name: data.user?.name || "Not Available",
                            mobile: data.user?.mobile || "Not Available",
                            avatar: data.user?.avatar || "/placeholder.svg?height=200&width=200",
                            address: data.user?.address || "Not Available",
                        }
                        setProfile(userData)
                        setEditedProfile(userData)
                    }
                }
            } catch (error) {
                console.error("Error parsing user data:", error)
            }
        }

        getDataFromLocalStorage()
    }, [])

    useEffect(() => {
        if (userId) {
            getOrders()
        }
    }, [userId])

    // Orders state
    const [orders, setOrders] = useState([])
    const [filterStatus, setFilterStatus] = useState("all")

    // Loading states
    const [isLoading, setIsLoading] = useState({
        orders: false,
        orderAction: false,
    })

    // Check if any order is pending (to enable profile editing)
    const hasPendingOrder = orders.some((order) => order.status?.toLowerCase() === "pending")

    // Update profile information
    const handleUpdateProfile = async () => {
        setIsProfileUpdateLoading(true)
        try {
            // Get the current auth data
            const authData = JSON.parse(localStorage.getItem("auth"))

            // Update the user data
            const updatedUser = {
                ...authData.user,
                mobile: editedProfile.mobile,
                address: editedProfile.address,
            }

            // Update in localStorage
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    ...authData,
                    user: updatedUser,
                }),
            )

            // Update API call
            const res = await axios.patch(`${API_URL}/users/profile/${userId}`, {
                mobile: editedProfile.mobile,
                address: editedProfile.address,
            })

            // Update state
            setProfile(editedProfile)
            setIsEditingProfile(false)

            toast({
                title: "Success",
                description: "Profile updated successfully.",
            })
        } catch (error) {
            console.error("Error updating profile:", error)
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsProfileUpdateLoading(false)
        }
    }

    // Fetch user orders
    const getOrders = async () => {
        if (!userId) return
        setIsLoading((prev) => ({ ...prev, orders: true }))

        try {
            const res = await axios.get(`${API_URL}/orders/user/${userId}`)
            if (res.data.success) {
                setOrders(res.data.orders)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setIsLoading((prev) => ({ ...prev, orders: false }))
        }
    }

    // Delete order
    const handleDeleteOrder = async () => {
        if (!orderToDelete) return

        setIsLoading((prev) => ({ ...prev, orderAction: true }))
        try {
            const res = await axios.delete(`${API_URL}/orders/${orderToDelete._id}`)
            if (res.data.success) {
                setOrders(orders.filter((order) => order._id !== orderToDelete._id))
                toast({
                    title: "Success",
                    description: "Order cancelled successfully.",
                })
                setIsDeleteDialogOpen(false)
                setOrderToDelete(null)
            }
        } catch (error) {
            console.error("Error deleting order:", error)
            toast({
                title: "Error",
                description: "Failed to cancel order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, orderAction: false }))
        }
    }

    // Update order address only
    const handleUpdateOrderAddress = async () => {
        if (!editingOrder) return

        setIsLoading((prev) => ({ ...prev, orderAction: true }))
        try {
            const updateData = {
                address: editingOrder.address,
            }

            const res = await axios.patch(`${API_URL}/orders/${editingOrder._id}`, updateData)
            if (res.data.success) {
                setOrders(orders.map((order) => (order._id === editingOrder._id ? { ...order, ...updateData } : order)))
                toast({
                    title: "Success",
                    description: "Order address updated successfully.",
                })
                setEditingOrder(null)
            }
        } catch (error) {
            console.error("Error updating order:", error)
            toast({
                title: "Error",
                description: "Failed to update order address. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, orderAction: false }))
        }
    }

    // Format date
    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy")
        } catch (error) {
            return dateString
        }
    }

    // Get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            case "cancelled":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            case "in progress":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    const onLogout = async () => {
        await localStorage.removeItem("auth")
        navigate("/auth/login")
    }

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return <Check className="h-4 w-4" />
            case "pending":
                return <Clock className="h-4 w-4" />
            case "cancelled":
                return <X className="h-4 w-4" />
            case "in progress":
                return <Package className="h-4 w-4" />
            default:
                return <AlertTriangle className="h-4 w-4" />
        }
    }

    // Check if order is editable (only pending orders can be edited)
    const isOrderEditable = (order) => {
        return order.status?.toLowerCase() === "pending"
    }

    // Filter orders by status
    const filteredOrders =
        filterStatus === "all"
            ? orders
            : orders.filter((order) => order.status?.toLowerCase() === filterStatus.toLowerCase())

    // Get unique statuses for filter
    const uniqueStatuses = Array.from(new Set(orders.map((order) => order.status))).filter(Boolean)

    // Load data on component mount
    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Breadcrumb Banner */}
            <Navbar />
            <div className="bg-gray-800 text-white py-20 px-4 mt-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Profile</h1>
                    <div className="flex items-center text-sm space-x-2">
                        <Link to="/" className="hover:text-brand-blue transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-brand-blue">Profile</span>
                    </div>
                </div>
            </div>

            <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-16">
                <div className="container mx-auto px-4">
                    {/* User Profile Summary */}
                    <div className="mb-10">
                        <Card>
                            <CardContent className="p-6">
                                {!isEditingProfile ? (
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {/* <div className="rounded-full overflow-hidden h-24 w-24 bg-white border-4 border-blue-100">
                                            <img
                                                src={profile.avatar || "/placeholder.svg?height=200&width=200"}
                                                alt={profile.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div> */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                                            <div className="flex flex-col md:flex-row gap-4 mt-2 text-gray-600">
                                                <div className="flex items-center justify-center md:justify-start gap-2">
                                                    <Phone className="h-4 w-4 text-blue-600" />
                                                    <span>{profile.mobile}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-600">
                                                <MapPin className="h-4 w-4 text-blue-600" />
                                                <span>{profile.address}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {/* Edit profile button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditingProfile(true)}
                                                className="hidden md:flex items-center gap-1"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit Profile
                                            </Button>

                                            {/* Logout button for larger screens */}
                                            <button className="hidden md:block bg-red-500 text-white px-4 py-2 rounded" onClick={onLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-center md:text-left">Edit Profile</h2>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <label htmlFor="mobile" className="text-sm font-medium">
                                                    Mobile Number
                                                </label>
                                                <Input
                                                    id="mobile"
                                                    type="tel"
                                                    value={editedProfile.mobile}
                                                    onChange={(e) => setEditedProfile({ ...editedProfile, mobile: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="address" className="text-sm font-medium">
                                                Address
                                            </label>
                                            <Textarea
                                                id="address"
                                                value={editedProfile.address}
                                                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                                                rows={3}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditingProfile(false)
                                                    setEditedProfile({ ...profile })
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={handleUpdateProfile} disabled={isProfileUpdateLoading}>
                                                {isProfileUpdateLoading ? (
                                                    <>
                                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    "Save Changes"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {/* Mobile edit button and logout button */}
                                {!isEditingProfile && (
                                    <div className="md:hidden mt-4 flex flex-col gap-2">
                                        <Button variant="outline" onClick={() => setIsEditingProfile(true)} className="w-full">
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                        <button className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded" onClick={onLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orders Section */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-2xl font-bold">My Orders</h2>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Filter:</span>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        {uniqueStatuses.map((status) => (
                                            <SelectItem key={status} value={status.toLowerCase()}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isLoading.orders ? (
                            <div className="text-center py-10">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                                <p className="mt-4 text-gray-600">Loading your orders...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-10">
                                    <Package className="h-16 w-16 text-gray-300 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                                    <p className="text-gray-500 text-center max-w-md mb-6">
                                        You haven't placed any orders yet. Browse our services and place your first order.
                                    </p>
                                    <Button>
                                        Browse Services
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <>
                                {/* Desktop view */}
                                <div className="hidden md:block">
                                    <Card>
                                        <CardContent className="p-0">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Order ID</TableHead>
                                                        <TableHead>Service</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Date</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Payment Method</TableHead>
                                                        <TableHead>Address</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {filteredOrders.map((order) => (
                                                        <TableRow key={order._id}>
                                                            <TableCell className="font-medium">{order.orderId}</TableCell>
                                                            <TableCell>{order.service}</TableCell>
                                                            <TableCell>₹{order.price}</TableCell>
                                                            <TableCell>{formatDate(order.date)}</TableCell>
                                                            <TableCell>
                                                                <Badge className={getStatusColor(order.status)} variant="outline">
                                                                    <span className="flex items-center gap-1">
                                                                        {getStatusIcon(order.status)}
                                                                        {order.status}
                                                                    </span>
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-1">
                                                                    <CreditCard className="h-4 w-4 text-blue-600" />
                                                                    <span>{order.paymentMethod}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="max-w-xs truncate">{order.address}</TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                onClick={() => setEditingOrder({ ...order })}
                                                                                disabled={!isOrderEditable(order)}
                                                                            >
                                                                                <Pencil className="h-4 w-4" />
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent className="sm:max-w-[500px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle>Update Order Address</DialogTitle>
                                                                                <DialogDescription>
                                                                                    You can update the delivery address for this order.
                                                                                </DialogDescription>
                                                                            </DialogHeader>
                                                                            {editingOrder && (
                                                                                <div className="grid gap-4 py-4">
                                                                                    <div className="grid gap-2">
                                                                                        <label htmlFor="order-address" className="text-sm font-medium">
                                                                                            Address
                                                                                        </label>
                                                                                        <Textarea
                                                                                            id="order-address"
                                                                                            value={editingOrder.address}
                                                                                            onChange={(e) =>
                                                                                                setEditingOrder({
                                                                                                    ...editingOrder,
                                                                                                    address: e.target.value,
                                                                                                })
                                                                                            }
                                                                                            rows={3}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <DialogFooter>
                                                                                <DialogClose asChild>
                                                                                    <Button variant="outline">Cancel</Button>
                                                                                </DialogClose>
                                                                                <Button onClick={handleUpdateOrderAddress} disabled={isLoading.orderAction}>
                                                                                    {isLoading.orderAction ? (
                                                                                        <>
                                                                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                                                                            Updating...
                                                                                        </>
                                                                                    ) : (
                                                                                        "Update Address"
                                                                                    )}
                                                                                </Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>

                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                        onClick={() => {
                                                                            setOrderToDelete(order)
                                                                            setIsDeleteDialogOpen(true)
                                                                        }}
                                                                        disabled={!isOrderEditable(order)}
                                                                    >
                                                                        <Trash className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Mobile view */}
                                <div className="grid grid-cols-1 gap-4 md:hidden">
                                    {filteredOrders.map((order) => (
                                        <Card key={order._id} className="overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-base">{order.orderId}</h3>
                                                        <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                                                    </div>
                                                    <Badge className={getStatusColor(order.status)} variant="outline">
                                                        <span className="flex items-center gap-1">
                                                            {getStatusIcon(order.status)}
                                                            {order.status}
                                                        </span>
                                                    </Badge>
                                                </div>

                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium">Service:</span>
                                                        <span className="text-sm">{order.service}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium">Price:</span>
                                                        <span className="text-sm">₹{order.price}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-4 w-4 text-blue-600" />
                                                        <span className="text-sm font-medium">Payment:</span>
                                                        <span className="text-sm">{order.paymentMethod}</span>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                        <span className="text-sm">{order.address}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setEditingOrder({ ...order })}
                                                                disabled={!isOrderEditable(order)}
                                                            >
                                                                <Pencil className="h-4 w-4 mr-1" /> Edit Address
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[500px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Update Order Address</DialogTitle>
                                                                <DialogDescription>
                                                                    You can update the delivery address for this order.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            {editingOrder && (
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="grid gap-2">
                                                                        <label htmlFor="order-address-mobile" className="text-sm font-medium">
                                                                            Address
                                                                        </label>
                                                                        <Textarea
                                                                            id="order-address-mobile"
                                                                            value={editingOrder.address}
                                                                            onChange={(e) =>
                                                                                setEditingOrder({
                                                                                    ...editingOrder,
                                                                                    address: e.target.value,
                                                                                })
                                                                            }
                                                                            rows={3}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <Button onClick={handleUpdateOrderAddress} disabled={isLoading.orderAction}>
                                                                    {isLoading.orderAction ? (
                                                                        <>
                                                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                                                            Updating...
                                                                        </>
                                                                    ) : (
                                                                        "Update Address"
                                                                    )}
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => {
                                                            setOrderToDelete(order)
                                                            setIsDeleteDialogOpen(true)
                                                        }}
                                                        disabled={!isOrderEditable(order)}
                                                    >
                                                        <Trash className="h-4 w-4 mr-1" /> Cancel
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* Delete Order Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cancel Order</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this order? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        {orderToDelete && (
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Order ID:</span>
                                    <span>{orderToDelete.orderId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Service:</span>
                                    <span>{orderToDelete.service}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Price:</span>
                                    <span>₹{orderToDelete.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Payment Method:</span>
                                    <span>{orderToDelete.paymentMethod}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">No, Keep Order</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDeleteOrder} disabled={isLoading.orderAction}>
                            {isLoading.orderAction ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                    Cancelling...
                                </>
                            ) : (
                                "Yes, Cancel Order"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Footer />
        </div>
    )
}

