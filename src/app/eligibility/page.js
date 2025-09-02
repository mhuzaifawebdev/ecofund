'use client'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();
  
  // Track form step - step 1: eligibility questions, step 2: contact form
  const [formStep, setFormStep] = useState(1);
  
  // Add loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add submission status messages
  const [submissionStatus, setSubmissionStatus] = useState({
    type: '', // 'success', 'error'
    message: ''
  });
  
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

  // State for tracking form validation errors
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field, value) => {
    // Create updated form data with the new value
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    // Update the form data state
    setFormData(updatedFormData);
    
    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const handleNextClick = () => {
    // Validate all required fields
    const errors = {};
    const requiredFields = [
      'isHomeowner', 
      'receivingBenefits', 
      'meansTestedBenefits', 
      'homeSuppliedWith', 
      'boilerAge'
    ];
    
    let hasErrors = false;
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `This field is required`;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setFormErrors(errors);
      // Scroll to the first error field
      document.querySelector('.invalid\\:border-red-500').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      return;
    }
    
    // If no errors, proceed to the next step
    setFormStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate contact form fields
    const errors = {};
    const contactFields = ['email', 'fullName', 'phoneNumber', 'address', 'postalCode'];
    
    let hasErrors = false;
    contactFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `This field is required`;
        hasErrors = true;
      } else if (field === 'email' && !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
        hasErrors = true;
      } else if (field === 'phoneNumber' && !isValidPhone(formData.phoneNumber)) {
        errors.phoneNumber = 'Please enter a valid phone number';
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setFormErrors(errors);
      // Scroll to the first error field
      document.querySelector('.border-red-500')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    setSubmissionStatus({ type: '', message: '' });
    
    try {
      // Submit data to API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Show success message briefly
        setSubmissionStatus({ 
          type: 'success', 
          message: 'Thank you! Your application has been submitted.' 
        });
        
        // Redirect to home page after a brief delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        // Log the detailed error for debugging
        console.error('Form submission error:', result);
        
        // Show error message with more details if available
        setSubmissionStatus({ 
          type: 'error', 
          message: result.message || 'There was an error submitting your application. Please try again.' 
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
      setIsSubmitting(false);
    }
  };
  
  // Helper validation functions
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isValidPhone = (phone) => {
    // Basic UK phone validation (adjust as needed)
    return /^(\+44|0)[0-9]{10,11}$/.test(phone.replace(/\s+/g, ''));
  };

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/cta.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
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
                        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.isHomeowner ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                        onChange={(e) => handleChange('isHomeowner', e.target.value)}
                        value={formData.isHomeowner}
                        required
                      >
                        <option value="">- Select -</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                      {formErrors.isHomeowner && (
                        <p className="text-red-300 text-sm mt-1">{formErrors.isHomeowner}</p>
                      )}
                    </div>
                  </div>

                  {/* Benefits question */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Anyone In Your Household Receiving Benefits?</label>
                    <div className="relative">
                      <select 
                        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.receivingBenefits ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                        onChange={(e) => handleChange('receivingBenefits', e.target.value)}
                        value={formData.receivingBenefits}
                        required
                      >
                        <option value="">- Select -</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                      {formErrors.receivingBenefits && (
                        <p className="text-red-300 text-sm mt-1">{formErrors.receivingBenefits}</p>
                      )}
                    </div>
                  </div>

                  {/* Means Tested Benefits - always shown */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">
                      Is Anyone In Your Household In Receipt of Means Tested Benefits Such As:
                    </label>
                    <div className="relative">
                      <select 
                        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.meansTestedBenefits ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                        onChange={(e) => handleChange('meansTestedBenefits', e.target.value)}
                        value={formData.meansTestedBenefits}
                        required
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
                      {formErrors.meansTestedBenefits && (
                        <p className="text-red-300 text-sm mt-1">{formErrors.meansTestedBenefits}</p>
                      )}
                    </div>
                  </div>

                  {/* Home Supply - always shown */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Is Your Home Supplied With:</label>
                    <div className="relative">
                      <select 
                        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.homeSuppliedWith ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                        onChange={(e) => handleChange('homeSuppliedWith', e.target.value)}
                        value={formData.homeSuppliedWith}
                        required
                      >
                        <option value="">- Select -</option>
                        <option value="gas">Gas</option>
                        <option value="electricity">Electricity</option>
                        <option value="lpg">LPG</option>
                        <option value="none">None of Above</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                      {formErrors.homeSuppliedWith && (
                        <p className="text-red-300 text-sm mt-1">{formErrors.homeSuppliedWith}</p>
                      )}
                    </div>
                  </div>

                  {/* Boiler Age - always shown */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">How Old Is Your Boiler?</label>
                    <div className="relative">
                      <select 
                        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.boilerAge ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                        onChange={(e) => handleChange('boilerAge', e.target.value)}
                        value={formData.boilerAge}
                        required
                      >
                        <option value="">- Select -</option>
                        <option value="over-10-years">Over 10 Years</option>
                        <option value="over-15-years">Over 15 Years</option>
                        <option value="over-20-years">Over 20 Years</option>
                        <option value="no-boiler">I Do not Have a Boiler</option>
                        <option value="none">None of Above</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
                      {formErrors.boilerAge && (
                        <p className="text-red-300 text-sm mt-1">{formErrors.boilerAge}</p>
                      )}
                    </div>
                  </div>

                  {/* Next button for eligibility form */}
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="button" 
                      onClick={handleNextClick}
                      className="bg-white text-[#14433C] font-semibold py-3 px-8 rounded-lg hover:bg-white/90 transition-all"
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* General validation error message */}
                  {Object.keys(formErrors).length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                      <p className="text-white text-sm">
                        Please fill in all required fields before proceeding.
                      </p>
                    </div>
                  )}
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
                      className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.email ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-300 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-white font-medium">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.fullName ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                    />
                    {formErrors.fullName && (
                      <p className="text-red-300 text-sm mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="text-white font-medium">Phone Number</label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number (e.g., 07123456789)"
                      className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.phoneNumber ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      required
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-red-300 text-sm mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                  
                  {/* Address */}
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-white font-medium">Address</label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.address ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                    {formErrors.address && (
                      <p className="text-red-300 text-sm mt-1">{formErrors.address}</p>
                    )}
                  </div>
                  
                  {/* Postal Code */}
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="text-white font-medium">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="Enter your postal code"
                      className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${formErrors.postalCode ? 'border-red-500' : 'border-transparent'} focus:border-red-500 invalid:border-red-500`}
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                      required
                    />
                    {formErrors.postalCode && (
                      <p className="text-red-300 text-sm mt-1">{formErrors.postalCode}</p>
                    )}
                  </div>
                  
                  {/* Submit button */}
                  <div className="pt-4 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-white text-[#14433C] font-semibold py-3 px-8 rounded-lg hover:bg-white/90 transition-all flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#14433C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                  
                  {/* Form messages */}
                  {Object.keys(formErrors).length > 0 && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                      <p className="text-white text-sm">
                        Please fill in all required fields correctly before submitting.
                      </p>
                    </div>
                  )}
                  
                  {/* Submission status messages */}
                  {submissionStatus.type === 'success' && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                      <p className="text-white text-sm font-medium">
                        {submissionStatus.message}
                      </p>
                    </div>
                  )}
                  
                  {submissionStatus.type === 'error' && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                      <p className="text-white text-sm">
                        {submissionStatus.message}
                      </p>
                    </div>
                  )}
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
