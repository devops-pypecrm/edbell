'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Globe,
  Cpu,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceInterest: 'Career Strategy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(loggedIn);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: formData.subject || formData.message.substring(0, 50)
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', serviceInterest: 'Career Strategy' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80"
            alt="University Office Backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="hidden"></div>
        </div>

        <div className={`max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center space-y-4 ${mounted ? '' : ''}`}>
          <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
            Get in <br />
            <span className="text-brand-900">Touch</span>
          </h1>

          <p className={`text-[17px] text-black max-w-3xl ${mounted ? '' : ''}`}>
            Have questions about our courses or services? Our team is here to help you navigate your educational journey. Reach out to us for expert guidance.
          </p>
        </div>
      </section>

      <section className="pt-6 pb-16 lg:pb-20">
        <div className="max-w-[1300px] mx-auto px-5 space-y-10">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Our Presence</h2>
              <p className="text-[17px] text-black max-w-3xl mx-auto ">
                EdBell Education Solutions operates across multiple regions, providing world-class educational support to students domestically and internationally. Reach out to our nearest center for personalized assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Head_Office", value: "Wayanad, Kerala", icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Our Main Operations Hub" },
                { title: "Direct_Line", value: "+91 92413 0060", icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Talk to our experts" },
                { title: "Email_Support", value: "edbelledu@gmail.com", icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Get a quick response" }
              ].map((item, i) => (
                <div key={i} className="sk-card p-7 text-center">
                  <div className="w-[60px] h-[60px] mx-auto mb-4 bg-brand-900 text-white flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1 space-y-0.5 min-w-0">
                    <p className="font-heading text-xl font-semibold text-brand-900">{item.title}</p>
                    <h4 className="text-base font-semibold text-black truncate">{item.value}</h4>
                    <p className="text-base text-black">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="sk-card p-6 sm:p-10">
              <div className="hidden"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-black">Full Name</label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="sk-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-black">Email Address</label>
                    <input
                      type="email" name="email" required value={formData.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="sk-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-black">Phone Number</label>
                    <input
                      type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="sk-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-black">Service of Interest</label>
                    <select
                      name="serviceInterest" value={formData.serviceInterest} onChange={handleChange}
                      className="sk-input"
                    >
                      <option value="Career Strategy">Career Strategy</option>
                      <option value="Global Mobility">Global Mobility</option>
                      <option value="Capital Support">Capital Support</option>
                      <option value="Benchmark Prep">Benchmark Prep</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-semibold text-black">Your Message</label>
                  <textarea
                    name="message" required value={formData.message} onChange={handleChange}
                    placeholder="Tell us how we can help you with your educational journey..."
                    rows={4}
                    className="sk-input"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-brand-700 text-white font-semibold hover:bg-brand-900 transition-colors "
                >
                  <div className="hidden"></div>
                  <span>{isSubmitting ? 'SENDING...' : 'Send Message'}</span>
                  <Send className={`h-3.5 w-3.5 transition-transform duration-500 ${isSubmitting ? '' : 'group-hover/btn:translate-x-2'}`} />
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-800 font-semibold">✅ Message sent successfully! We will get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-700 font-semibold">❌ Failed to send message. Please try again later.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div >
  );
}
