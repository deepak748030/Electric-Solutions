"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import Button from "@/components/common/Button"

// API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL

interface RazorpayPaymentProps {
    amount: number
    name: string
    email: string
    phone: string
    onSuccess: (paymentDetails: any) => void
}

declare global {
    interface Window {
        Razorpay: any
    }
}

const RazorpayPayment = ({ amount, name, email, phone, onSuccess }: RazorpayPaymentProps) => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState("")

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)

        // Create order ID when component mounts
        createOrder()

        return () => {
            // Clean up script when component unmounts
            document.body.removeChild(script)
        }
    }, [])

    // Create Razorpay order
    const createOrder = async () => {
        setLoading(true)
        try {
            const response = await axios.post(
                `${API_URL}/payments/create-order`,
                {
                    amount: amount * 100, // Razorpay expects amount in paise
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            )

            if (response.data?.id) {
                setOrderId(response.data.id)
            } else {
                toast.error("Failed to create payment order")
            }
        } catch (error) {
            console.error("Error creating order:", error)
            toast.error("Payment initialization failed")
        } finally {
            setLoading(false)
        }
    }

    // Open Razorpay payment form
    const handlePayment = () => {
        if (!orderId) {
            toast.error("Payment not initialized yet")
            return
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            name: "Service Booking",
            description: `Payment for ${name}`,
            order_id: orderId,
            prefill: {
                name: name,
                email: email,
                contact: phone,
            },
            handler: (response: any) => {
                // Handle successful payment
                handlePaymentSuccess(response)
            },
            modal: {
                ondismiss: () => {
                    toast.info("Payment cancelled")
                },
            },
            theme: {
                color: "#3399cc",
            },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }

    // Handle successful payment
    const handlePaymentSuccess = async (response: any) => {
        try {
            // Verify payment on the server
            const verifyResponse = await axios.post(
                `${API_URL}/payments/verify`,
                {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            )

            if (verifyResponse.data?.verified) {
                toast.success("Payment successful!")
                onSuccess(response)
            } else {
                toast.error("Payment verification failed")
            }
        } catch (error) {
            console.error("Error verifying payment:", error)
            toast.error("Payment verification failed")
        }
    }

    return (
        <Button
            fullWidth
            variant="primary"
            className="bg-brand-blue text-white"
            onClick={handlePayment}
            disabled={loading || !orderId}
        >
            {loading ? "Initializing Payment..." : "Pay Now"}
        </Button>
    )
}

export default RazorpayPayment

