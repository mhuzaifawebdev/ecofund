'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sandra Smith",
      rating: 5,
      text: "Great Experience with awesome services provided by the Ecolite Energy Solutions and the team of the Bilal Sandhu and his team who did the loft was pure professional and did their job in very wisely manners I highly recommend the company for loft and GBIS",
      platform: "Google"
    },
    {
      id: 2,
      name: "James Wilson",
      rating: 5,
      text: "Excellent service from start to finish. The team was professional, punctual, and did an amazing job with our home insulation. Highly recommend Ecolite Energy Solutions for anyone looking for quality work.",
      platform: "Google"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      rating: 5,
      text: "Outstanding experience! The installation was completed quickly and efficiently. The team explained everything clearly and left our home spotless. Very satisfied with the free energy upgrades we received.",
      platform: "Google"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Professional service and great results. Our heating bills have significantly reduced after the installation. The process was smooth and the team was very knowledgeable about the ECO4 scheme.",
      platform: "Google"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-[#FFEA00] fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/testimonal.png"
          alt="Testimonial background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            See What Other UK Residents Are Saying
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Google Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#14433C]/90 backdrop-blur-sm rounded-lg px-6 py-3 border border-[#FFEA00]/30">
              <div className="flex items-center space-x-3">
                <span className="text-white font-bold text-lg">Google</span>
                <div className="flex items-center space-x-1">
                  <span className="text-[#FFEA00] font-bold text-lg">4.9</span>
                  <Star className="w-5 h-5 text-[#FFEA00] fill-current" />
                </div>
              </div>
              <p className="text-white/80 text-sm mt-1">1000+ successful installs</p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            <div className="bg-[#14433C]/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-[#FFEA00]/30 shadow-2xl min-h-[280px] flex flex-col justify-between">
              {/* Testimonial Content */}
              <div className="mb-6">
                <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
                  "{testimonials[currentSlide].text}"
                </p>
                
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {testimonials[currentSlide].name}
                    </h4>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(testimonials[currentSlide].rating)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#14433C]/80 hover:bg-[#14433C] backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-[#FFEA00]/30 z-10"
            >
              <ChevronLeft className="w-5 h-5 text-[#FFEA00]" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#14433C]/80 hover:bg-[#14433C] backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-[#FFEA00]/30 z-10"
            >
              <ChevronRight className="w-5 h-5 text-[#FFEA00]" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[#FFEA00] scale-125'
                    : 'bg-white/40 hover:bg-[#FFEA00]/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Your free upgrade is just one form away
            </h3>
            <p className="text-lg text-white/90 mb-8">
              Check if your home qualifies today — it's fast, free & secure
            </p>
            <button className="bg-[#14433C] hover:bg-[#14433C]/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-xl hover:shadow-[#14433C]/25 transform hover:scale-105 border border-[#FFEA00]/30" >
              Check Your Eligibility Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;