import React from 'react';
import { FileText,  Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-2xl font-bold">PawPerfection</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transform your pet's behavior with expert-guided training from the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="#" />
              <SocialLink icon={<Youtube className="h-5 w-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Our Services', 'Training Programs', 'Success Stories', 'Blog', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Training Programs</h3>
            <ul className="space-y-4">
              {['Basic Obedience', 'Behavior Modification', 'Puppy Training', 'Advanced Training', 'Group Classes', 'Private Sessions'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3" />
                <span>support@pawperfection.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3" />
                <span>123 Training Street, Pet City, PC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PawPerfection. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }) => {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
    >
      {icon}
    </a>
  );
};

export default Footer;