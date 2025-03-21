import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ServiceCard from '@/components/common/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/common/Button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination';

const Services = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedOthers, setSelectedOthers] = useState<string>('');

  const services = [
    {
      id: 1,
      title: 'Washing Machine Repair',
      slug: 'washing-machine-repair',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Appliance Repair',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'Washing Machine Repair'
    },
    {
      id: 2,
      title: 'Refrigerator Repair',
      slug: 'refrigerator-repair',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Appliance Repair',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'Refrigerator Repair'
    },
    {
      id: 3,
      title: 'AC Repair',
      slug: 'ac-repair',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Appliance Repair',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'Air Conditioner Repair'
    },
    {
      id: 4,
      title: 'RO Repair',
      slug: 'ro-repair',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Appliance Repair',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'RO Repair'
    },
    {
      id: 5,
      title: 'Plumber Services',
      slug: 'plumber-services',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Home Services',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'Plumber Service'
    },
    {
      id: 6,
      title: 'Car Detailing',
      slug: 'car-detailing',
      price: '₹249',
      image: '/public/lovable-uploads/5ab649f6-3995-4460-afd2-3216210b593a.png',
      category: 'Auto Services',
      providerName: 'Repairing Buddy',
      providerImage: '/public/lovable-uploads/0bb15c92-01fe-4650-9664-8f0b74c9ab6d.png',
      rating: 0,
      reviews: 0,
      tag: 'Car Detailing'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb Banner */}
      <div className="bg-gray-800 py-12 mb-8 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Services</h1>
          <Breadcrumb className="justify-center">
            <BreadcrumbList className="justify-center text-gray-300">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white hover:text-brand-blue">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-brand-blue">Our Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Location Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">
                Location
              </div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select 
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">
                Category
              </div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select 
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="appliance-repair">Appliance Repair</option>
                  <option value="home-services">Home Services</option>
                  <option value="auto-services">Auto Services</option>
                </select>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">
                Price Range
              </div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select 
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="0-500">₹0 - ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="1000-2000">₹1000 - ₹2000</option>
                  <option value="2000+">₹2000+</option>
                </select>
              </div>
            </div>
            
            {/* Others Filter */}
            <div>
              <div className="bg-brand-blue text-white p-3 rounded-t-lg font-medium text-center">
                Others
              </div>
              <div className="border border-gray-200 rounded-b-lg p-2 bg-gray-50">
                <select 
                  className="w-full p-2 rounded bg-white border border-gray-200"
                  value={selectedOthers}
                  onChange={(e) => setSelectedOthers(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="most-popular">Most Popular</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue/90 text-white text-xs px-3 py-1 rounded-full">
                    {service.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white font-bold text-brand-blue px-3 py-1 rounded-full shadow">
                    {service.price}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={service.providerImage} 
                      alt={service.providerName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600">{service.providerName}</span>
                    
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className="w-4 h-4 text-yellow-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-gray-500">({service.reviews})</span>
                    </div>
                  </div>
                  
                  <Button fullWidth variant="primary" className="bg-brand-blue text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
