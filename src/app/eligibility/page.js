'use client'
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Reusable message component for form feedback
const FormMessage = ({ type, message }) => {
  if (!message) return null;
  
  const styles = {
    error: "bg-red-500/20 border-red-500",
    success: "bg-green-500/20 border-green-500",
    warning: "bg-yellow-500/20 border-yellow-500"
  };
  
  return (
    <div className={`mt-4 p-3 ${styles[type]} border rounded-lg`}>
      <p className="text-white text-sm font-medium">
        {message}
      </p>
    </div>
  );
};

// Reusable select field component
const FormSelect = ({ label, name, options, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="text-white font-medium">{label}</label>
    <div className="relative">
      <select 
        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white border-2 ${error ? 'border-red-500' : 'border-transparent'}`}
        onChange={(e) => onChange(name, e.target.value)}
        value={value}
        aria-invalid={error ? "true" : "false"}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#14433C] w-5 h-5 pointer-events-none" />
      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

// Reusable input field component
const FormInput = ({ label, id, type, placeholder, value, onChange, error }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-white font-medium">{label}</label>
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full py-3 px-4 bg-white text-[#14433C] rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-2 ${error ? 'border-red-500' : 'border-transparent'}`}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <p className="text-red-300 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

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
    const requiredFields = [
      'isHomeowner', 
      'receivingBenefits', 
      'meansTestedBenefits', 
      'homeSuppliedWith', 
      'boilerAge'
    ];
    
    const { errors, hasErrors, errorMessage } = validateFields(requiredFields);
    
    if (hasErrors) {
      setFormErrors(errors);
      setSubmissionStatus({
        type: 'error',
        message: errorMessage
      });
      
      // Scroll to the first error field
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Focus on the first error field to highlight the issue
        firstErrorField.focus();
      }
      return;
    }
    
    // Clear any previous error messages
    setFormErrors({});
    setSubmissionStatus({type: '', message: ''});
    
    // If no errors, proceed to the next step
    setFormStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate contact form fields
    const contactFields = ['email', 'fullName', 'phoneNumber', 'address', 'postalCode'];
    const { errors, hasErrors, errorMessage } = validateFields(contactFields);
    
    if (hasErrors) {
      setFormErrors(errors);
      setSubmissionStatus({
        type: 'error',
        message: errorMessage
      });
      
      // Scroll to the first error field
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Focus on the first error field to highlight the issue
        firstErrorField.focus();
      }
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
  
  // Shared validation function for both form steps
  const validateFields = (fields) => {
    const errors = {};
    let hasErrors = false;
    let errorMessage = '';
    
    fields.forEach(field => {
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
      errorMessage = `Please fill in all required fields correctly before ${fields.includes('email') ? 'submitting' : 'proceeding'}.`;
    }
    
    return { errors, hasErrors, errorMessage };
  };

  return (
    <section className="relative w-full py-12 md:py-20 mt-20 md:mt-0 overflow-hidden">
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
      <div className="container mx-auto px-4 relative z-10 ">
        <div className="max-w-2xl mx-auto bg-[#14433C] rounded-3xl shadow-xl p-6 md:p-10 ">
          <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-6">
            Find out if you are eligible for FREE<br />
            Energy & Insulation upgrades.
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {formStep === 1 ? (
              <>
                {/* Step 1: Eligibility Questions */}
                <div className="space-y-6">
                  {/* Homeowner question */}
                  <FormSelect
                    label="Are you a Homeowner?"
                    name="isHomeowner"
                    options={[
                      { value: "", label: "- Select -" },
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    value={formData.isHomeowner}
                    onChange={handleChange}
                    error={formErrors.isHomeowner}
                  />

                  {/* Benefits question */}
                  <FormSelect
                    label="Anyone In Your Household Receiving Benefits?"
                    name="receivingBenefits"
                    options={[
                      { value: "", label: "- Select -" },
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]}
                    value={formData.receivingBenefits}
                    onChange={handleChange}
                    error={formErrors.receivingBenefits}
                  />

                  {/* Means Tested Benefits - always shown */}
                  <FormSelect
                    label="Is Anyone In Your Household In Receipt of Means Tested Benefits Such As:"
                    name="meansTestedBenefits"
                    options={[
                      { value: "", label: "- Select -" },
                      { value: "universal credit", label: "Universal Credit" },
                      { value: "working tax credit", label: "Working Tax Credit" },
                      { value: "child tax credit", label: "Child Tax Credit" },
                      { value: "income support", label: "Income Support" },
                      { value: "jobseekers allowance", label: "Jobseekers Allowance" },
                      { value: "employment support allowance", label: "Income Based Employment & Support Allowance" },
                      { value: "housing benefits", label: "Housing Benefits" },
                      { value: "pension credit", label: "Pension Credit" },
                      { value: "child benefits", label: "Child Benefits" },
                      { value: "none", label: "None of Above" }
                    ]}
                    value={formData.meansTestedBenefits}
                    onChange={handleChange}
                    error={formErrors.meansTestedBenefits}
                  />

                  {/* Home Supply - always shown */}
                  <FormSelect
                    label="Is Your Home Supplied With:"
                    name="homeSuppliedWith"
                    options={[
                      { value: "", label: "- Select -" },
                      { value: "gas", label: "Gas" },
                      { value: "electricity", label: "Electricity" },
                      { value: "lpg", label: "LPG" },
                      { value: "none", label: "None of Above" }
                    ]}
                    value={formData.homeSuppliedWith}
                    onChange={handleChange}
                    error={formErrors.homeSuppliedWith}
                  />

                  {/* Boiler Age - always shown */}
                  <FormSelect
                    label="How Old Is Your Boiler?"
                    name="boilerAge"
                    options={[
                      { value: "", label: "- Select -" },
                      { value: "over-10-years", label: "Over 10 Years" },
                      { value: "over-15-years", label: "Over 15 Years" },
                      { value: "over-20-years", label: "Over 20 Years" },
                      { value: "no-boiler", label: "I Do not Have a Boiler" },
                      { value: "none", label: "None of Above" }
                    ]}
                    value={formData.boilerAge}
                    onChange={handleChange}
                    error={formErrors.boilerAge}
                  />

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
                  {submissionStatus.message && (
                    <FormMessage type={submissionStatus.type} message={submissionStatus.message} />
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
                  <FormInput 
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={formErrors.email}
                  />
                  
                  {/* Full Name */}
                  <FormInput 
                    label="Full Name"
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={formErrors.fullName}
                  />
                  
                  {/* Phone Number */}
                  <FormInput 
                    label="Phone Number"
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number (e.g., 07123456789)"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={formErrors.phoneNumber}
                  />
                  
                  {/* Address */}
                  <FormInput 
                    label="Address"
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    error={formErrors.address}
                  />
                  
                  {/* Postal Code */}
                  <FormInput 
                    label="Postal Code"
                    id="postalCode"
                    type="text"
                    placeholder="Enter your postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={formErrors.postalCode}
                  />
                  
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
                  
                  {/* Form messages - unified for all message types */}
                  {submissionStatus.message && (
                    <FormMessage type={submissionStatus.type} message={submissionStatus.message} />
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
