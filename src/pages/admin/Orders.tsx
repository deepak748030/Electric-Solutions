
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Orders = () => {
  // Mock orders data
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-001', 
      customer: 'John Doe', 
      email: 'john@example.com',
      phone: '555-123-4567',
      service: 'AC Repair', 
      price: 120,
      date: '2023-07-12', 
      status: 'Completed',
      address: '123 Main St, Anytown, CA'
    },
    { 
      id: 'ORD-002', 
      customer: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '555-987-6543',
      service: 'Plumbing', 
      price: 85,
      date: '2023-07-11', 
      status: 'In Progress',
      address: '456 Oak Ave, Somewhere, CA'
    },
    { 
      id: 'ORD-003', 
      customer: 'Michael Brown', 
      email: 'michael@example.com',
      phone: '555-555-5555',
      service: 'Electrical', 
      price: 150,
      date: '2023-07-10', 
      status: 'Pending',
      address: '789 Pine St, Nowhere, CA'
    },
    { 
      id: 'ORD-004', 
      customer: 'David Wilson', 
      email: 'david@example.com',
      phone: '555-888-9999',
      service: 'Painting', 
      price: 200,
      date: '2023-07-09', 
      status: 'Completed',
      address: '321 Elm Rd, Anyplace, CA'
    },
    { 
      id: 'ORD-005', 
      customer: 'Sarah Johnson', 
      email: 'sarah@example.com',
      phone: '555-777-8888',
      service: 'Cleaning', 
      price: 75,
      date: '2023-07-08', 
      status: 'Cancelled',
      address: '654 Birch Blvd, Someplace, CA'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewOrder, setViewOrder] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  // Filter orders by status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? 
      { ...order, status: newStatus } : 
      order
    ));
    setViewOrder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-500 mt-1">Manage customer bookings and service orders</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            className="pl-10 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-4 w-4" />
          <span className="text-sm text-gray-500">Status:</span>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">View</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                          <DialogDescription>
                            Complete information about this order.
                          </DialogDescription>
                        </DialogHeader>
                        
                        {viewOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Order ID</h4>
                                <p className="font-medium">{viewOrder.id}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Date</h4>
                                <p>{viewOrder.date}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                              <p className="font-medium">{viewOrder.customer}</p>
                              <p className="text-sm">{viewOrder.email}</p>
                              <p className="text-sm">{viewOrder.phone}</p>
                              <p className="text-sm mt-1">{viewOrder.address}</p>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Service Details</h4>
                              <p className="font-medium">{viewOrder.service}</p>
                              <p className="text-sm text-green-600 font-semibold">${viewOrder.price.toFixed(2)}</p>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Order Status</h4>
                              <div className="flex items-center space-x-4 mt-2">
                                <Select
                                  value={editStatus || viewOrder.status}
                                  onValueChange={setEditStatus}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <DialogFooter className="flex gap-2 sm:justify-between">
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button onClick={() => handleStatusChange(viewOrder.id, editStatus || viewOrder.status)}>
                              Update Status
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No orders found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
