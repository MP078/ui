import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: June 1, 2025</p>
          </div>
          
          <div className="py-5 space-y-6 text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p>
              We collect information to provide better services to all our users. This includes
              information you provide to us, such as your name, email address, phone number, or
              credit card. We also collect information about the services that you use and how
              you use them.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Information</h2>
            <p>
              We use the information we collect from all our services to provide, maintain, protect
              and improve them, to develop new ones, and to protect our users. We also use this
              information to offer you tailored content.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">3. Information We Share</h2>
            <p>
              We do not share personal information with companies, organizations, or individuals outside
              of our company except in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With your consent</li>
              <li>For external processing</li>
              <li>For legal reasons</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900">4. Information Security</h2>
            <p>
              We work hard to protect our users from unauthorized access to or unauthorized alteration,
              disclosure, or destruction of information we hold.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">5. Changes</h2>
            <p>
              Our Privacy Policy may change from time to time. We will not reduce your rights under this
              Privacy Policy without your explicit consent. We will post any privacy policy changes on this
              page and, if the changes are significant, we will provide a more prominent notice.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: privacy@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;