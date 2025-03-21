
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb Banner */}
      <div className="bg-gray-800 py-12 mb-8 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Services</h1>
          <Breadcrumb className="justify-center">
            <BreadcrumbList className="justify-center text-gray-300">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-white hover:text-brand-blue">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-brand-blue">Our Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
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
