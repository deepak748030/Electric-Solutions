
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/common/Button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Abstract shape background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-blue"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-brand-blue"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in space-y-6">
            <Link to="/" className="inline-block mb-4">
              <img src="/public/lovable-uploads/f4ff55b6-3170-4526-9347-e8eb769d7e87.png" alt="logo" className="h-12" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              profoundexpert.com: Your Trusted Home Appliance Repair Partner. In today's fast-paced world, home appliances play a vital role in making our lives easier and more comfortable.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors duration-300 p-2.5 rounded-full group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors duration-300 p-2.5 rounded-full group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors duration-300 p-2.5 rounded-full group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors duration-300 p-2.5 rounded-full group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Important Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-blue after:bottom-0 after:left-0 after:-mb-2">
              Important Links
            </h3>
            <ul className="space-y-3 mt-6">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'Our Blog', path: '/blog' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Terms And Conditions', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((link, index) => (
                <li key={index} className="transform transition hover:translate-x-1">
                  <Link to={link.path} className="text-gray-300 hover:text-white flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-blue after:bottom-0 after:left-0 after:-mb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 mt-6">
              {[
                { name: 'Our Services', path: '/services' },
                { name: 'Why Choose Us', path: '/why-choose-us' },
                { name: 'My Profile', path: '/profile' },
                { name: 'About Us', path: '/about' },
                { name: 'Join as a Provider', path: '/join' }
              ].map((link, index) => (
                <li key={index} className="transform transition hover:translate-x-1">
                  <Link to={link.path} className="text-gray-300 hover:text-white flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-blue after:bottom-0 after:left-0 after:-mb-2">
              Contact Info
            </h3>
            <ul className="space-y-5 mt-6">
              <li className="flex items-start group">
                <div className="bg-gray-800 rounded-full p-2.5 mr-3 mt-0.5 group-hover:bg-brand-blue transition-colors duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">+91 7303503894</span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 rounded-full p-2.5 mr-3 mt-0.5 group-hover:bg-brand-blue transition-colors duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors break-all">support@profoundexpert.com</span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 rounded-full p-2.5 mr-3 mt-0.5 group-hover:bg-brand-blue transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  27/4 sector 28, Gurgaon Haryana 122002 India
                </span>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button className="w-full" size="lg">
                Request A Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold">Subscribe to Our Newsletter</h4>
              <p className="text-gray-300 text-sm mt-1">Get the latest updates and offers</p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-6 md:mb-0">
            Copyright © {currentYear}, Profound Expert. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196546.png" alt="AmEx" className="h-8 w-auto bg-white p-1 rounded" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="Discover" className="h-8 w-auto bg-white p-1 rounded" />
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-brand-darkBlue transition-colors z-40",
          "transform hover:scale-110 transition-transform duration-300"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Live Chat Button */}
      <button className={cn(
        "fixed bottom-6 left-6 bg-brand-blue text-white py-2 px-4 rounded-lg shadow-lg hover:bg-brand-darkBlue transition-colors z-40 flex items-center",
        "transform hover:scale-105 transition-transform duration-300"
      )}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Live Chat
      </button>
    </footer>
  );
};

export default Footer;
