"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { LightbulbIcon as LucideProps } from "lucide-react"
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"
// Custom Google icon since it's not available in lucide-react
const GoogleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M17.13 17.21c-1.4 1.3-3.16 2.04-5.03 2.04a8.27 8.27 0 1 1 0-16.54c2.2 0 4.13.86 5.61 2.25l-2.3 2.37a4.67 4.67 0 0 0-3.33-1.29 5.12 5.12 0 0 0-4.53 2.8 5.3 5.3 0 0 0 0 5.34 5.12 5.12 0 0 0 4.53 2.8c2.21 0 3.82-1.16 4.45-2.73h-4.44v-3.18h7.55c.12.69.2 1.31.2 2.1 0 2.6-.71 4.75-2.7 6.04z" />
  </svg>
)

const Register = () => {
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!mobile || mobile.length < 10) {
      alert("Please enter a valid mobile number")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to send OTP
      const res = await axios.post(`${API_URL}/users/send-otp`, { mobile })
      if (res.data.success) {
        setOtpSent(true)
        alert("OTP sent to your mobile number")
      } else {
        alert(res.data.message)
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!otp || otp.length < 6) {
      alert("Please enter a valid OTP")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to verify OTP
      const res = await axios.post(`${API_URL}/users/verify-otp`, { mobile, otp })
      if (res.data.success) {
        setOtpVerified(true)
        alert("OTP verified successfully")
      } else {
        alert(res.data.message)
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpVerified) {
      alert("Please verify your mobile number first")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to register the user
      const res = await axios.post(`${API_URL}/users/register`, { name, mobile, password })
      if (res.data.success) {
        alert("Registration successful")
        navigate("/auth/login")
      } else {
        alert(res.data.message)
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb banner */}
      <div className="bg-gray-800 text-white py-10 px-4 mt-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Register</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-blue">Register</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <CardTitle className="text-2xl font-bold">Sign Up To Repair Guru</CardTitle>
            <CardDescription>Register with your mobile number and verify with OTP</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number*</Label>
                <div className="flex space-x-2">
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={otpSent}
                    required
                  />
                  {!otpVerified && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading || otpSent}
                      className="whitespace-nowrap"
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP*</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <Button type="button" onClick={handleVerifyOtp} disabled={isLoading}>
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-darkBlue"
                disabled={!otpVerified || isLoading}
              >
                Create Account
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
  )
}

export default Register

