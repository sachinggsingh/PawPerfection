import { useState } from "react";
import {
  Send,
  PawPrint,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    message: "",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    serviceUsed: "",
  });

  const [activeTab, setActiveTab] = useState("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e, resetForm) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      resetForm();
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-2 px-5 rounded-lg shadow-md"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Info */}
          <div className="md:w-1/3 space-y-10">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center text-gray-800">
                <PawPrint className="mr-2 text-purple-600" />
                Get In Touch
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect with our expert trainers or leave us feedback about
                your experience.
              </p>
            </div>

            {/* Contact Info */}
            {[
              {
                icon: <Phone className="text-purple-600" />,
                title: "Phone",
                detail: "(555) 123-4567",
              },
              {
                icon: <Mail className="text-purple-600" />,
                title: "Email",
                detail: "training@futurepets.com",
              },
              {
                icon: <MapPin className="text-purple-600" />,
                title: "Location",
                detail: "123 Training Avenue\nPet City, PC 12345",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">{item.icon}</div>
                <div>
                  <h3 className="font-medium text-purple-600">{item.title}</h3>
                  <p className="text-lg text-gray-700 whitespace-pre-line">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Operating Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Mon - Fri</span>
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

          {/* Right Form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <div className="bg-purple-600 p-4 rounded-full shadow-lg">
                    <Check size={48} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Submitted Successfully!
                  </h2>
                  <p className="text-gray-600 text-lg max-w-md">
                    Thank you for reaching out. Our team will process your
                    submission shortly.
                  </p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex mb-8 border-b border-gray-200">
                    {[
                      {
                        key: "contact",
                        label: "Contact Us",
                        icon: <Phone className="inline-block mr-2 w-5 h-5" />,
                      },
                      {
                        key: "feedback",
                        label: "Leave Feedback",
                        icon: (
                          <MessageSquare className="inline-block mr-2 w-5 h-5" />
                        ),
                      },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        className={`px-6 py-3 font-medium transition-all duration-300 ${
                          activeTab === tab.key
                            ? "text-purple-700 border-b-2 border-purple-600"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Contact Form */}
                  {activeTab === "contact" && (
                    <form
                      onSubmit={(e) =>
                        handleSubmit(e, () =>
                          setContactForm({
                            name: "",
                            email: "",
                            phone: "",
                            petType: "",
                            message: "",
                          })
                        )
                      }
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        Send Us a Message
                      </h2>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            id: "contact-name",
                            name: "name",
                            type: "text",
                            placeholder: "John Smith",
                            value: contactForm.name,
                          },
                          {
                            id: "contact-email",
                            name: "email",
                            type: "email",
                            placeholder: "your@email.com",
                            value: contactForm.email,
                          },
                        ].map((field) => (
                          <div key={field.id}>
                            <input
                              {...field}
                              required
                              onChange={(e) =>
                                handleChange(e, setContactForm)
                              }
                              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Phone + Pet Type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          value={contactForm.phone}
                          onChange={(e) => handleChange(e, setContactForm)}
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <select
                          name="petType"
                          value={contactForm.petType}
                          onChange={(e) => handleChange(e, setContactForm)}
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

                      {/* Message */}
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={(e) => handleChange(e, setContactForm)}
                        required
                        rows="5"
                        placeholder="Tell us about your training needs..."
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      ></textarea>

                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white"
                      >
                        Send Message
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  )}

                  {/* Feedback Form */}
                  {activeTab === "feedback" && (
                    <form
                      onSubmit={(e) =>
                        handleSubmit(e, () =>
                          setFeedbackForm({
                            name: "",
                            email: "",
                            rating: 5,
                            comment: "",
                            serviceUsed: "",
                          })
                        )
                      }
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold mb-6">
                        Share Your Experience
                      </h2>
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          name="name"
                          placeholder="John Smith"
                          value={feedbackForm.name}
                          onChange={(e) => handleChange(e, setFeedbackForm)}
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="xyz@gmail.com"
                          value={feedbackForm.email}
                          onChange={(e) => handleChange(e, setFeedbackForm)}
                          required
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />
                      </div>

                      {/* Service */}
                      <select
                        name="serviceUsed"
                        value={feedbackForm.serviceUsed}
                        onChange={(e) => handleChange(e, setFeedbackForm)}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      >
                        <option value="">Select a service</option>
                        <option value="obedience">Basic Obedience Training</option>
                        <option value="behavioral">Behavioral Correction</option>
                        <option value="puppy">Puppy Classes</option>
                        <option value="agility">Agility Training</option>
                        <option value="virtual">Virtual Consultation</option>
                        <option value="other">Other</option>
                      </select>

                      {/* Comment */}
                      <textarea
                        name="comment"
                        value={feedbackForm.comment}
                        onChange={(e) => handleChange(e, setFeedbackForm)}
                        required
                        rows="4"
                        placeholder="Tell us about your experience..."
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      ></textarea>

                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white"
                      >
                        Submit Feedback
                        <MessageSquare className="w-5 h-5" />
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
