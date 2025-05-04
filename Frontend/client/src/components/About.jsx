import React from 'react';
import { PawPrint, Heart, Award, Users, Star } from 'lucide-react';

const About = () => {
  return (
    <section className="bg-white py-6">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold tracking-wide uppercase">About Us</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Transform Your Pet's Behavior
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to a well-behaved pet starts here. We provide expert-guided training that you can do at home, on your schedule.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="relative mb-6">
          <div className="relative bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700">
                At PawPerfection, we believe that every pet parent should have access to professional training techniques. 
                Our platform democratizes pet training by bringing expert knowledge directly to your home, making it 
                accessible, affordable, and convenient for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-6">
              <PawPrint className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Approach</h3>
            <p className="text-gray-600">
              Every pet is unique. Our training programs adapt to your pet's personality, age, and learning pace.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-6">
              <Heart className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Positive Training</h3>
            <p className="text-gray-600">
              We focus on reward-based methods that strengthen the bond between you and your pet.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-6">
              <Award className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
            <p className="text-gray-600">
              Access to certified trainers and a comprehensive library of training resources.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg bg-white">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-4">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">10,000+</div>
            <div className="text-sm text-gray-600 mt-1">Happy Pet Parents</div>
          </div>

          <div className="p-6 rounded-lg bg-white">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-full mx-auto mb-4">
              <Star className="h-5 w-5 text-secondary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600 mt-1">Client Rating</div>
          </div>

          <div className="p-6 rounded-lg bg-white">
            <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-full mx-auto mb-4">
              <PawPrint className="h-5 w-5 text-accent-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600 mt-1">Training Programs</div>
          </div>

          <div className="p-6 rounded-lg bg-white">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-4">
              <Award className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600 mt-1">Expert Trainers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;