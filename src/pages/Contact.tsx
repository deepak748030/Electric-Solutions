
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb Banner */}
      <div className="bg-gray-800 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Contact Us</h1>
          <Breadcrumb className="justify-center">
            <BreadcrumbList className="justify-center text-gray-300">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/" className="text-white hover:text-brand-blue">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-brand-blue">Contact Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="flex-grow">
        {/* Contact Info Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to help with all your appliance repair needs. Reach out to us through any of the methods below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Phone */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-brand-blue rounded-full p-4 mb-4 text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+91 9560457131</p>
                <a href="tel:+919560457131" className="text-brand-blue hover:underline mt-2">
                  Call us now
                </a>
              </div>
              
              {/* Email */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-brand-blue rounded-full p-4 mb-4 text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@repairingbuddy.com</p>
                <a href="mailto:support@repairingbuddy.com" className="text-brand-blue hover:underline mt-2">
                  Send an email
                </a>
              </div>
              
              {/* Address */}
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-brand-blue rounded-full p-4 mb-4 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-600">293/3 sector 28 near phase 1 metro Gurgaon 122002</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline mt-2">
                  View on map
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form & Map Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Feel Free to Get in Touch</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center"
                    >
                      <span>Send Message</span>
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Support Hours & Map */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Support Hours */}
                <div className="bg-brand-blue text-white rounded-lg shadow-lg p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <User className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4">Support Time</h3>
                    <p className="text-center text-xl font-bold mb-6">10.00AM to 05.00PM</p>
                    <img 
                      src="/public/lovable-uploads/f92c461d-115f-4313-8200-0c2d00db559b.png" 
                      alt="Customer Support" 
                      className="mx-auto rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Map */}
                <div className="flex-grow relative rounded-lg shadow-lg overflow-hidden min-h-[300px]">
                  <img 
                    src="/public/lovable-uploads/c9d45a97-0cba-407c-b4d6-3a021e5ef36a.png" 
                    alt="Location Map" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
