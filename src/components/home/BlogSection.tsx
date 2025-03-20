
import React from 'react';
import BlogCard from '@/components/common/BlogCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'Transforming Your Home With RepairingBuddy.Com: The Ultimate Guide',
    image: '/public/lovable-uploads/5a0f916a-7a99-4eb3-b204-8fc666f610fc.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  },
  {
    id: 2,
    title: 'Common Washing Machine Problems And How To Troubleshoot',
    image: '/public/lovable-uploads/aebc62a7-752a-4cce-bb1b-eddb3cfa4c3a.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  },
  {
    id: 3,
    title: 'Troubleshooting Common Refrigerator Problems: A Hand Guide',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  },
  {
    id: 4,
    title: 'Air Conditioner Maintenance Tips for Summer',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    author: 'Admin',
    commentsCount: '2',
    url: '#'
  },
  {
    id: 5,
    title: 'How to Extend the Life of Your Home Appliances',
    image: '/public/lovable-uploads/5a0f916a-7a99-4eb3-b204-8fc666f610fc.png',
    author: 'Admin',
    commentsCount: '1',
    url: '#'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Explore Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover the latest tips, tricks, and insights about home appliance care and maintenance
          </p>
          <div className="h-1 w-16 bg-brand-blue mx-auto mt-5 rounded-full"></div>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.slice(0, 3).map((blog, index) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              author={blog.author}
              commentsCount={blog.commentsCount}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden mb-10">
          <Carousel className="w-full">
            <CarouselContent>
              {blogs.map((blog) => (
                <CarouselItem key={blog.id}>
                  <div className="p-1">
                    <BlogCard
                      title={blog.title}
                      image={blog.image}
                      author={blog.author}
                      commentsCount={blog.commentsCount}
                      className="animate-fade-in"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative static mx-2 top-auto right-auto translate-y-0" />
              <CarouselNext className="relative static mx-2 top-auto left-auto translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="group">
            View All Articles <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
