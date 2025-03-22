
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if user is logged in and if they're an admin
    const checkLoginStatus = () => {
      const userToken = localStorage.getItem('userToken');
      const adminStatus = localStorage.getItem('isAdmin');
      setIsLoggedIn(!!userToken);
      setIsAdmin(adminStatus === 'true');
    };

    window.addEventListener('scroll', handleScroll);
    checkLoginStatus();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      // Navigate to profile page
      if (isAdmin) {
        navigate('/admin/profile');
      } else {
        navigate('/profile');
      }
    } else {
      // Navigate to login page
      navigate('/auth/login');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Service', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-blue">Repair Guru</h1>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-base font-medium transition-colors hover:text-brand-blue relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:scale-x-0 after:bg-brand-blue after:transition-transform hover:after:scale-x-100',
                  location.pathname === link.path
                    ? 'text-brand-blue after:scale-x-100'
                    : 'text-gray-700'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              className="p-2 rounded-full bg-brand-blue text-white hover:bg-brand-darkBlue transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Button variant="primary">Hire Now &rarr;</Button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="inline-flex items-center space-x-1 text-gray-700 hover:text-brand-blue transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleProfileClick}
                  className="inline-flex items-center space-x-1 text-gray-700 hover:text-brand-blue transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="inline-flex items-center space-x-1 text-gray-700 hover:text-brand-blue transition-colors">
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
                
                <Link to="/auth/register" className="inline-flex items-center space-x-1 text-gray-700 hover:text-brand-blue transition-colors">
                  <UserPlus className="w-5 h-5" />
                  <span className="font-medium">Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-base font-medium p-2 rounded',
                  location.pathname === link.path
                    ? 'bg-brand-blue/10 text-brand-blue'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t">
              <Button variant="primary" fullWidth>Hire Now</Button>
              <div className="grid grid-cols-2 gap-2">
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="p-2 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
                      >
                        <LayoutDashboard className="w-5 h-5 mr-2" />
                        <span>Admin</span>
                      </Link>
                    )}
                    <button 
                      onClick={handleProfileClick}
                      className={`p-2 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 ${isAdmin ? '' : 'col-span-2'}`}
                    >
                      <User className="w-5 h-5 mr-2" />
                      <span>Profile</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth/login" 
                      className="p-2 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      <span>Login</span>
                    </Link>
                    <Link 
                      to="/auth/register" 
                      className="p-2 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
