
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  LogOut, 
  Settings, 
  ShoppingCart 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data
  const user = {
    name: 'Admin User',
    email: 'admin@repairguru.com',
    phone: '(555) 987-6543',
    role: 'Administrator',
    joinDate: 'January 15, 2023',
    address: '456 Admin Ave, Managerville, CA 95678',
    profileImage: 'https://api.dicebear.com/6.x/initials/svg?seed=AU&backgroundColor=0369a1'
  };
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <p className="text-gray-500 mt-1">View and manage your account information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 border">
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-brand-blue font-medium">{user.role}</p>
              
              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {user.phone}
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Member since {user.joinDate}
                </div>
                <div className="flex items-start text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400 shrink-0" />
                  <span>{user.address}</span>
                </div>
              </div>
              
              <div className="w-full mt-6 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/orders')}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Orders
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Quick access to important functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer" onClick={() => navigate('/admin')}>
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-brand-blue/10">
                    <User className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dashboard</h3>
                    <p className="text-sm text-gray-500">View analytics and stats</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 hover:bg-green-100 transition-colors cursor-pointer" onClick={() => navigate('/admin/categories')}>
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-green-100">
                    <Settings className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Categories</h3>
                    <p className="text-sm text-gray-500">Manage service categories</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer" onClick={() => navigate('/admin/services')}>
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-purple-100">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Services</h3>
                    <p className="text-sm text-gray-500">Manage services & pricing</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                <CardContent className="p-6 flex items-center">
                  <div className="mr-4 p-2 rounded-full bg-amber-100">
                    <ShoppingCart className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Orders</h3>
                    <p className="text-sm text-gray-500">Manage customer bookings</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
