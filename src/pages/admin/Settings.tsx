
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Upload, Save, User, Building, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock settings data
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Repair Guru',
    email: 'contact@repairguru.com',
    phone: '(555) 123-4567',
    address: '123 Repair Street, Fixitville, CA 95123',
    description: 'We provide high-quality repair services for homes and businesses.'
  });
  
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User',
    email: 'admin@repairguru.com',
    password: '',
    confirmPassword: ''
  });
  
  const [logo, setLogo] = useState('/lovable-uploads/d2bdb4e4-28b6-4d6d-97ae-1f356bc7cd37.png');
  const [logoPreview, setLogoPreview] = useState('');
  
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  
  const handleBusinessInfoChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAdminInfoChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBusinessUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (logoPreview) {
        setLogo(logoPreview);
      }
      
      toast({
        title: "Settings Updated",
        description: "Your business information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleAdminUpdate = (e) => {
    e.preventDefault();
    
    if (adminInfo.password !== adminInfo.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setAdminInfo(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      
      toast({
        title: "Admin Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your business and account settings</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details and profile</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBusinessUpdate} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden border w-40 h-40 flex items-center justify-center bg-gray-100">
                    <img 
                      src={logoPreview || logo} 
                      alt="Business Logo" 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => document.getElementById('logo-upload').click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                  <input
                    type="file"
                    id="logo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Business Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="name" 
                          name="name" 
                          value={businessInfo.name} 
                          onChange={handleBusinessInfoChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Business Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={businessInfo.email} 
                          onChange={handleBusinessInfoChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Business Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={businessInfo.phone} 
                          onChange={handleBusinessInfoChange} 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">Business Address</label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={businessInfo.address} 
                        onChange={handleBusinessInfoChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Business Description</label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      rows={4} 
                      value={businessInfo.description} 
                      onChange={handleBusinessInfoChange} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="gap-2" disabled={loading}>
                  {loading ? 'Saving...' : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Account</CardTitle>
            <CardDescription>Update your personal account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="admin-name" className="text-sm font-medium">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="admin-name" 
                      name="name" 
                      value={adminInfo.name} 
                      onChange={handleAdminInfoChange} 
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="admin-email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="admin-email" 
                      name="email" 
                      type="email" 
                      value={adminInfo.email} 
                      onChange={handleAdminInfoChange} 
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-base font-medium mb-2">Change Password</h3>
                <p className="text-sm text-gray-500 mb-4">Leave blank if you don't want to change your password</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">New Password</label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      value={adminInfo.password} 
                      onChange={handleAdminInfoChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={adminInfo.confirmPassword} 
                      onChange={handleAdminInfoChange} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="gap-2" disabled={loading}>
                  {loading ? 'Updating...' : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
