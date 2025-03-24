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
  onBookNow?: () => void; // Add this prop
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
  style,
  onBookNow
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden card-shadow transition-all duration-300 hover:shadow-xl',
        className
      )}
      style={style}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
        />
        <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-medium px-2 py-1 rounded">
          Featured
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-brand-blue text-sm font-bold px-3 py-1 rounded-full">
          {price}
        </div>
      </div>
      <div className="p-5">
        <div className="bg-brand-blue/10 text-brand-blue text-xs font-medium inline-block px-2 py-1 rounded mb-3">
          {category}
        </div>
        <h3 className="text-lg font-semibold mb-3 hover:text-brand-blue transition-colors">{title}</h3>

        <div className="flex items-center space-x-2 mb-4">
          <img src={providerImage} alt={providerName} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
          <span className="text-sm text-gray-600">{providerName}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <StarRating rating={rating} reviews={reviews} />
        </div>

        <Button fullWidth className="transition-transform hover:translate-y-[-3px]" onClick={onBookNow}>Book Now</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
