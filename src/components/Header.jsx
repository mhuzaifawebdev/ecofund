import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
    
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

        {/* Mobile Menu Button - Visible on mobile */}
        <div className="md:hidden">
          <button className="text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;