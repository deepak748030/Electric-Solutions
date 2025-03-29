import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
        const data = response.data.services;

        const uniqueLocations = [...new Set(data.flatMap(service => service.locations))].filter(Boolean);
        const uniqueCategories = [...new Set(data.map(service => service.category))].filter(Boolean);

        setLocations(uniqueLocations);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (!location || location === 'Location') {
      toast.error('Please select a location');
      return;
    }

    if (!category || category === 'Find Categories') {
      toast.error('Please select a category');
      return;
    }

    navigate(`/services?location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`);
    toast.success(`Searching for ${category} services in ${location}`);
  };

  return (
    <section className="relative pt-16 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-[-1]"></div>
      {/* Centered Logo */}
      <div className="flex justify-center items-center">
        <img src="/logo.png" alt="Logo" className="h-28" />
      </div>

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
              <select
                className="w-full h-14 px-3 pt-4 pb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Location</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="absolute text-xs text-gray-500 left-3 top-1">I'm looking to..</label>
              <select
                className="w-full h-14 px-3 pt-4 pb-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Find Categories</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <Button
              className="h-14 flex items-center justify-center gap-2 md:col-span-1"
              size="lg"
              onClick={handleSearch}
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