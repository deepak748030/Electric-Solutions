import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { LightbulbIcon as LucideProps } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Custom Google icon since it's not available in lucide-react
const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || 'currentColor'}
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M17.13 17.21c-1.4 1.3-3.16 2.04-5.03 2.04a8.27 8.27 0 1 1 0-16.54c2.2 0 4.13.86 5.61 2.25l-2.3 2.37a4.67 4.67 0 0 0-3.33-1.29 5.12 5.12 0 0 0-4.53 2.8 5.3 5.3 0 0 0 0 5.34 5.12 5.12 0 0 0 4.53 2.8c2.21 0 3.82-1.16 4.45-2.73h-4.44v-3.18h7.55c.12.69.2 1.31.2 2.1 0 2.6-.71 4.75-2.7 6.04z" />
  </svg>
);

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/login`, { mobile, password });

      if (res.data.success) {
        await localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb banner */}
      <div className="bg-gray-800 text-white py-20 px-4 mt-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Login</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-blue">Login</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center pb-20 pt-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <CardTitle className="text-2xl font-bold">Log In To Repair Guru</CardTitle>
            <CardDescription>
              Welcome back! Login with your mobile number and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number*</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
              <GoogleIcon className="mr-2 h-4 w-4" />
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
