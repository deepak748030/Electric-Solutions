
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">Our Services</h1>
          <div className="prose max-w-none animate-fade-in">
            <p>This is the Services page. Content to be added here.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
