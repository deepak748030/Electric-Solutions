
import React from 'react';
import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Top Wave Design */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-1/2">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-gray-900 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Scroll to Top Button */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          <Button
            onClick={scrollToTop}
            className="bg-brand-blue hover:bg-brand-darkBlue text-white rounded-full p-3 transform -translate-y-1/2 shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowUp size={24} />
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">About Us</h3>
            <p className="text-gray-300">
              We provide expert repair services for your home appliances and electronics,
              committed to quality service with trained professionals.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Air Conditioner Repair</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Refrigerator Repair</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Washing Machine Repair</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">Microwave Repair</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-blue transition-colors">TV Repair</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-brand-blue shrink-0 mt-1" size={18} />
                <p className="text-gray-300">123 Repair Street, Fix City, FC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-brand-blue shrink-0" size={18} />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-brand-blue shrink-0" size={18} />
                <p className="text-gray-300">support@repairbuddy.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest services and offers</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md flex-grow bg-gray-800 border border-gray-700 text-white"
              />
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Repair Buddy. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
