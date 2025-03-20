
import React from 'react';
import { ArrowRight, User, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type BlogCardProps = {
  title: string;
  image: string;
  author: string;
  commentsCount: string;
  className?: string;
  style?: React.CSSProperties;
};

const BlogCard = ({
  title,
  image,
  author,
  commentsCount,
  className,
  style
}: BlogCardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg overflow-hidden card-shadow group hover-scale',
        className
      )}
      style={style}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
        />
      </div>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-600 mb-2 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>By {author}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>{commentsCount} Comments</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 min-h-[56px]">{title}</h3>
        <div className="flex items-center text-brand-blue font-medium group-hover:text-brand-darkBlue">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
