import React from 'react';
import { Book, Clock, DollarSign } from 'lucide-react';

const CoursesCard = () => {
  const courses = [
    {
      title: "Basic Obedience Training",
      description: "Perfect for puppies and beginners. Learn essential commands and behavior basics.",
      duration: "4 weeks",
      price: "$299",
      level: "Beginner"
    },
    {
      title: "Advanced Training",
      description: "Take your pet's skills to the next level with advanced commands and agility training.",
      duration: "6 weeks",
      price: "$499",
      level: "Advanced"
    },
    {
      title: "Behavior Modification",
      description: "Address specific behavioral issues with personalized training programs.",
      duration: "8 weeks",
      price: "$599",
      level: "Intermediate"
    },
    {
      title: "Agility Training",
      description: "Fun and engaging obstacle course training for active dogs.",
      duration: "6 weeks",
      price: "$399",
      level: "Advanced"
    },
	{
		title: "Advanced Training",
		description: "Take your pet's skills to the next level with advanced commands and agility training.",
		duration: "6 weeks",
		price: "$499",
		level: "Advanced"
	  },
	  {
		title: "Behavior Modification",
		description: "Address specific behavioral issues with personalized training programs.",
		duration: "8 weeks",
		price: "$599",
		level: "Intermediate"
	  },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white/30 backdrop-blur-md rounded-xl drop-shadow-lg hover:shadow-2xl transition-all duration-100 border border-white/20 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                  {course.level}
                </span>
                <p className="text-gray-600">{course.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                  <span>{course.price}</span>
                </div>
              </div>

              <button
                className="w-full px-4 py-2 mt-4 text-white bg-purple-600/80 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <Book className="w-5 h-5" />
                <span>Enroll Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCard;