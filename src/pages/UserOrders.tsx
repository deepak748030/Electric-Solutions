"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { ArrowRight, Pencil, Trash, Phone, Mail, MapPin, Package, Clock, Check, AlertTriangle, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function UserOrders() {
    // User profile state
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        avatar: "/placeholder.svg?height=200&width=200",
    })

    // Orders state
    const [orders, setOrders] = useState([])
    const [filterStatus, setFilterStatus] = useState("all")

    // Addresses state
    const [addresses, setAddresses] = useState([])
    const [newAddress, setNewAddress] = useState({
        title: "",
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
    })
    const [editingAddress, setEditingAddress] = useState(null)

    // Loading states
    const [isLoading, setIsLoading] = useState({
        orders: false,
        addresses: false,
        addressAction: false,
    })

    // Fetch user orders
    const getOrders = async () => {
        setIsLoading((prev) => ({ ...prev, orders: true }))
        try {
            const res = await axios.get(`/api/user/orders`)
            if (res.data.success) {
                setOrders(res.data.orders)
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast({
                title: "Error",
                description: "Failed to load your orders. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, orders: false }))
        }
    }

    // Fetch user addresses
    const getAddresses = async () => {
        setIsLoading((prev) => ({ ...prev, addresses: true }))
        try {
            const res = await axios.get(`/api/user/addresses`)
            if (res.data.success) {
                setAddresses(res.data.addresses)
            }
        } catch (error) {
            console.error("Error fetching addresses:", error)
            toast({
                title: "Error",
                description: "Failed to load your addresses. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, addresses: false }))
        }
    }

    // Add new address
    const handleAddAddress = async () => {
        if (!newAddress.fullAddress || !newAddress.city || !newAddress.pincode) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        setIsLoading((prev) => ({ ...prev, addressAction: true }))
        try {
            const res = await axios.post(`/api/user/addresses`, newAddress)
            if (res.data.success) {
                getAddresses()
                setNewAddress({
                    title: "",
                    fullAddress: "",
                    city: "",
                    state: "",
                    pincode: "",
                    isDefault: false,
                })
                toast({
                    title: "Success",
                    description: "Address added successfully.",
                })
            }
        } catch (error) {
            console.error("Error adding address:", error)
            toast({
                title: "Error",
                description: "Failed to add address. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, addressAction: false }))
        }
    }

    // Update address
    const handleUpdateAddress = async () => {
        if (!editingAddress || !editingAddress.fullAddress || !editingAddress.city || !editingAddress.pincode) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        setIsLoading((prev) => ({ ...prev, addressAction: true }))
        try {
            const res = await axios.patch(`/api/user/addresses/${editingAddress._id}`, editingAddress)
            if (res.data.success) {
                getAddresses()
                setEditingAddress(null)
                toast({
                    title: "Success",
                    description: "Address updated successfully.",
                })
            }
        } catch (error) {
            console.error("Error updating address:", error)
            toast({
                title: "Error",
                description: "Failed to update address. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, addressAction: false }))
        }
    }

    // Delete address
    const handleDeleteAddress = async (id) => {
        setIsLoading((prev) => ({ ...prev, addressAction: true }))
        try {
            const res = await axios.delete(`/api/user/addresses/${id}`)
            if (res.data.success) {
                getAddresses()
                toast({
                    title: "Success",
                    description: "Address deleted successfully.",
                })
            }
        } catch (error) {
            console.error("Error deleting address:", error)
            toast({
                title: "Error",
                description: "Failed to delete address. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading((prev) => ({ ...prev, addressAction: false }))
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
        getAddresses()
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Breadcrumb Banner */}
            <div className="bg-gray-800 py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">My Account</h1>
                    <div className="flex justify-center text-gray-300">
                        <div className="flex items-center">
                            <span className="text-white">Home</span>
                            <span className="mx-2">/</span>
                            <span className="text-blue-400">My Account</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-16">
                <div className="container mx-auto px-4">
                    {/* User Profile Summary */}
                    <div className="mb-10">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="rounded-full overflow-hidden h-24 w-24 bg-white border-4 border-blue-100">
                                        <img
                                            src={profile.avatar || "/placeholder.svg"}
                                            alt={profile.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                                        <div className="flex flex-col md:flex-row gap-4 mt-2 text-gray-600">
                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <Mail className="h-4 w-4 text-blue-600" />
                                                <span>{profile.email}</span>
                                            </div>
                                            <div className="flex items-center justify-center md:justify-start gap-2">
                                                <Phone className="h-4 w-4 text-blue-600" />
                                                <span>{profile.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs for Orders and Addresses */}
                    <Tabs defaultValue="orders" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="orders" className="text-base py-3">
                                My Orders
                            </TabsTrigger>
                            <TabsTrigger value="addresses" className="text-base py-3">
                                My Addresses
                            </TabsTrigger>
                        </TabsList>

                        {/* Orders Tab */}
                        <TabsContent value="orders">
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
                                                                <TableHead>Address</TableHead>
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
                                                                    <TableCell className="max-w-xs truncate">{order.address}</TableCell>
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
                                                            <div className="flex items-start gap-2">
                                                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                <span className="text-sm">{order.address}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </TabsContent>

                        {/* Addresses Tab */}
                        <TabsContent value="addresses">
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <h2 className="text-2xl font-bold">My Addresses</h2>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>Add New Address</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle>Add New Address</DialogTitle>
                                                <DialogDescription>Add a new delivery address to your account.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <label htmlFor="title" className="text-sm font-medium">
                                                        Address Title
                                                    </label>
                                                    <Input
                                                        id="title"
                                                        placeholder="Home, Office, etc."
                                                        value={newAddress.title}
                                                        onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <label htmlFor="fullAddress" className="text-sm font-medium">
                                                        Full Address *
                                                    </label>
                                                    <Textarea
                                                        id="fullAddress"
                                                        placeholder="Street address, apartment, etc."
                                                        value={newAddress.fullAddress}
                                                        onChange={(e) => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                                                        rows={3}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <label htmlFor="city" className="text-sm font-medium">
                                                            City *
                                                        </label>
                                                        <Input
                                                            id="city"
                                                            placeholder="City"
                                                            value={newAddress.city}
                                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <label htmlFor="state" className="text-sm font-medium">
                                                            State
                                                        </label>
                                                        <Input
                                                            id="state"
                                                            placeholder="State"
                                                            value={newAddress.state}
                                                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <label htmlFor="pincode" className="text-sm font-medium">
                                                        Pincode *
                                                    </label>
                                                    <Input
                                                        id="pincode"
                                                        placeholder="Pincode"
                                                        value={newAddress.pincode}
                                                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="isDefault"
                                                        checked={newAddress.isDefault}
                                                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <label htmlFor="isDefault" className="text-sm font-medium">
                                                        Set as default address
                                                    </label>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button
                                                    onClick={handleAddAddress}
                                                    disabled={
                                                        isLoading.addressAction ||
                                                        !newAddress.fullAddress ||
                                                        !newAddress.city ||
                                                        !newAddress.pincode
                                                    }
                                                >
                                                    {isLoading.addressAction ? (
                                                        <>
                                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        "Save Address"
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {isLoading.addresses ? (
                                    <div className="text-center py-10">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                                        <p className="mt-4 text-gray-600">Loading your addresses...</p>
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center py-10">
                                            <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">No Addresses Saved</h3>
                                            <p className="text-gray-500 text-center max-w-md mb-6">
                                                You haven't saved any addresses yet. Add an address to make checkout faster.
                                            </p>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button>
                                                        Add Your First Address
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Add New Address</DialogTitle>
                                                        <DialogDescription>Add a new delivery address to your account.</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <label htmlFor="title-empty" className="text-sm font-medium">
                                                                Address Title
                                                            </label>
                                                            <Input
                                                                id="title-empty"
                                                                placeholder="Home, Office, etc."
                                                                value={newAddress.title}
                                                                onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <label htmlFor="fullAddress-empty" className="text-sm font-medium">
                                                                Full Address *
                                                            </label>
                                                            <Textarea
                                                                id="fullAddress-empty"
                                                                placeholder="Street address, apartment, etc."
                                                                value={newAddress.fullAddress}
                                                                onChange={(e) => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                                                                rows={3}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="grid gap-2">
                                                                <label htmlFor="city-empty" className="text-sm font-medium">
                                                                    City *
                                                                </label>
                                                                <Input
                                                                    id="city-empty"
                                                                    placeholder="City"
                                                                    value={newAddress.city}
                                                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <label htmlFor="state-empty" className="text-sm font-medium">
                                                                    State
                                                                </label>
                                                                <Input
                                                                    id="state-empty"
                                                                    placeholder="State"
                                                                    value={newAddress.state}
                                                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <label htmlFor="pincode-empty" className="text-sm font-medium">
                                                                Pincode *
                                                            </label>
                                                            <Input
                                                                id="pincode-empty"
                                                                placeholder="Pincode"
                                                                value={newAddress.pincode}
                                                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                id="isDefault-empty"
                                                                checked={newAddress.isDefault}
                                                                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <label htmlFor="isDefault-empty" className="text-sm font-medium">
                                                                Set as default address
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button
                                                            onClick={handleAddAddress}
                                                            disabled={
                                                                isLoading.addressAction ||
                                                                !newAddress.fullAddress ||
                                                                !newAddress.city ||
                                                                !newAddress.pincode
                                                            }
                                                        >
                                                            {isLoading.addressAction ? (
                                                                <>
                                                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                                                                    Saving...
                                                                </>
                                                            ) : (
                                                                "Save Address"
                                                            )}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {addresses.map((address) => (
                                            <Card key={address._id} className={address.isDefault ? "border-blue-500" : ""}>
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                                {address.title || "Address"}
                                                                {address.isDefault && (
                                                                    <Badge variant="outline" className="bg-blue-100 text-blue-800 ml-2">
                                                                        Default
                                                                    </Badge>
                                                                )}
                                                            </h3>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm" onClick={() => setEditingAddress(address)}>
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[500px]">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Address</DialogTitle>
                                                                        <DialogDescription>Update your delivery address details.</DialogDescription>
                                                                    </DialogHeader>
                                                                    {editingAddress && (
                                                                        <div className="grid gap-4 py-4">
                                                                            <div className="grid gap-2">
                                                                                <label htmlFor="edit-title" className="text-sm font-medium">
                                                                                    Address Title
                                                                                </label>
                                                                                <Input
                                                                                    id="edit-title"
                                                                                    placeholder="Home, Office, etc."
                                                                                    value={editingAddress.title}
                                                                                    onChange={(e) =>
                                                                                        setEditingAddress({ ...editingAddress, title: e.target.value })
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <label htmlFor="edit-fullAddress" className="text-sm font-medium">
                                                                                    Full Address *
                                                                                </label>
                                                                                <Textarea
                                                                                    id="edit-fullAddress"
                                                                                    placeholder="Street address, apartment, etc."
                                                                                    value={editingAddress.fullAddress}
                                                                                    onChange={(e) =>
                                                                                        setEditingAddress({ ...editingAddress, fullAddress: e.target.value })
                                                                                    }
                                                                                    rows={3}
                                                                                />
                                                                            </div>
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                <div className="grid gap-2">
                                                                                    <label htmlFor="edit-city" className="text-sm font-medium">
                                                                                        City *
                                                                                    </label>
                                                                                    <Input
                                                                                        id="edit-city"
                                                                                        placeholder="City"
                                                                                        value={editingAddress.city}
                                                                                        onChange={(e) =>
                                                                                            setEditingAddress({ ...editingAddress, city: e.target.value })
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="grid gap-2">
                                                                                    <label htmlFor="edit-state" className="text-sm font-medium">
                                                                                        State
                                                                                    </label>
                                                                                    <Input
                                                                                        id="edit-state"
                                                                                        placeholder="State"
                                                                                        value={editingAddress.state}
                                                                                        onChange={(e) =>
                                                                                            setEditingAddress({ ...editingAddress, state: e.target.value })
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="grid gap-2">
                                                                                <label htmlFor="edit-pincode" className="text-sm font-medium">
                                                                                    Pincode *
                                                                                </label>
                                                                                <Input
                                                                                    id="edit-pincode"
                                                                                    placeholder="Pincode"
                                                                                    value={editingAddress.pincode}
                                                                                    onChange={(e) =>
                                                                                        setEditingAddress({ ...editingAddress, pincode: e.target.value })
                                                                                    }
                                                                                />
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id="edit-isDefault"
                                                                                    checked={editingAddress.isDefault}
                                                                                    onChange={(e) =>
                                                                                        setEditingAddress({ ...editingAddress, isDefault: e.target.checked })
                                                                                    }
                                                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                                />
                                                                                <label htmlFor="edit-isDefault" className="text-sm font-medium">
                                                                                    Set as default address
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    <DialogFooter>
                                                                        <DialogClose asChild>
                                                                            <Button variant="outline">Cancel</Button>
                                                                        </DialogClose>
                                                                        <Button
                                                                            onClick={handleUpdateAddress}
                                                                            disabled={
                                                                                isLoading.addressAction ||
                                                                                !editingAddress?.fullAddress ||
                                                                                !editingAddress?.city ||
                                                                                !editingAddress?.pincode
                                                                            }
                                                                        >
                                                                            {isLoading.addressAction ? (
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
                                                                onClick={() => handleDeleteAddress(address._id)}
                                                                disabled={isLoading.addressAction}
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-gray-700">{address.fullAddress}</p>
                                                        <p className="text-gray-700">
                                                            {address.city}
                                                            {address.state ? `, ${address.state}` : ""} - {address.pincode}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <p className="text-center">© 2023 Your Service. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

// API Routes (would be in separate files in a real Next.js app, but included here as requested)

// GET /api/user/orders
export async function GET(req) {
    try {
        // This would normally fetch from a database
        const orders = [
            {
                _id: "ord1",
                orderId: "ORD-12345",
                service: "AC Repair",
                price: "1499",
                date: "2023-08-15",
                status: "Completed",
                address: "123 Main St, Apartment 4B, New Delhi, 110001",
            },
            {
                _id: "ord2",
                orderId: "ORD-12346",
                service: "Refrigerator Service",
                price: "999",
                date: "2023-09-20",
                status: "Pending",
                address: "456 Park Avenue, House 7, Mumbai, 400001",
            },
            {
                _id: "ord3",
                orderId: "ORD-12347",
                service: "Washing Machine Repair",
                price: "1299",
                date: "2023-10-05",
                status: "In Progress",
                address: "789 Garden Road, Flat 12C, Bangalore, 560001",
            },
        ]

        return Response.json({ success: true, orders })
    } catch (error) {
        console.error("Error in GET /api/user/orders:", error)
        return Response.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
    }
}

// GET /api/user/addresses
export async function getAddresses(req) {
    try {
        // This would normally fetch from a database
        const addresses = [
            {
                _id: "addr1",
                title: "Home",
                fullAddress: "123 Main St, Apartment 4B",
                city: "New Delhi",
                state: "Delhi",
                pincode: "110001",
                isDefault: true,
            },
            {
                _id: "addr2",
                title: "Office",
                fullAddress: "456 Business Park, Building C, Floor 5",
                city: "Gurgaon",
                state: "Haryana",
                pincode: "122001",
                isDefault: false,
            },
        ]

        return Response.json({ success: true, addresses })
    } catch (error) {
        console.error("Error in GET /api/user/addresses:", error)
        return Response.json({ success: false, error: "Failed to fetch addresses" }, { status: 500 })
    }
}

// POST /api/user/addresses
export async function addAddress(req) {
    try {
        const body = await req.json()

        // Validate required fields
        if (!body.fullAddress || !body.city || !body.pincode) {
            return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
        }

        // This would normally save to a database
        // For demo purposes, we'll just return success

        return Response.json({
            success: true,
            message: "Address added successfully",
            address: {
                _id: "new-addr-" + Date.now(),
                ...body,
            },
        })
    } catch (error) {
        console.error("Error in POST /api/user/addresses:", error)
        return Response.json({ success: false, error: "Failed to add address" }, { status: 500 })
    }
}

// PATCH /api/user/addresses/:id
export async function updateAddress(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()

        // Validate required fields
        if (!body.fullAddress || !body.city || !body.pincode) {
            return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
        }

        // This would normally update in a database
        // For demo purposes, we'll just return success

        return Response.json({
            success: true,
            message: "Address updated successfully",
            address: {
                _id: id,
                ...body,
            },
        })
    } catch (error) {
        console.error("Error in PATCH /api/user/addresses/:id:", error)
        return Response.json({ success: false, error: "Failed to update address" }, { status: 500 })
    }
}

// DELETE /api/user/addresses/:id
export async function deleteAddress(req, { params }) {
    try {
        const { id } = params

        // This would normally delete from a database
        // For demo purposes, we'll just return success

        return Response.json({
            success: true,
            message: "Address deleted successfully",
        })
    } catch (error) {
        console.error("Error in DELETE /api/user/addresses/:id:", error)
        return Response.json({ success: false, error: "Failed to delete address" }, { status: 500 })
    }
}

