import React from 'react';
import {
  GraduationCap,
  Video,
  MessageCircle,
  Users,
  Calendar,
  Award,
  CheckCircle,
  PawPrint,
  PersonStanding,
  Salad ,
  ShieldCheck
} from 'lucide-react';

const Services = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 mb-4">
            <PawPrint className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Our Training Solutions</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Comprehensive Pet Training Services
          </h2>
          <p className="text-xl text-gray-600">
            From basic obedience to advanced skills, we offer personalized training programs 
            that fit your schedule and your pet's needs.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
          {/* Personalized Training for Pet */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-xl mb-6">
              <PersonStanding  className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Training Program</h3>
            <p className="text-gray-600 mb-6">
              Specialized custom training program for your Pet
            </p>
            <ul className="space-y-3">
              {['Train pet according to you', 'Check the Growth', '24/7 guidance'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle  className="h-5 w-5 text-primary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Personalized Diet for Pet */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-xl mb-6">
              <Salad className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nourish the Pet</h3>
            <p className="text-gray-600 mb-6">
              Feed the pet what's perfect for them 
            </p>
            <ul className="space-y-3">
              {['Perfect Nutrients', 'Protein Guidance', 'Health Support'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Unlock Achievements */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-accent-100 rounded-xl mb-6">
              <Award className="h-7 w-7 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
            <p className="text-gray-600 mb-6">
              Unlock new achievements for your pet by competing with others.
            </p>
            <ul className="space-y-3">
              {['Training rewards', 'Physical activities', 'Health battles'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Online Training */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-primary-100 rounded-xl mb-6">
              <Video className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Online Training Sessions</h3>
            <p className="text-gray-600 mb-6">
              Live, interactive training sessions with certified trainers from the comfort of your home.
            </p>
            <ul className="space-y-3">
              {['Personalized attention', 'Flexible scheduling', 'Real-time feedback'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Video Library */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-secondary-100 rounded-xl mb-6">
              <GraduationCap className="h-7 w-7 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Training Video Library</h3>
            <p className="text-gray-600 mb-6">
              Access our extensive library of professional training videos and tutorials.
            </p>
            <ul className="space-y-3">
              {['Step-by-step guides', 'Progress tracking', 'Downloadable resources'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-secondary-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Community Support */}
          <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-accent-100 rounded-xl mb-6">
              <Users className="h-7 w-7 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Community Support</h3>
            <p className="text-gray-600 mb-6">
              Join our community of pet parents and share experiences and success stories.
            </p>
            <ul className="space-y-3">
              {['Expert advice', 'Community forums', 'Success sharing'].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {

              icon: <Calendar className="h-6 w-6" />,
              title: 'Flexible Scheduling',
              description: 'Book sessions that fit your schedule',
            },
            {
              icon: <MessageCircle className="h-6 w-6" />,
              title: '24/7 Support',
              description: 'Get help whenever you need it',
            },
            {
              icon: <ShieldCheck  className="h-6 w-6" />,
              title: 'Certified Trainers',
              description: 'Learn from the best in the field',
            },
            {
              icon: <PawPrint className="h-6 w-6" />,
              title: 'Guaranteed Results',
              description: 'See improvement or money back',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-soft">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <div className="text-primary-600">{feature.icon}</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
