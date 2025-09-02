import Image from 'next/image';

export default function HowItWorks() {
  // Define the steps
  const steps = [
    {
      number: 1,
      title: "Application",
      description: "Customer applies via website, phone, or referral."
    },
    {
      number: 2,
      title: "Initial Call",
      description: "Our representative calls the customer, collects details, and checks eligibility."
    },
    {
      number: 3,
      title: "Eligibility Confirmation",
      description: "If eligible, we move forward to booking a physical assessment."
    },
    {
      number: 4,
      title: "Survey and Installation",
      description: "A surveyor will assess your property, then we'll call to book installation, which our team will complete."
    }
  ];

  return (
    <main className="w-full min-h-screen py-16 md:py-24 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta.png"
          alt="Background Image"
          fill
          className="object-cover "
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#ffffff] mb-12 md:mb-16">
          How It Works?
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left side - dark background */}
          <div className="bg-[#14433C] p-8 md:p-12 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none flex flex-col gap-12 md:gap-16">
            {steps.slice(0, 2).map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#14433C] text-2xl font-bold">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/90">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side - white background */}
          <div className="bg-white p-8 md:p-12 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none border-2 border-[#14433C] lg:border-l-0 flex flex-col gap-12 md:gap-16">
            {steps.slice(2).map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[#14433C] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-[#14433C] text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
