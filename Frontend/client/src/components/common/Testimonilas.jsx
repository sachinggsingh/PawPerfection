import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dog Parent",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      content: "The online training sessions have been a game-changer for my anxious rescue dog. The trainers are patient and knowledgeable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Cat Owner",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      content: "I was skeptical about online pet training, but PawPerfection proved me wrong. My cat's behavior has improved significantly.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Pet Parent",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      content: "The video library is extensive and well-organized. I can train my pet at my own pace, and the results have been amazing.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Pet Parents Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real pet owners who have transformed their pets' behavior with PawPerfection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-soft relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-100" />
              
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;