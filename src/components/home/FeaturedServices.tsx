
import React from 'react';
import ServiceCard from '@/components/common/ServiceCard';

const services = [
  {
    id: 1,
    title: 'Washing Machine Repair',
    price: '₹249',
    image: '/public/lovable-uploads/aebc62a7-752a-4cce-bb1b-eddb3cfa4c3a.png',
    category: 'Washing Machine Repair',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  },
  {
    id: 2,
    title: 'Refrigerator Repair',
    price: '₹249',
    image: '/public/lovable-uploads/5a0f916a-7a99-4eb3-b204-8fc666f610fc.png',
    category: 'Refrigerator Repair',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  },
  {
    id: 3,
    title: 'AC Repair',
    price: '₹249',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    category: 'Air Conditioner Repair',
    providerName: 'Repairing Buddy',
    providerImage: '/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png',
    rating: 0,
    reviews: 0
  }
];

const FeaturedServices = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Featured Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The following are the Featured services offered by Pro Found Expert.
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

export default FeaturedServices;
