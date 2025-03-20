
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedServices from '@/components/home/FeaturedServices';
import Stats from '@/components/home/Stats';
import PopularServices from '@/components/home/PopularServices';
import Reviews from '@/components/home/Reviews';
import BlogSection from '@/components/home/BlogSection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedServices />
        <Stats />
        <PopularServices />
        <Reviews />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
