
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <Link to="/" className="inline-block mb-4">
              <img src="/public/lovable-uploads/f4ff55b6-3170-4526-9347-e8eb769d7e87.png" alt="logo" className="h-10" />
            </Link>
            <p className="text-gray-400 mb-6">
              profoundexpert.com: Your Trusted Home Appliance Repair Partner. In today's fast-paced world, home appliances play a vital role in making our lives easier and more comfortable. Whether it's the refrigerator that keeps our food fresh, the washing machine that saves us time and effort, or the air conditioner that keeps us cool during scorching summers – these appliances are indispensable to modern living. However, just like any other machine, they can break down unexpectedly, leaving us in distress.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors p-2 rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors p-2 rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors p-2 rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-brand-blue transition-colors p-2 rounded-full">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Important Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-semibold mb-4">Important Link</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Terms And Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Join as a Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">+91 7303503894</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">support@profoundexpert.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-blue mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  27/4 sector 28, Gurgaon Haryana 122002 India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            Copyright 2023, Repairing centre. All Rights Reserved.
          </p>
          <div className="flex space-x-2">
            <img src="https://cdn.iconscout.com/icon/free/png-256/paypal-44-432368.png" alt="PayPal" className="h-8" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/mastercard-3521564-2944982.png" alt="Mastercard" className="h-8" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/visa-3-226460.png" alt="Visa" className="h-8" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/jcb-credit-card-3521558-2944976.png" alt="JCB" className="h-8" />
            <img src="https://cdn.iconscout.com/icon/free/png-256/discover-card-888026.png" alt="Discover" className="h-8" />
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-brand-darkBlue transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Live Chat Button */}
      <button className="fixed bottom-6 left-6 bg-brand-blue text-white py-2 px-4 rounded-lg shadow-lg hover:bg-brand-darkBlue transition-colors z-40 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Live Chat
      </button>
    </footer>
  );
};

export default Footer;
