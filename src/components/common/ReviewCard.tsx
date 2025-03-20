
import React from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

type ReviewCardProps = {
  content: string;
  authorName: string;
  authorImage: string;
  authorTitle: string;
  className?: string;
  style?: React.CSSProperties;
};

const ReviewCard = ({
  content,
  authorName,
  authorImage,
  authorTitle,
  className,
  style
}: ReviewCardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-500 flex flex-col h-full',
        className
      )}
      style={style}
    >
      <div className="text-brand-blue/20 mb-4">
        <Quote className="w-10 h-10" />
      </div>
      <div className="mb-6 flex-grow">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-blue/20 mr-4">
          <img 
            src={authorImage} 
            alt={authorName} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h4 className="font-semibold text-brand-blue">{authorName}</h4>
          <p className="text-sm text-gray-600">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
