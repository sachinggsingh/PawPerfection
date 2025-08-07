import { useState } from 'react';
import { Send, PawPrint, Phone, Mail, MapPin, MessageSquare, Star, Check } from 'lucide-react';


export default function Contact() {
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    petType: '',
    message: '',
  });
  
  // State for feedback form
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    serviceUsed: '',
  });
  
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'feedback'
  const [submitted, setSubmitted] = useState(false);
  
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        petType: '',
        message: '',
      });
    }, 1000);
  };
  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback form submitted:', feedbackForm);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackForm({
        name: '',
        email: '',
        comment: '',
        serviceUsed: '',
      });
    }, 3000);
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen text-gray-800 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column - Contact Info */}
          <div className="md:w-1/3 space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center text-gray-800">
                <PawPrint className="mr-2" />
                Get In Touch
              </h1>
              <p className="text-gray-600 text-lg">
                Connect with our expert trainers or leave us feedback about your experience.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Phone className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-600">Phone</h3>
                  <p className="text-lg text-gray-700">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Mail className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-600">Email</h3>
                  <p className="text-lg text-gray-700">training@futurepets.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MapPin className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-600">Location</h3>
                  <p className="text-lg text-gray-700">123 Training Avenue<br />Pet City, PC 12345</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Operating Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact & Feedback Forms */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <div className="bg-purple-600 p-4 rounded-full">
                    <Check size={48} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Submitted Successfully!</h2>
                  <p className="text-gray-600 text-lg max-w-md">
                    Thank you for reaching out. Our team will process your submission shortly.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tab Navigation */}
                  <div className="flex mb-8 border-b border-gray-200">
                    <button
                      className={`px-6 py-3 font-medium ${activeTab === 'contact' 
                        ? 'text-purple-700 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('contact')}
                    >
                      <Phone className="inline-block mr-2 w-5 h-5" />
                      Contact Us
                    </button>
                    <button
                      className={`px-6 py-3 font-medium ${activeTab === 'feedback' 
                        ? 'text-purple-700 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-blue-600'}`}
                      onClick={() => setActiveTab('feedback')}
                    >
                      <MessageSquare className="inline-block mr-2 w-5 h-5" />
                      Leave Feedback
                    </button>
                  </div>
                  
                  {/* Contact Form */}
                  {activeTab === 'contact' && (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-blue-300 mb-2" htmlFor="name">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="John Smith"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-blue-300 mb-2" htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-blue-300 mb-2" htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleContactChange}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-blue-300 mb-2" htmlFor="petType">Pet Type</label>
                          <select
                            id="petType"
                            name="petType"
                            value={contactForm.petType}
                            onChange={handleContactChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                          >
                            <option value="">Select your pet</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="exotic">Exotic</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-blue-300 mb-2" htmlFor="message">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                          rows="5"
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                          placeholder="Tell us about your training needs..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300 hover:shadow-lg text-white"
                      >
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </button>
                    </form>
                  )}
                  
                  {/* Feedback Form */}
                  {activeTab === 'feedback' && (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Share Your Experience</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-blue-300 mb-2" htmlFor="feedback-name">Your Name</label>
                          <input
                            type="text"
                            id="feedback-name"
                            name="name"
                            value={feedbackForm.name}
                            onChange={handleFeedbackChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="John Smith"
                          />
                        </div>
                        
                        <div>
                        <label className="block text-blue-300 mb-2" htmlFor="feedback-name">Your Name</label>
                          <input
                            type="email"
                            id="feedback-email"
                            name="email"
                            value={feedbackForm.email}
                            onChange={handleFeedbackChange}
                            required
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            placeholder="xyz@gmail.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-blue-300 mb-2" htmlFor="serviceUsed">Service Used</label>
                        <select
                          id="serviceUsed"
                          name="serviceUsed"
                          value={feedbackForm.serviceUsed}
                          onChange={handleFeedbackChange}
                          required
                          className="w-full bg-white/5 border border-blue-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option value="obedience">Basic Obedience Training</option>
                          <option value="behavioral">Behavioral Correction</option>
                          <option value="puppy">Puppy Classes</option>
                          <option value="agility">Agility Training</option>
                          <option value="virtual">Virtual Consultation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-blue-300 mb-2" htmlFor="comment">Your Feedback</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={feedbackForm.comment}
                          onChange={handleFeedbackChange}
                          required
                          rows="4"
                          className="w-full bg-white/5 border border-blue-700/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your experience..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300 hover:shadow-lg"
                      >
                        Submit Feedback
                        <MessageSquare className="ml-2 w-5 h-5" />
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}