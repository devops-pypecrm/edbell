'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Heart, Loader2, CheckCircle, ArrowRight, Zap, Globe, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(loggedIn);
    }
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1500);
  };

  const quickLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'COURSES', href: '/courses' },
    { name: 'UNIVERSITIES', href: '/universities' },
    { name: 'SERVICES', href: '/services' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/p/EdBell-edusolutions-61571668259241/' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/edbelledusolutions/' },
  ];

  return (
    <footer className="bg-black pt-20 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="hidden"></div>

      <div className="max-w-[1300px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 items-start">

          {/* Brand Engine - Left Aligned */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <img 
                src="/edbell-logo.jpg?v=1.1" 
                alt="EdBell Edusolutions" 
                className="h-[60px] w-[180px] sk-logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
            <p className="font-heading text-base font-semibold text-white leading-relaxed max-w-xs">
              Engineering the future of education with high-performance digital infrastructure and global institutional partnerships.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-brand-700 shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="font-heading text-base font-semibold text-white">
                  15/382, Calicut Tower, <br /> Kozhikode Road, Wayanad, Kerala
                </div>
              </div>
              <a href="tel:+91924130060" className="flex items-center gap-3 group">
                <div className="text-brand-700 shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="font-heading text-base font-semibold text-white">+91 92413 0060</div>
              </a>
              <a href="mailto:edbelledu@gmail.com" className="flex items-center gap-3 group">
                <div className="text-brand-700 shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="font-heading text-base font-semibold text-white truncate">edbelledu@gmail.com</div>
              </a>
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-5">
              <h4 className="sk-foot-h">Matrix</h4>
              <ul className="">
                {quickLinks.slice(0, 4).map(l => (
                  <li key={l.name}>
                    <Link href={l.href} className="font-heading text-base font-semibold text-white hover:text-brand-700 lowercase first-letter:uppercase sk-arrow">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <h4 className="sk-foot-h">Support</h4>
              <ul className="">
                {quickLinks.slice(4).map(l => (
                  <li key={l.name}>
                    <Link href={l.href} className="font-heading text-base font-semibold text-white hover:text-brand-700 lowercase first-letter:uppercase sk-arrow">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Communications Hub */}
          <div className="lg:col-span-4 space-y-6">
            <div className="">
              <h4 className="sk-foot-h mb-6">Protocol Subscription</h4>
              {isSubscribed ? (
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <p className="text-base">Subscriber Sync Complete</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="EMAIL_ENDPOINT"
                    className="sk-input"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isAuthenticated ? (
                    <Link
                      href="/login"
                      className="w-full py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 flex items-center justify-center"
                    >
                      Login to Subscribe
                    </Link>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Subscribe</span>}
                    </button>
                  )}
                </form>
              )}
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="flex gap-1 -ml-3">
                {socialLinks.map(s => (
                  <Link key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`EdBell on ${s.name}`} className="w-11 h-11 rounded-full flex items-center justify-center text-brand-700 hover:text-white hover:bg-brand-700">
                    <s.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <Globe className="h-4 w-4" />
                <span>Global Reach</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer / Sub-footer */}
        <div className="relative left-1/2 -ml-[50vw] w-screen bg-[#0E0848] px-5 py-3 flex flex-col md:flex-row justify-center items-center gap-x-10 text-center">
          <p className="font-heading text-[15px] font-semibold text-white">
            © {currentYear} EDBELL EDUSOLUTIONS LLP // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex items-center gap-6 font-heading text-[15px] font-semibold text-white">
            <Link href="#" className="inline-flex items-center hover:text-brand-700">Security</Link>
            <Link href="#" className="inline-flex items-center hover:text-brand-700">Privacy</Link>
            <Link href="#" className="inline-flex items-center hover:text-brand-700">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
