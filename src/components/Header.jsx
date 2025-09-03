'use client'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  // State to track if mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Function to toggle menu with logging for debugging
  const toggleMenu = (newState) => {
    console.log("Toggling menu to:", newState, "from previous state:", mobileMenuOpen);
    // Force re-render by using a callback
    setMobileMenuOpen(prevState => {
      console.log("Setting state from:", prevState, "to:", newState);
      return newState;
    });
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Only run this check if the mobile menu is actually open
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        console.log("Clicked outside menu, closing");
        toggleMenu(false);
      }
    }
    
    // Only add the event listener when the menu is open
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, menuRef]);
  
  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between relative">
    
        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
           <Link href="/home" className="text-white hover:text-orange-300 transition-colors font-medium">
            Home
          </Link>
          <span className="text-white">|</span>
          <Link href="/eligibility" className="text-white hover:text-orange-300 transition-colors font-medium">
            Eligibility Criteria
          </Link>
          <span className="text-white">|</span>
           <Link href="/how-it-works" className="text-white hover:text-orange-300 transition-colors font-medium">
            How It Works?
          </Link>
          {/* <span className="text-white">|</span> */}
          {/* <Link href="/contact" className="text-white hover:text-orange-300 transition-colors font-medium">
            Contact Us
          </Link>
          <span className="text-white">|</span>
          <Link href="/faqs" className="text-white hover:text-orange-300 transition-colors font-medium">
            FAQS
          </Link>
          <span className="text-white">|</span> */}
         
        </div>

        {/* Check Eligibility Button */}
        <div className="flex items-center">
          <Link href="/eligibility" className="bg-[#14433C] text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2">
            <span>Check Eligibility</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button - Only visible on mobile and when menu is closed */}
        <div className="md:hidden">
          <button 
            className={`text-white p-2 relative ${mobileMenuOpen ? 'opacity-0' : 'opacity-100 z-50'}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              e.preventDefault(); // Prevent default behavior
              console.log("Header toggle button clicked, current state:", mobileMenuOpen);
              toggleMenu(true); // Only open the menu, never close from here
            }}
            aria-label="Open menu"
            disabled={mobileMenuOpen}
          >
            {/* Only show hamburger icon, never show X here */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar - Only visible when menu is open */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-[#14433C] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Single, clear close button in the sidebar */}
        <div className="flex justify-between items-center py-4 px-4 border-b border-[#0f332e]">
          <span className="text-white font-medium">Menu</span>
          <button 
            className="text-white p-2 hover:bg-[#0f332e] rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation(); // Stop event bubbling
              console.log("Close button clicked in sidebar");
              toggleMenu(false);
            }}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col px-6 py-4">
          <Link 
            href="/home" 
            className="text-white py-3 border-b border-gray-600 hover:text-orange-300 transition-colors font-medium"
            onClick={() => toggleMenu(false)}
          >
            Home
          </Link>
          <Link 
            href="/eligibility" 
            className="text-white py-3 border-b border-gray-600 hover:text-orange-300 transition-colors font-medium"
            onClick={() => toggleMenu(false)}
          >
            Eligibility Criteria
          </Link>
          <Link 
            href="/how-it-works" 
            className="text-white py-3 border-b border-gray-600 hover:text-orange-300 transition-colors font-medium"
            onClick={() => toggleMenu(false)}
          >
            How It Works?
          </Link>
          {/* Additional mobile-only links can go here */}
          <div className="mt-6">
            <Link 
              href="/eligibility" 
              className="bg-white text-[#14433C] px-4 py-2 rounded-lg font-medium block text-center"
              onClick={() => toggleMenu(false)}
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => toggleMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;