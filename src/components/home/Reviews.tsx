
import React from 'react';
import ReviewCard from '@/components/common/ReviewCard';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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
    content: "My machine working like new in no time. I'm extremely satisfied with the prompt and effective service provided.",
    authorName: "Karan Kumar",
    authorImage: "/public/lovable-uploads/c2ffb8dc-61c7-4491-9206-a6eb5197f59a.png",
    authorTitle: "Lawyer"
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
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in">Customer Testimonials</h2>
          <div className="h-1.5 w-16 bg-brand-blue mx-auto rounded-full"></div>
          <p className="mt-5 text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Here's what our satisfied customers have to say about our services
          </p>
        </div>
        
        {/* Desktop View - Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6">
          {reviews.slice(0, 2).map((review, index) => (
            <ReviewCard
              key={review.id}
              content={review.content}
              authorName={review.authorName}
              authorImage={review.authorImage}
              authorTitle={review.authorTitle}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>
        
        {/* Mobile & Tablet - Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id}>
                  <div className="p-1">
                    <ReviewCard
                      content={review.content}
                      authorName={review.authorName}
                      authorImage={review.authorImage}
                      authorTitle={review.authorTitle}
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
      </div>
    </section>
  );
};

export default Reviews;
