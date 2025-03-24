
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone, Star, Check } from 'lucide-react';
import Button from '@/components/common/Button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import Reviews from '@/components/home/Reviews';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb Banner */}
      <div className="bg-gray-800 text-white py-20 px-4 mt-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">About Us</h1>
          <div className="flex items-center text-sm space-x-2">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-blue">About Us</span>
          </div>
        </div>
      </div>


      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                {/* <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1> */}
                <h2 className="text-xl md:text-2xl text-brand-blue font-semibold mb-4">
                  RepairingBuddy.com: Your Trusted Home Appliance Repair Partner
                </h2>
                <p className="text-gray-700 mb-6">
                  In today's fast-paced world, home appliances play a vital role in making our lives easier
                  and more comfortable. Whether it's the refrigerator that keeps our food fresh, the washing
                  machine that saves us time and effort, or the air conditioner that keeps us cool during
                  scorching summers – these appliances are indispensable to modern living. However, just
                  like any other machine, they can break down unexpectedly, leaving us in distress.
                </p>
                <div className="flex gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative">
                  <img
                    src="/public/lovable-uploads/d2bdb4e4-28b6-4d6d-97ae-1f356bc7cd37.png"
                    alt="About RepairingBuddy"
                    className="rounded-lg shadow-xl max-w-full h-auto"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-2">
                    <div className="bg-brand-blue rounded-full p-2 text-white">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">3k+</p>
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <div className="w-20 h-1 bg-brand-blue mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-brand-blue rounded-full p-8 mb-6">
                  <img
                    src="/public/lovable-uploads/37548b2d-dde2-438f-91fd-70758060f852.png"
                    alt="Book a Service"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Book a Service</h3>
                <p className="text-gray-600">
                  Book a service by Call or WhatsApp and get the service
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-brand-blue rounded-full p-8 mb-6">
                  <img
                    src="/public/lovable-uploads/37548b2d-dde2-438f-91fd-70758060f852.png"
                    alt="Technician Visit"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Technician Visit</h3>
                <p className="text-gray-600">
                  An expert technician will reach your door step within 60 minutes
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-xl">
                <div className="bg-brand-blue rounded-full p-8 mb-6">
                  <img
                    src="/public/lovable-uploads/37548b2d-dde2-438f-91fd-70758060f852.png"
                    alt="Enjoy Service"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4">Enjoy Service</h3>
                <p className="text-gray-600">
                  Get 90 days post warranty for the service done
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Repairing Buddy:</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded mt-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Fast Response:</h3>
                      <p className="text-gray-600">We understand the urgency – quick fixes, minimal downtime.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded mt-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Skilled Technicians:</h3>
                      <p className="text-gray-600">Our experts know the ins and outs of all things repairable.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded mt-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Quality Workmanship:</h3>
                      <p className="text-gray-600">Each repair undergoes rigorous checks for top-notch quality.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded mt-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Transparent Pricing:</h3>
                      <p className="text-gray-600">No surprises – you'll know the cost before we start.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-1 rounded mt-1">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Convenience Restored:</h3>
                      <p className="text-gray-600">We're not just fixing, we're restoring your peace of mind.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 border-l-4 border-brand-blue bg-blue-50 rounded-r-lg">
                  <p className="text-gray-700">
                    <span className="text-brand-blue font-semibold">Find Us:</span> Visit our website www.repairingbuddy.com or give us a call at +91 9560457131. Our team is ready to make your appliances and gadgets smile again!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <img
                  src="/public/lovable-uploads/4a6ac531-74d9-48b7-bddd-7657fe15a950.png"
                  alt="Why Choose RepairingBuddy"
                  className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                />

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-brand-blue text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Expertise and Experience</h3>
                      <p className="text-gray-600">We are having highly skilled technicians with years of experience.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-brand-blue text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Innovation</h3>
                      <p className="text-gray-600">We keep up with the latest trends and technologies to keep you updated.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-brand-blue text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">3 Months Fixing Assurance</h3>
                      <p className="text-gray-600">You will get 90 days of assurance totally free.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        <Reviews />
      </main>

      <Footer />
    </div>
  );
};

export default About;
