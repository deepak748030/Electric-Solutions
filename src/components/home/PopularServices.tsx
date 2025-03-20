
import React from 'react';
import ServiceCard from '@/components/common/ServiceCard';

const services = [
  {
    id: 1,
    title: 'Car Detailing',
    price: '₹249',
    image: '/public/lovable-uploads/ff5f5a21-0a54-4f89-9c38-f454c9379861.png',
    category: 'Car Detailing',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  },
  {
    id: 2,
    title: 'Car Repair',
    price: '₹249',
    image: '/public/lovable-uploads/ff5f5a21-0a54-4f89-9c38-f454c9379861.png',
    category: 'Car Repair',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  },
  {
    id: 3,
    title: 'Air Purifier',
    price: '₹249',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    category: 'Air Purifier',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  }
];

const PopularServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Popular Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The following are the Popular services offered by Pro Found Expert.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
