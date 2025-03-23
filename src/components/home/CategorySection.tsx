
import React, { useState, useEffect } from 'react';
import CategoryCard from '@/components/common/CategoryCard';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const CategorySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const isMobile = useIsMobile();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`); // Adjust the endpoint as needed
      if (response.data) {
        setCategories(response.data?.categories);
      }
      if (!response.data || response.data.length === 0) {
        throw new Error("No categories found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // Return an empty array on error
    }
  }

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

  useEffect(() => {
    getCategories()
  }, []);
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Categories provided by Pro Found Expert in their day-to-day schedule
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
              {categories.map((category) => (
                <CarouselItem
                  key={category._id}
                  className={`pl-4 ${isMobile ? 'basis-full' : 'basis-1/2 md:basis-1/3 lg:basis-1/4'}`}
                >
                  <div className="p-1 h-full">
                    <CategoryCard
                      title={category.title}
                      image={category.image}
                      iconImage={category.iconImage}
                      servicesCount={category.servicesCount}
                      className="animate-fade-in h-full"
                      style={{ animationDelay: `${0.1 * (category.id - 1)}s` }}
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
            {Array.from({ length: Math.ceil(categories.length / (isMobile ? 1 : 4)) }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${activeSlide === index ? "bg-brand-blue w-6" : "bg-gray-300"
                  }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to category page ${index + 1}`}
              />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default CategorySection;
