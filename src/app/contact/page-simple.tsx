'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden ">
        <div className="relative py-20 sm:py-16 lg:py-24 text-center px-4">
          <div className="max-w-7xl mx-auto">
            <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-gray-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get Started Today
            </h1>
            <p className="text-xl text-brand-700 max-w-3xl mx-auto">
              Ready to transform your career? Get in touch with our expert counselors for personalized guidance 
              on your educational journey and career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-black max-w-2xl mx-auto">
                We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-black mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-base font-medium text-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-black mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                  placeholder="Enter your message"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-brand-700 hover:bg-brand-800 text-white font-semibold py-4 px-8 rounded-[10px] transition-colors duration-200 transform"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-brand-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-black">Multiple ways to reach us for your educational needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-brand-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brand-900 mb-2">Our Location</h3>
              <p className="text-black">15/382, Calicut Tower</p>
              <p className="text-black">Kozhikode Road, Wayanad</p>
              <p className="text-black">Kerala, India</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <Phone className="h-12 w-12 text-brand-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brand-900 mb-2">Phone Numbers</h3>
              <p className="text-black">+91 92413 0060</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 text-center">
              <Mail className="h-12 w-12 text-brand-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brand-900 mb-2">Email</h3>
              <p className="text-black">info@edbelledusolutions.com</p>
              <p className="text-black">admissions@edbelledusolutions.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
