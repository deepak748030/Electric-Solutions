
import React, { useState, useEffect } from 'react';
import BlogCard from '@/components/common/BlogCard';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const isMobile = useIsMobile();
  
  // Update active slide when carousel changes
  useEffect(() => {
    if (!carouselApi) return;
    
    const handleSelect = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  // Update carousel when active slide changes via dot navigation
  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(activeSlide);
  }, [activeSlide, carouselApi]);
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Explore Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover the latest tips, tricks, and insights about home appliance care and maintenance
          </p>
          <div className="h-1 w-16 bg-brand-blue mx-auto mt-5 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <Carousel 
            className="w-full"
            setApi={setCarouselApi}
            opts={{ 
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {blogs.map((blog) => (
                <CarouselItem 
                  key={blog.id}
                  className={`pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 md:basis-1/3'}`}
                >
                  <div className="p-1 h-full">
                    <BlogCard
                      title={blog.title}
                      image={blog.image}
                      author={blog.author}
                      commentsCount={blog.commentsCount}
                      className="animate-fade-in h-full"
                      style={{ animationDelay: `${0.1 * (blog.id - 1)}s` }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <div className="hidden md:flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 pointer-events-none">
              <Button 
                onClick={() => carouselApi?.scrollPrev()} 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12 shadow-md pointer-events-auto transform -translate-x-6 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button 
                onClick={() => carouselApi?.scrollNext()} 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12 shadow-md pointer-events-auto transform translate-x-6 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </Carousel>
          
          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(blogs.length / (isMobile ? 1 : 3)) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                  activeSlide === index ? "bg-brand-blue w-6" : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to blog page ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="group px-6 py-7 rounded-full shadow-md hover:shadow-lg">
            View All Articles <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
