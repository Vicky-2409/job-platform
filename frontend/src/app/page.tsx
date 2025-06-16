import Link from 'next/link';
import { Users, Zap, Shield, Clock, ArrowRight, Briefcase, UserCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Talent with Opportunity
            <span className="text-blue-600"> Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern job platform that enables instant interview requests with real-time notifications. 
            No more waiting, no more delays – just seamless connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply"
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <Briefcase className="w-5 h-5" />
              <span>Apply for Jobs</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/recruiter"
              className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <UserCheck className="w-5 h-5" />
              <span>Recruiter Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Built for speed, efficiency, and real-time collaboration between candidates and recruiters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Notifications</h3>
              <p className="text-gray-600">
                Recruiters receive real-time alerts the moment a new application is submitted.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Application</h3>
              <p className="text-gray-600">
                Simple, streamlined form that takes less than 2 minutes to complete.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Submit applications and manage requests anytime, anywhere with our responsive platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and reliable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Application</h3>
              <p className="text-gray-600">
                Fill out our quick form with your details and the position you're interested in.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Review</h3>
              <p className="text-gray-600">
                Recruiters are instantly notified and can review your application immediately.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Response</h3>
              <p className="text-gray-600">
                Receive acceptance notifications and next steps within hours, not days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2min</div>
              <div className="text-blue-100">Average application time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24hr</div>
              <div className="text-blue-100">Response time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Real-time updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of candidates and recruiters who trust our platform for their hiring needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply"
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <Briefcase className="w-5 h-5" />
              <span>Start Your Application</span>
            </Link>
            <Link 
              href="/recruiter"
              className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <UserCheck className="w-5 h-5" />
              <span>Access Dashboard</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}