
import React, { useState } from 'react';
import ReviewCard from '@/components/common/ReviewCard';

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
  }
];

const Reviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in">Reviews</h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6">
          {reviews.slice(0, 2).map((review) => (
            <ReviewCard
              key={review.id}
              content={review.content}
              authorName={review.authorName}
              authorImage={review.authorImage}
              authorTitle={review.authorTitle}
              className="animate-fade-in"
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === index ? 'bg-brand-blue' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
