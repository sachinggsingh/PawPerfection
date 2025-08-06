import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, FileType, Mail, PawPrint } from 'lucide-react';
import Avatar from './Avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/150 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <PawPrint className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">PawPerfection</span>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink href='/' icon={<Home size={18} />} text="Home" />
            <NavLink href="/about" icon={<Info size={18} />} text="About" />
            <NavLink href="/contact" icon={<Mail size={18} />} text="Contact" />
            <NavLink href="/course" icon={<FileType size={18} />} text="Courses" />
            <Avatar />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg">
          <MobileNavLink href="/" icon={<Home size={18} />} text="Home" />
          <MobileNavLink href="/about" icon={<Info size={18} />} text="About" />
          <MobileNavLink href="/contact" icon={<Mail size={18} />} text="Contact" />
          <MobileNavLink href="/course" icon={<FileType size={18} />} text="Courses" />
          <div className="mt-4 px-4">
            <Avatar />
          </div>

          <div className="px-3 space-y-2 mt-2">
            {/* <a href="/login" className="block">
              <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 border hover:bg-white transition-colors duration-200">
                Login
              </button>
            </a>
            <a href="/signup" className="block">
              <button className="w-full px-4 py-2 text-sm font-medium text-white  hover:bg-indigo-600 transition-colors duration-200">
                Sign Up
              </button>
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop Nav Link component
const NavLink = ({ href, icon, text }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 group"
    >
      <span className="mr-1.5 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
        {icon}
      </span>
      {text}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-indigo-600 mt-0.5"></span>
    </a>
  );
};

// Mobile Nav Link component
const MobileNavLink = ({ href, icon, text }) => {
  return (
    <a
      href={href}
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
    >
      <span className="mr-3 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
        {icon}
      </span>
      {text}
    </a>
  );
};

export default Navbar;
