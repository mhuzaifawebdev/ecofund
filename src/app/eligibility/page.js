'use client'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Form = () => {
  // Track form step - step 1: eligibility questions, step 2: contact form
  const [formStep, setFormStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Eligibility questions
    isHomeowner: '',
    receivingBenefits: '',
    meansTestedBenefits: '',
    homeSuppliedWith: '',
    boilerAge: '',
    // Contact form fields
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    postalCode: ''
  });

  const handleChange = (field, value) => {
    // Create updated form data with the new value
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    // If changing the benefits field to "yes", clear the dependent fields
    // but don't automatically navigate to contact form
    if (field === 'receivingBenefits' && value === 'yes') {
      updatedFormData.meansTestedBenefits = '';
      updatedFormData.homeSuppliedWith = '';
      updatedFormData.boilerAge = '';
    }
    
    // Update the form data state
    setFormData(updatedFormData);
  };

  const handleNextClick = () => {
    // Move to contact form regardless of current situation
    // This button is only clickable when all required fields for the current step are filled
    setFormStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/cta.png" 
          alt="Background" 
          className="w-full h-full object-cover "
        />
      </div>

      {/* Form card container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto bg-[#14433C] rounded-3xl shadow-xl p-6 md:p-10">
          <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
            Find out if you are eligible for FREE<br />
            Energy & Insulation upgrades.
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 ? (
              <>
                {/* Step 1: Eligibility Questions */}
                <div className="space-y-6">
                  {/* Homeowner question */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Are you a Homeowner?</label>
                    <div className="relative">
                      <select 
                        className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                        onChange={(e) => handleChange('isHomeowner', e.target.value)}
                        value={formData.isHomeowner}
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Please select if you are a homeowner")}
                        onInput={(e) => e.target.setCustomValidity("")}
                      >
                        <option value="">- Select -</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Benefits question */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Anyone In Your Household Receiving Benefits?</label>
                    <div className="relative">
                      <select 
                        className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                        onChange={(e) => handleChange('receivingBenefits', e.target.value)}
                        value={formData.receivingBenefits}
                        required
                        onInvalid={(e) => e.target.setCustomValidity("Please select if anyone in your household is receiving benefits")}
                        onInput={(e) => e.target.setCustomValidity("")}
                      >
                        <option value="">- Select -</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Show additional fields only if benefits is "no" */}
                  {formData.receivingBenefits === 'no' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-white font-medium">
                          Is Anyone In Your Household In Receipt of Means Tested Benefits Such As:
                        </label>
                        <div className="relative">
                          <select 
                            className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                            onChange={(e) => handleChange('meansTestedBenefits', e.target.value)}
                            value={formData.meansTestedBenefits}
                            required={formData.receivingBenefits === 'no'}
                            onInvalid={(e) => e.target.setCustomValidity("Please select which means tested benefits your household receives")}
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">- Select -</option>
                            <option value="universal credit">Universal Credit</option>
                            <option value="working tax credit">Working Tax Credit</option>
                            <option value="child tax credit">Child Tax Credit</option>
                            <option value="income support">Income Support</option>
                            <option value="jobseekers allowance">Jobseekers Allowance</option>
                            <option value="employment support allowance">Income Based Employment & Support Allowance</option>
                            <option value="housing benefits">Housing Benefits</option>
                            <option value="pension credit">Pension Credit</option>
                            <option value="child benefits">Child Benefits</option>
                            <option value="none">None of Above</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-white font-medium">Is Your Home Supplied With:</label>
                        <div className="relative">
                          <select 
                            className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                            onChange={(e) => handleChange('homeSuppliedWith', e.target.value)}
                            value={formData.homeSuppliedWith}
                            required={formData.receivingBenefits === 'no'}
                            onInvalid={(e) => e.target.setCustomValidity("Please select what your home is supplied with")}
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">- Select -</option>
                            <option value="gas">Gas</option>
                            <option value="electricity">Electricity</option>
                            <option value="lpg">LPG</option>
                            <option value="none">None of Above</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-white font-medium">How Old Is Your Boiler?</label>
                        <div className="relative">
                          <select 
                            className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                            onChange={(e) => handleChange('boilerAge', e.target.value)}
                            value={formData.boilerAge}
                            required={formData.receivingBenefits === 'no'}
                            onInvalid={(e) => e.target.setCustomValidity("Please select how old your boiler is")}
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">- Select -</option>
                            <option value="over-10-years">Over 10 Years</option>
                            <option value="over-15-years">Over 15 Years</option>
                            <option value="over-20-years">Over 20 Years</option>
                            <option value="no-boiler">I Do not Have a Boiler</option>
                            <option value="none">None of Above</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Next button for eligibility form */}
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="button" 
                      onClick={handleNextClick}
                      className="bg-white text-[#14433C] font-semibold py-3 px-8 rounded-lg hover:bg-white/90 transition-all"
                      disabled={
                        !formData.isHomeowner || 
                        !formData.receivingBenefits || 
                        (formData.receivingBenefits === 'no' && 
                          (!formData.meansTestedBenefits || 
                           !formData.homeSuppliedWith || 
                           !formData.boilerAge)
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Contact Information Form */}
                <div className="space-y-4">
                  <h3 className="text-white text-xl font-semibold text-center">
                    Find out if you are eligible for 100%<br />
                    FREE Energy & Insulation upgrades
                  </h3>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-white font-medium">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Please enter your full name")}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-white font-medium">Phone Number</label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Please enter your phone number")}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  
                  {/* Address */}
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-white font-medium">Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Please enter your address")}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  
                  {/* Postal Code */}
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="text-white font-medium">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="Enter your postal code"
                      className="w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 border-transparent focus:border-red-500 invalid:border-red-500"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      required
                      onInvalid={(e) => e.target.setCustomValidity("Please enter your postal code")}
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  
                  {/* Submit button */}
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-white text-[#14433C] font-semibold py-3 px-8 rounded-lg hover:bg-white/90 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
