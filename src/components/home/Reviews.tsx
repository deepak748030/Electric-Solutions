
import React, { useState, useEffect } from 'react';
import ReviewCard from '@/components/common/ReviewCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    content: "Repairing buddy service was excellent! The technician arrived promptly, diagnosed the issue quickly, and had my machine up and running smoothly in no time. Satisfied",
    authorName: "Ravi Verma",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "MBBS,BDMS"
  },
  {
    id: 2,
    content: "The technician was professional and knowledgeable, resolving the problem efficiently. I'm impressed with the quality of work and would definitely use their services again.",
    authorName: "Prateek Haldar",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "Graphic Designer"
  },
  {
    id: 3,
    content: "Great service at an affordable price. The technician was knowledgeable and fixed my appliance issue on the first visit.",
    authorName: "Priya Sharma",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "Teacher"
  },
  {
    id: 4,
    content: "I highly recommend their repair services. Very professional and timely, and they really know what they're doing.",
    authorName: "Rajesh Singh",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "Business Owner"
  },
  {
    id: 5,
    content: "Excellent customer service and technical expertise. They explained everything clearly and fixed my AC faster than expected.",
    authorName: "Anita Patel",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "Homemaker"
  }
];

const Reviews = () => {
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
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in">Reviews</h2>
          <div className="h-1.5 w-16 bg-brand-blue mx-auto rounded-full"></div>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Here's what our satisfied customers have to say about our services
          </p>
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
              {reviews.map((review) => (
                <CarouselItem 
                  key={review.id}
                  className={`pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 lg:basis-1/2'}`}
                >
                  <div className="p-1 h-full">
                    <ReviewCard
                      content={review.content}
                      authorName={review.authorName}
                      authorImage={review.authorImage}
                      authorTitle={review.authorTitle}
                      className="animate-fade-in h-full"
                      style={{ animationDelay: `${0.1 * (review.id - 1)}s` }}
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
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
                  activeSlide === index ? "bg-brand-blue w-6" : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
