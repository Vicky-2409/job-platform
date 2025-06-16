import ApplicantForm from '../../components/ApplicantForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Interview | Job Platform',
  description: 'Submit your interview request for exciting job opportunities',
};

export default function ApplyPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Apply for Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your next career opportunity. 
            Submit your interview request and we'll get back to you promptly.
          </p>
        </div>
        
        <ApplicantForm />
        
        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>✓ Your request is sent instantly to our recruiting team</p>
              <p>✓ We'll review your application within 24 hours</p>
              <p>✓ You'll receive an email confirmation once accepted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}