import Image from 'next/image';
import Link from 'next/link';
import { Check, Shield, Zap, Sun } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cta.png"
          alt="Happy family with solar panels"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white space-y-6">
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Funding is Limited — Don't Miss Out on What You're{' '}
              <span className="text-[#FFEA00]">Entitled To</span>
            </h2>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
              ECO4 and GBIS grants are offered on a first-come, first-served basis. 
              Once funding runs out, you may miss your chance to receive:
            </p>

            {/* Benefits List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#14433C] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-medium">Free insulation</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#14433C] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-medium">Free boiler/heating upgrades</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#14433C] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-medium">Air source heat pumps</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#14433C] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-medium">Solar panels</span>
              </div>
            </div>

            {/* Call to Action Text */}
            <div className="pt-6">
              <p className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Check now to secure your household's upgrade before it's too late.
              </p>
            </div>
          </div>

          {/* Right Column - CTA Card */}
          <div className="mt-8 lg:mt-0">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              {/* CTA Button */}
              <div className="text-center mb-6">
                <Link href="/eligibility">
                  <button className="w-full bg-[#14433C] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg sm:text-xl shadow-xl hover:shadow-green-500/25 transform hover:scale-105">
                    Start Your Application Today
                  </button>
                </Link>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5 text-[#FFEA00]" />
                  <span className="text-white font-medium">It takes less than 60 Seconds</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-5 h-5 text-[#14433C]" />
                  <span className="text-white font-medium">No Obligation</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Sun className="w-4 h-4 text-[#FFEA00]" />
                    <span>Government Backed</span>
                  </div>
                  <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-[#14433C]" />
                    <span>Fully Funded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;