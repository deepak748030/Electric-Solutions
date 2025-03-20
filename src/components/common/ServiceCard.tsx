
import React from 'react';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  title: string;
  price: string;
  image: string;
  category: string;
  providerName: string;
  providerImage: string;
  rating: number;
  reviews: number;
  className?: string;
  style?: React.CSSProperties;
};

const ServiceCard = ({
  title,
  price,
  image,
  category,
  providerName,
  providerImage,
  rating,
  reviews,
  className,
  style
}: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg overflow-hidden card-shadow animate-fade-in',
        className
      )}
      style={style}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
        />
      </div>
      <div className="p-4">
        <div className="bg-brand-gray text-brand-darkBlue text-xs font-medium inline-block px-2 py-1 rounded mb-2">
          {category}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-left">{title}</h3>
        <div className="flex items-center space-x-2 mb-4">
          <img src={providerImage} alt={providerName} className="w-6 h-6 rounded-full" />
          <span className="text-sm text-gray-600">{providerName}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={rating} reviews={reviews} />
          <span className="text-xl font-bold text-brand-blue">{price}</span>
        </div>
        <Button fullWidth>Book Now</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
