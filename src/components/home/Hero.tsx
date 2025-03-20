
import React from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/common/Button';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-[-1]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-brand-blue mb-3 font-medium">Premium Service 24/7</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Brands </span>
            <span className="text-brand-blue">We Cover</span>
          </h1>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 mt-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="absolute text-xs text-gray-500 left-3 top-1">I'm looking to..</label>
              <select className="w-full h-14 px-3 pt-4 pb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                <option>Location</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Houston</option>
                <option>Miami</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <div className="relative">
              <label className="absolute text-xs text-gray-500 left-3 top-1">I'm looking to..</label>
              <select className="w-full h-14 px-3 pt-4 pb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                <option>Find Categories</option>
                <option>Appliance Repair</option>
                <option>Home Cleaning</option>
                <option>Plumbing</option>
                <option>Electrical</option>
                <option>Pest Control</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <Button 
              className="h-14 flex items-center justify-center gap-2 md:col-span-1" 
              size="lg"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
