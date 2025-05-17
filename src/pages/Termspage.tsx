import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-orange-800 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="pb-5 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: June 1, 2025</p>
          </div>
          
          <div className="py-5 space-y-6 text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p>
              Welcome to our application. These Terms and Conditions govern your use of our
              application and provide information about the service we provide. When you use our
              service, you agree to these terms.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">2. Using Our Service</h2>
            <p>
              You must follow any policies made available to you within the service. Don't misuse
              our services. For example, don't interfere with our services or try to access them
              using a method other than the interface and the instructions that we provide.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">3. Privacy and Copyright Protection</h2>
            <p>
              Our privacy policies explain how we treat your personal data and protect your
              privacy when you use our services. By using our services, you agree that we can use
              such data in accordance with our privacy policies.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">4. Your Content in Our Services</h2>
            <p>
              Some of our services allow you to upload, submit, store, send or receive content.
              You retain ownership of any intellectual property rights that you hold in that content.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">5. Modifying and Terminating Our Services</h2>
            <p>
              We are constantly changing and improving our services. We may add or remove
              functionalities or features, and we may suspend or stop a service altogether.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">6. Liability for Our Services</h2>
            <p>
              When permitted by law, we, and our suppliers and distributors, will not be responsible
              for lost profits, revenues, or data, financial losses or indirect, special, consequential,
              exemplary, or punitive damages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;