import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#14433C] bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <p className="text-white-100 text-sm leading-relaxed">
              Choose us for warmth and savings, as ECO4 brings free energy solutions to your doorstep, making homes efficient and comfortable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white-300 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-[#2c5650] rounded-full flex items-center justify-center hover:bg-[#2c5650] transition-colors">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
              </a>
              <a href="#" className="text-white-300 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-[#2c5650] rounded-full flex items-center justify-center hover:bg-[#2c5650]-700 transition-colors">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white-200  transition-colors text-sm">
                How It Works?
              </a>
              <a href="#" className="block text-white-200  transition-colors text-sm">
                How to Apply?
              </a>
              <a href="#" className="block text-white-200  transition-colors text-sm">
                Contact Us
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white-200  transition-colors text-sm">
                Terms & Condition
              </a>
              <a href="#" className="block text-white-200 -800 transition-colors text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2c5650] mt-8 pt-6">
          <p className="text-white-300 text-sm text-center">
            Copyright © 2024 Ecolite Energy Solutions, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;