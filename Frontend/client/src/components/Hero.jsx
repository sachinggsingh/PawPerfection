import React from 'react';
import { Play, PawPrint, Shield, Clock } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  const handleStartTraining = () => {
    navigate('/courses');
  };

  const handleConsultation = () => {
    navigate('/contact');
  }
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-16 pb-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-secondary-100 blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 mb-8">
              <PawPrint className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Transform Your Pet's Life</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Expert Pet Training,
              <span className="block text-primary-600">Right at Home</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Unlock your pet's full potential with our professional training programs. 
              Learn proven techniques to create a happy, well-behaved companion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={handleStartTraining} className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors duration-200">
                <Play className="h-5 w-5 mr-2" />
                Start Training Now
              </button>
              <button onClick={handleConsultation} className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors duration-200">
                Free Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-3">
                  <Shield className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">100% Safe Methods</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">Flexible Schedule</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-3">
                  <PawPrint className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-sm text-gray-600">Expert Guidance</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg"
                alt="Happy dog with trainer"
                className="w-full h-[600px] object-cover"
              />
              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">1000+</div>
                    <div className="text-sm text-gray-600">Success Stories</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-2xl font-bold text-primary-600">4.9</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">30+</div>
                    <div className="text-sm text-gray-600">Pro Trainers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;