import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 fill-transparent">
        <Image
          src="/hero.png"
          alt="Energy Efficient Buildings"
          fill
          className="object-cover"
          priority
        />
        {/* Progressive Backdrop Blur Overlay - Full Viewport */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60"></div>

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6">
              Get <span className="text-[#FFEA00] drop-shadow-lg">FREE</span> Energy Upgrades
            — Fully Backed by UK  Government Funding
            </h1>

            {/* Subheading */}
            <div className="text-lg md:text-xl space-y-3 mb-6">
              <p className="text-[#FFEA00] font-semibold drop-shadow-sm">
                Thousands of UK households have already received upgrades.
              </p>
              <p className="text-[#FFEA00] font-semibold drop-shadow-sm">
                If you're on benefits, your home could be the next.
              </p>
            </div>

            {/* Google Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20">
                <span className="text-white font-bold">Google</span>
                <span className="text-[#FFEA00] font-bold">4.9</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#FFEA00] fill-current drop-shadow-sm" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg bold text-white-800 mb-6">1000+ Successful Installs</p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-medium">Government-backed Scheme</span>
              </div>
              
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-medium">Trust Score 4.9</span>
               
              </div>
              
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-medium">Serving All Over the UK</span>
              </div>
            </div>
          </div>

          {/* Right Column - Eligibility Card */}
          <div className="backdrop-blur-lg bg-white/15 rounded-3xl p-8 border border-white/25 shadow-2xl hover:bg-white/20 transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              You could be <span className="text-[#FFEA00] drop-shadow-lg">Eligible</span> if
            </h2>

            <div className="space-y-5 mb-8">
              {/* Eligibility Criteria */}
              <div className="flex items-start space-x-4 p-3  bg-white/10 rounded-xl border border-white/20">
                <div className="flex-shrink-0 w-7 h-7  rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                  <BadgeCheck className="w-6 h-6 text-[#FFEA00]" />
                </div>
                <p className="text-white font-medium">You own (or rent) your home privately</p>
              </div>

              <div className="flex items-start space-x-4 p-3  bg-white/10 rounded-xl border border-white/20">
                <div className="flex-shrink-0 w-7 h-7  rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                      <BadgeCheck className="w-6 h-6 text-[#FFEA00]" />
                </div>
                <p className="text-white font-medium">You receive means tested government benefit (e.g., Universal Credit, PIP, Pension Credit, etc.)</p>
              </div>

              <div className="flex items-start space-x-4 p-3  bg-white/10 rounded-xl border border-white/20">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                      <BadgeCheck className="w-6 h-6 text-[#FFEA00]" />
                </div>
                <p className="text-white font-medium">Your property is poorly insulated or has old heating</p>
              </div>

              <div className="flex items-start space-x-4 p-3  bg-white/10 rounded-xl border border-white/20">
                <div className="flex-shrink-0 w-7 h-7  rounded-full flex items-center justify-center mt-0.5 shadow-lg">
                <BadgeCheck className="w-6 h-6 text-[#FFEA00]" />
                </div>
                <p className="text-white font-medium">You live in United Kingdom.</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className=" bg-white/10 rounded-2xl p-3 border border-white/20 mb-3">
                <p className="text-[#FFEA00] font-bold text-lg mb-2 drop-shadow-sm">
                  It Takes Less Than 60 Seconds
                </p>
                <p className="text-white/90 text-sm">Quick eligibility check</p>
              </div>
              <button className="w-full bg-[#14433C] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105">
                Check If You Qualify
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;