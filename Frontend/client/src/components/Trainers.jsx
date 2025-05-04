import React from 'react';
import { BadgeCheck, PawPrint } from 'lucide-react';

const trainers = [
  {
    name: 'Amit Sharma',
    specialty: 'Obedience & Puppy Training',
    experience: '5+ years',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Verma',
    specialty: 'Aggression & Behavior Correction',
    experience: '7+ years',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Ravi Khanna',
    specialty: 'Advanced Agility Training',
    experience: '6+ years',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Sneha Iyer',
    specialty: 'Diet & Health Guidance',
    experience: '4+ years',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const Trainers = () => {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 mb-4">
            <PawPrint className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Meet Our Trainers</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Expert Pet Trainers</h2>
          <p className="text-lg text-gray-600">
            Our certified trainers bring years of experience and a love for animals to every session.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{trainer.name}</h3>
              <p className="text-primary-600 font-medium mb-2">{trainer.specialty}</p>
              <div className="flex items-center justify-center text-gray-600 text-sm">
                <BadgeCheck className="h-4 w-4 text-green-500 mr-1" />
                {trainer.experience} experience
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
