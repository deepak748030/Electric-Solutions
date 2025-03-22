
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the password reset logic
    console.log({ email });
    
    // Show success toast
    toast.success("Password reset link has been sent to your email", {
      description: "Please check your inbox and follow the instructions"
    });
    
    // For demo purposes, navigate to login after form submission
    setTimeout(() => {
      navigate('/auth/login');
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb banner */}
      <div className="bg-gray-800 text-white py-10 px-4 mt-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-blue">Forgot Password</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <img src="/public/lovable-uploads/f4ff55b6-3170-4526-9347-e8eb769d7e87.png" alt="Repair Guru Logo" className="h-12 mb-4" />
            <CardTitle className="text-2xl font-bold">Forget Your Password?</CardTitle>
            <CardDescription>
              Did you forget your password? Don't worry. Please submit below form using your email, and get a new password link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your registered email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                Send Reset Link
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-brand-blue font-medium hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
