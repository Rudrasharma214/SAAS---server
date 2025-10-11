import React, { useState, useEffect } from 'react';
import { getAllPlans, createOrder, verifyPayment } from '../../services/planServices';
import { registerCompany, uploadLogo } from '../../services/adminServices';
import {
  CheckCircle,
  Building2,
  Mail,
  Globe,
  Upload,
  X,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Shield,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyRegister = () => {
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    contactEmail: '',
    website: '',
    logoUrl: '',
  });
  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (step === 3) {
      const fetchPlans = async () => {
        try {
          const response = await getAllPlans();
          setPlans(response.data.plans);
        } catch (error) {
          console.error('Error fetching plans:', error);
        }
      };
      fetchPlans();
    }
  }, [step]);

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.type.trim()) newErrors.type = 'Company type is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!validateStep2()) return;
      
      // Upload logo in step 2 before moving to step 3
      if (logoFile) {
        try {
          setUploadingLogo(true);
          const uploadResponse = await uploadLogo(logoFile);
          console.log('Upload response:', uploadResponse); // Debug log
          
          // Store the uploaded logo URL in separate state
          const logoUrl = uploadResponse.data;
          // console.log(logoUrl);
          setUploadedLogoUrl(logoUrl);
          
          // Also update formData for consistency
          setFormData(prevData => ({ 
            ...prevData, 
            logoUrl: logoUrl 
          }));
          
          // console.log('Updated logoUrl:', logoUrl); // Debug log
        } catch (error) {
          console.error('Logo upload error:', error);
          alert('Failed to upload logo. Please try again.');
          return;
        } finally {
          setUploadingLogo(false);
        }
      }
    }
    setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setUploadedLogoUrl('');
    setFormData({ ...formData, logoUrl: '' });
  };

  const handlePayment = async () => {
    if (!selectedPlan) return alert('Please select a plan.');

    try {
      const response = await createOrder(selectedPlan.price);
      const order = response.data;
      const options = {
        key: 'rzp_test_RR32EA0YhKP8k6',
        amount: order.amount,
        currency: order.currency,
        name: 'CompanyHub Platform',
        description: `Payment for ${selectedPlan.name}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const paymentData = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: order.id,
              razorpaySignature: response.razorpay_signature,
              amount: selectedPlan.price,
            };
            await verifyPayment(paymentData);
            
            const companyData = {
              ...formData,
              planId: selectedPlan._id,
              logoUrl: uploadedLogoUrl || formData.logoUrl, // Use uploadedLogoUrl first, fallback to formData
            };
            
            console.log('Company registration payload:', companyData);
            console.log('uploadedLogoUrl:', uploadedLogoUrl);
            console.log('formData.logoUrl:', formData.logoUrl);
            await registerCompany(companyData);
            alert('Company registered successfully!');
            navigate('/admin/dashboard');
          } catch (error) {
            console.error(error);
            alert('Payment or registration failed.');
          }
        },
        prefill: {
          email: formData.contactEmail,
          name: formData.name,
        },
        theme: { color: '#6366f1' },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      console.error(error);
      alert('Error creating order.');
    }
  };

  const steps = [
    { number: 1, label: 'Terms', icon: Shield },
    { number: 2, label: 'Details', icon: Building2 },
    { number: 3, label: 'Plan', icon: CreditCard },
  ];

  const renderStepper = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center relative max-w-md mx-auto">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>

        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isCompleted = step > s.number;
          const isActive = step === s.number;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, value, error, required = true }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {!required && <span className="text-gray-400 text-xs">(Optional)</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleFormChange}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition text-sm ${
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <X size={12} />
          {error}
        </p>
      )}
    </div>
  );

  const LogoUploadField = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Company Logo <span className="text-gray-400 text-xs">(Optional)</span>
      </label>

      {!logoPreview ? (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all"
          >
            <Upload size={22} className="text-gray-400 mb-1" />
            <span className="text-sm text-gray-600">Click to upload</span>
            <span className="text-xs text-gray-500 mt-0.5">PNG, JPG up to 5MB</span>
          </label>
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center gap-3 p-3 border border-indigo-200 bg-indigo-50 rounded-lg">
            <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
              <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{logoFile?.name}</p>
              <p className="text-xs text-gray-600">
                {logoFile?.size ? `${(logoFile.size / 1024).toFixed(1)} KB` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            {renderStepper()}

            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-indigo-100 rounded-full mb-3">
                <Shield size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Terms & Conditions</h2>
              <p className="text-sm text-gray-600">Review and accept our terms to continue</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 mb-6 max-h-64 overflow-y-auto border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Platform Usage Agreement</h3>
              <div className="space-y-2.5 text-xs text-gray-700 leading-relaxed">
                <p>
                  <strong>1. Acceptance:</strong> By registering, you agree to comply with all terms outlined here.
                </p>
                <p>
                  <strong>2. Billing:</strong> You agree to pay all fees for your chosen plan through our secure gateway.
                </p>
                <p>
                  <strong>3. Privacy:</strong> Your data is stored securely and never shared without consent.
                </p>
                <p>
                  <strong>4. Service:</strong> We strive for 99.9% uptime but cannot guarantee uninterrupted service.
                </p>
                <p>
                  <strong>5. Responsibilities:</strong> You're responsible for account security and all activities.
                </p>
                <p>
                  <strong>6. Cancellation:</strong> You may cancel anytime. No refunds for partial periods.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mb-6 cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mt-0.5 form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the <span className="font-semibold text-indigo-600">Terms & Conditions</span> and{' '}
                <span className="font-semibold text-indigo-600">Privacy Policy</span>
              </span>
            </label>

            <button
              onClick={handleNext}
              disabled={!termsAccepted}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                termsAccepted
                  ? 'bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            {renderStepper()}

            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-indigo-100 rounded-full mb-3">
                <Building2 size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Company Information</h2>
              <p className="text-sm text-gray-600">Tell us about your company</p>
            </div>

            {/* Two-column grid layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                icon={Building2}
                label="Company Name"
                name="name"
                placeholder="Enter company name"
                value={formData.name}
                error={errors.name}
              />

              <InputField
                icon={Building2}
                label="Company Type"
                name="type"
                placeholder="e.g., IT, Healthcare, Finance"
                value={formData.type}
                error={errors.type}
              />

              <InputField
                icon={Mail}
                label="Contact Email"
                name="contactEmail"
                type="email"
                placeholder="company@example.com"
                value={formData.contactEmail}
                error={errors.contactEmail}
              />

              <InputField
                icon={Globe}
                label="Website"
                name="website"
                placeholder="https://www.yourcompany.com"
                value={formData.website}
                required={false}
              />

              {/* Logo upload spans full width on larger screens */}
              <div className="md:col-span-2">
                <LogoUploadField />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={uploadingLogo}
                className={`flex-1 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  uploadingLogo
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg'
                }`}
              >
                {uploadingLogo ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Uploading...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            {renderStepper()}

            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-indigo-100 rounded-full mb-3">
                <CreditCard size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">Choose Your Plan</h2>
              <p className="text-sm text-gray-600">Select the perfect plan for your business</p>
            </div>

            {plans.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                <p className="text-sm text-gray-600">Loading plans...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {plans.map((plan, index) => {
                    const isSelected = selectedPlan?._id === plan._id;
                    const isPopular = index === 1;

                    return (
                      <div
                        key={plan._id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`relative p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-500 text-white text-xs font-bold rounded-full">
                            Popular
                          </div>
                        )}

                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h4>
                          <div className="mb-2">
                            <span className="text-3xl font-bold text-indigo-600">
                              ₹{plan.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-gray-600 text-xs">/mo</span>
                          </div>
                          <p className="text-xs text-gray-600">{plan.durationInDays} days</p>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span>{plan.maxManagers} Managers</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span>{plan.maxEmployees} Employees</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span>24/7 Support</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span>Analytics</span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-3 right-3 bg-indigo-600 rounded-full p-1">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedPlan}
                    className={`flex-1 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                      selectedPlan
                        ? 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <CreditCard size={18} />
                    Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50 py-8 px-4 flex items-center">
      {renderStep()}
    </div>
  );
};

export default CompanyRegister;
