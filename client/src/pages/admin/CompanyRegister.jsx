import React, { useState, useEffect } from 'react';
import { getAllPlans, createOrder, verifyPayment } from '../../services/planServices';
import { registerCompany } from '../../services/adminServices';

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
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    if (!selectedPlan) return alert('Please select a plan.');
    try {
      const response = await createOrder(selectedPlan.price);
      const order = response.data;
      const options = {
        key: 'rzp_test_RR32EA0YhKP8k6',
        amount: order.amount,
        currency: order.currency,
        name: 'SAAS Platform',
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
            await registerCompany({ ...formData, planId: selectedPlan._id });
            alert('Company registered successfully!');
          } catch (error) {
            console.error(error);
            alert('Payment or registration failed.');
          }
        },
        prefill: {},
        theme: { color: '#4f46e5' },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      console.error(error);
      alert('Error creating order.');
    }
  };

  const renderStepper = () => (
    <div className="flex justify-center items-center mb-10 space-x-4">
      {['Terms', 'Details', 'Plan'].map((label, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
              step === idx + 1
                ? 'bg-indigo-600 text-white'
                : step > idx + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
            }`}
          >
            {idx + 1}
          </div>
          {idx !== 2 && <div className="w-16 h-1 bg-gray-300"></div>}
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg mx-auto">
            {renderStepper()}
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Terms & Conditions</h2>
            <p className="text-gray-600 mb-6">
              Before proceeding, please accept our terms and conditions for using our platform.
            </p>
            <label className="flex items-center space-x-3 mb-6">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="form-checkbox h-6 w-6 text-indigo-600"
              />
              <span className="text-gray-700 font-medium">I accept the terms and conditions</span>
            </label>
            <button
              onClick={handleNext}
              disabled={!termsAccepted}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                termsAccepted
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg mx-auto">
            {renderStepper()}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Company Details</h2>
            <div className="space-y-4">
              {['name', 'type', 'contactEmail', 'website', 'logoUrl'].map((field) => (
                <input
                  key={field}
                  type={field === 'contactEmail' ? 'email' : 'text'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="py-3 px-6 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl mx-auto">
            {renderStepper()}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Select a Plan & Payment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-6 border rounded-2xl cursor-pointer transition transform hover:scale-105 ${
                    selectedPlan?._id === plan._id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                  <p className="text-gray-600 mb-2">{plan.description}</p>
                  <p className="text-lg font-bold">₹{plan.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="py-3 px-6 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
              >
                Previous
              </button>
              <button
                onClick={handlePayment}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:scale-105 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="min-h-screen bg-gray-100 py-16">{renderStep()}</div>;
};

export default CompanyRegister;
