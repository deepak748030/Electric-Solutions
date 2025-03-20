
import React from 'react';
import { ArrowRight, User, MessageSquare, Calendar } from 'lucide-react';
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
        'bg-white rounded-lg overflow-hidden card-shadow group transition-all duration-300 hover:shadow-xl',
        className
      )}
      style={style}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-medium px-2 py-1 rounded">
          Featured
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1 text-brand-blue" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-brand-blue" />
            <span>{commentsCount} Comments</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-brand-blue" />
            <span>Today</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 min-h-[56px] group-hover:text-brand-blue transition-colors">{title}</h3>
        <div className="flex items-center text-brand-blue font-medium transition-all group-hover:translate-x-1">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
