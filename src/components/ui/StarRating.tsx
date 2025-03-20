
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showEmpty?: boolean;
  reviews?: number;
};

const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  className,
  showEmpty = true,
  reviews
}: StarRatingProps) => {
  const sizesMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const sizeClass = sizesMap[size];
  
  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClass,
              'transition-all',
              i < rating
                ? 'text-yellow-400 fill-yellow-400'
                : showEmpty
                ? 'text-gray-300'
                : 'hidden'
            )}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="ml-2 text-sm text-gray-600">({reviews})</span>
      )}
    </div>
  );
};

export default StarRating;
