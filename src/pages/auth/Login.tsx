
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Google } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log({ email, password, rememberMe });
    // For demo purposes, navigate to home after form submission
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb banner */}
      <div className="bg-gray-800 text-white py-10 px-4 mt-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-blue">Login</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <img src="/public/lovable-uploads/f4ff55b6-3170-4526-9347-e8eb769d7e87.png" alt="Repair Guru Logo" className="h-12 mb-4" />
            <CardTitle className="text-2xl font-bold">Log In To Repair Guru</CardTitle>
            <CardDescription>
              Welcome back! Login with your data you entered during registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">Remember Me</Label>
                </div>
                <Link to="/auth/forgot-password" className="text-sm text-brand-blue hover:underline">
                  Forgot Password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-darkBlue">
                Log In
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">OR</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" type="button">
              <Google className="mr-2 h-4 w-4" />
              Sign In With Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-brand-blue font-medium hover:underline">
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
