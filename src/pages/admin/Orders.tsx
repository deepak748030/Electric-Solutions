"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Pencil, Phone, Mail, MapPin, CreditCard } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [editingOrder, setEditingOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

  const getOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`)
      if (res.data.success) {
        setOrders(res.data.orders)
        // console.log(res.data.orders)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const handleEditOrder = (order) => {
    setEditingOrder({
      ...order,
    })
  }

  const handleUpdateOrder = async () => {
    if (!editingOrder) return

    try {
      const res = await axios.patch(`${API_URL}/orders/${editingOrder._id}`, {
        status: editingOrder.status,
      })

      if (res.data.success) {
        getOrders()
        setEditingOrder(null)
      }
    } catch (error) {
      console.error("Error updating order:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error) {
      return dateString
    }
  }

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filterStatus.toLowerCase())

  const uniqueStatuses = Array.from(new Set(orders.map((order) => order.status))).filter(Boolean)

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Manage customer orders and service requests</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        <div className="text-sm text-gray-500">
          {filteredOrders.length} of {orders.length} orders
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.customer}</span>
                        <span className="text-xs text-muted-foreground">{order.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>₹{order.price}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{order.paymentMethod} </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Order Status</DialogTitle>
                            <DialogDescription>Change the status of order {order.orderId}.</DialogDescription>
                          </DialogHeader>

                          {editingOrder && (
                            <div className="py-4">
                              <div className="space-y-4 mb-4">
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">Order ID:</span>
                                  <span className="text-sm font-medium">{editingOrder.orderId}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">Customer:</span>
                                  <span className="text-sm">{editingOrder.customer}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">Service:</span>
                                  <span className="text-sm">{editingOrder.service}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">Price:</span>
                                  <span className="text-sm">₹{editingOrder.price}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="text-sm font-medium text-muted-foreground">Payment:</span>
                                  <span className="text-sm">{editingOrder.pyamentMethod}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label htmlFor="status" className="text-sm font-medium">
                                  Status
                                </label>
                                <Select
                                  value={editingOrder.status.toLowerCase()}
                                  onValueChange={(value) =>
                                    setEditingOrder({
                                      ...editingOrder,
                                      status: value.charAt(0).toUpperCase() + value.slice(1),
                                    })
                                  }
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={handleUpdateOrder}>Update Order</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {filteredOrders.map((order) => (
          <Card key={order._id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base">{order.orderId}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                </div>
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {order.status}
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
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Payment:</span>
                  <span className="text-sm">{order.paymentMethod}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Customer:</span>
                  <span className="text-sm">{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{order.address}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Update Order Status</DialogTitle>
                      <DialogDescription>Change the status of order {order.orderId}.</DialogDescription>
                    </DialogHeader>

                    {editingOrder && (
                      <div className="py-4">
                        <div className="space-y-4 mb-4">
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Order ID:</span>
                            <span className="text-sm font-medium">{editingOrder.orderId}</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Customer:</span>
                            <span className="text-sm">{editingOrder.customer}</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Service:</span>
                            <span className="text-sm">{editingOrder.service}</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Price:</span>
                            <span className="text-sm">₹{editingOrder.price}</span>
                          </div>
                          <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-sm font-medium text-muted-foreground">Payment:</span>
                            <span className="text-sm">{editingOrder.paymentMethod}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="status-mobile" className="text-sm font-medium">
                            Status
                          </label>
                          <Select
                            value={editingOrder.status.toLowerCase()}
                            onValueChange={(value) =>
                              setEditingOrder({
                                ...editingOrder,
                                status: value.charAt(0).toUpperCase() + value.slice(1),
                              })
                            }
                          >
                            <SelectTrigger id="status-mobile">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleUpdateOrder}>Update Order</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Orders
