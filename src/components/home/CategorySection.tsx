
import React, { useState } from 'react';
import CategoryCard from '@/components/common/CategoryCard';

const categories = [
  {
    id: 1,
    title: 'Microwave Repair',
    image: '/public/lovable-uploads/aebc62a7-752a-4cce-bb1b-eddb3cfa4c3a.png',
    iconImage: '/public/lovable-uploads/462fc7e3-fd43-4328-abdf-6ce07da6a3cd.png',
    servicesCount: '1+ Services'
  },
  {
    id: 2,
    title: 'Air Conditioner Repair',
    image: '/public/lovable-uploads/5a0f916a-7a99-4eb3-b204-8fc666f610fc.png',
    iconImage: '/public/lovable-uploads/462fc7e3-fd43-4328-abdf-6ce07da6a3cd.png',
    servicesCount: '1+ Services'
  },
  {
    id: 3,
    title: 'Air Purifier',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    iconImage: '/public/lovable-uploads/462fc7e3-fd43-4328-abdf-6ce07da6a3cd.png',
    servicesCount: '1+ Services'
  },
  {
    id: 4,
    title: 'Car Detailing',
    image: '/public/lovable-uploads/ff5f5a21-0a54-4f89-9c38-f454c9379861.png',
    iconImage: '/public/lovable-uploads/462fc7e3-fd43-4328-abdf-6ce07da6a3cd.png',
    servicesCount: '1+ Services'
  }
];

const CategorySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Categories provided by Pro Found Expert in their day-to-day schedule
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              iconImage={category.iconImage}
              servicesCount={category.servicesCount}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === index 
                    ? 'bg-brand-blue w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
