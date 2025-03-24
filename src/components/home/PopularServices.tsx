import React, { useEffect, useState } from 'react';
import ServiceCard from '@/components/common/ServiceCard';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const API_URL = import.meta.env.VITE_API_URL;

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch popular services
  const getServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services?type=popular&limit=6`);
      setServices(response.data?.services);
    } catch (error) {
      console.error('Error fetching popular services:', error);
    }
  };

  // Get user data from local storage
  const getUserFromLocalStorage = async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsedData = JSON.parse(authData);
        setUserData(parsedData?.user || null);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setUserData(null);
    }
  };

  const handleBookNowClick = async (service) => {
    if (!userData) {
      toast({ title: 'Booking Failed', description: 'User data not available. Please log in.', variant: 'destructive' });
      return;
    }

    try {
      const bookingData = {
        userId: userData._id,
        customer: userData.name,
        email: userData.email,
        phone: userData.phone,
        service: service.title,
        price: service.price,
        date: new Date().toISOString(),
        status: 'Pending',
        address: userData.address
      };

      const response = await axios.post(`${API_URL}/orders`, bookingData);
      toast({ title: 'Booking Successful', description: response.data?.message || 'Your service has been booked successfully.' });
    } catch (error) {
      toast({ title: 'Booking Failed', description: error.response?.data?.message || 'Failed to book the service.', variant: 'destructive' });
    }
  };

  useEffect(() => {
    getServices();
    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log('User data updated:', userData);
    }
  }, [userData]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Popular Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The following are the Popular services offered by Pro Found Expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              price={service.price}
              image={service.image}
              category={service.category}
              providerName={service.providerName}
              providerImage={service.providerImage}
              rating={service.rating}
              reviews={service.reviews}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
              onBookNow={() => handleBookNowClick(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;