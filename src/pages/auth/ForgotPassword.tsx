"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

const ForgotPassword = () => {
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!mobile || mobile.length < 10) {
      toast.error("Please enter a valid mobile number")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to send OTP
      const res = await axios.post(`${API_URL}/users/forgot-password-otp`, { mobile })
      if (res.data.success) {
        setOtpSent(true)
        toast.success("OTP sent to your mobile number")
      } else {
        toast.error(res.data.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to verify OTP
      const res = await axios.post(`${API_URL}/users/verify-forgot-password-otp`, { mobile, otp })
      if (res.data.success) {
        setOtpVerified(true)
        toast.success("OTP verified successfully")
      } else {
        toast.error(res.data.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpVerified) {
      toast.error("Please verify your mobile number first")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      // Here you would call your API to reset the password
      const res = await axios.post(`${API_URL}/users/reset-password`, {
        mobile,
        otp,
        newPassword,
      })

      if (res.data.success) {
        toast.success("Password reset successful")
        setTimeout(() => {
          navigate("/auth/login")
        }, 2000)
      } else {
        toast.error(res.data.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Password reset failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Breadcrumb banner */}
      <div className="bg-gray-800 text-white py-10 px-4 mt-16">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-blue">Forgot Password</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1 flex flex-col items-center text-center">
            <CardTitle className="text-2xl font-bold">Forget Your Password?</CardTitle>
            <CardDescription>Enter your mobile number to receive an OTP and reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {!otpVerified ? (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number*</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your registered mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      disabled={otpSent}
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading || (otpSent && !otpVerified)}
                      className="whitespace-nowrap"
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  </div>
                </div>

                {otpSent && (
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
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password*</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password*</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-darkBlue" disabled={isLoading}>
                  Reset Password
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
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

export default ForgotPassword

