
import React from 'react';
import { cn } from '@/lib/utils';

type CategoryCardProps = {
  title: string;
  image: string;
  iconImage: string;
  servicesCount: string;
  className?: string;
};

const CategoryCard = ({
  title,
  image,
  iconImage,
  servicesCount,
  className
}: CategoryCardProps) => {
  return (
    <div className={cn(
      'bg-white rounded-lg overflow-hidden card-shadow group transition-all duration-500 hover-scale',
      className
    )}>
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src={iconImage} alt={`${title} icon`} className="w-10 h-10" />
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{servicesCount}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
