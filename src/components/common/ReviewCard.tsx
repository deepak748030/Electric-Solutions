
import React from 'react';
import { cn } from '@/lib/utils';

type ReviewCardProps = {
  content: string;
  authorName: string;
  authorImage: string;
  authorTitle: string;
  className?: string;
};

const ReviewCard = ({
  content,
  authorName,
  authorImage,
  authorTitle,
  className
}: ReviewCardProps) => {
  return (
    <div className={cn(
      'bg-white rounded-lg p-6 card-shadow animate-fade-in',
      className
    )}>
      <div className="mb-4">
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex items-center">
        <img 
          src={authorImage} 
          alt={authorName} 
          className="w-12 h-12 rounded-full mr-4" 
        />
        <div>
          <h4 className="font-semibold">{authorName}</h4>
          <p className="text-sm text-gray-600">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
