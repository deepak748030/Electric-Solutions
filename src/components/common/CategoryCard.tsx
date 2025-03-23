
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type CategoryCardProps = {
  title: string;
  image: string;
  iconImage: string;
  servicesCount: string;
  className?: string;
  style?: React.CSSProperties;
};

const CategoryCard = ({
  title,
  image,
  iconImage,
  servicesCount,
  className,
  style
}: CategoryCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden card-shadow group transition-all duration-500 hover:shadow-xl',
        className
      )}
      style={style}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
          {/* <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
            <img src={iconImage} alt={`${title} icon`} className="w-10 h-10" />
          </div> */}
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-blue transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{servicesCount}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
