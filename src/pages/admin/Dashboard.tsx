
import React from 'react';
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
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package 
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Customers',
      value: '2,420',
      icon: <Users className="h-8 w-8 text-blue-500" />,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: '1,210',
      icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Total Revenue',
      value: '$24,300',
      icon: <DollarSign className="h-8 w-8 text-purple-500" />,
      change: '+20%',
      changeType: 'positive'
    },
    {
      title: 'Total Services',
      value: '85',
      icon: <Package className="h-8 w-8 text-amber-500" />,
      change: '+5',
      changeType: 'neutral'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', service: 'AC Repair', date: '12-07-2023', status: 'Completed', amount: '$120' },
    { id: 'ORD-002', customer: 'Jane Smith', service: 'Plumbing', date: '11-07-2023', status: 'In Progress', amount: '$85' },
    { id: 'ORD-003', customer: 'Michael Brown', service: 'Electrical', date: '10-07-2023', status: 'Pending', amount: '$150' },
    { id: 'ORD-004', customer: 'David Wilson', service: 'Painting', date: '09-07-2023', status: 'Completed', amount: '$200' },
    { id: 'ORD-005', customer: 'Sarah Johnson', service: 'Cleaning', date: '08-07-2023', status: 'Cancelled', amount: '$75' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the RepairGuru admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 
                    stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 orders placed on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{order.date}</TableCell>
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
                  <TableCell>{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
