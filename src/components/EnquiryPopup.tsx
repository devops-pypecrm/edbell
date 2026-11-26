'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Send, X } from 'lucide-react';

// Shown once per browser session, 10 seconds after the visitor arrives.
const POPUP_DELAY_MS = 10_000;
const SEEN_KEY = 'edbell-enquiry-popup-seen';
// Pages where the popup would get in the way.
const HIDDEN_ON = ['/contact', '/login', '/signup'];

const EMPTY_FORM = { name: '', email: '', phone: '', serviceInterest: 'Career Strategy', message: '' };

export default function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const hiddenHere = HIDDEN_ON.some(p => pathname === p || pathname.startsWith(p + '/'));

  // Start the 10 second timer once per session.
  useEffect(() => {
    if (hiddenHere) return;
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage blocked */ }
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hiddenHere]);

  // While open: lock page scroll, focus the first field, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Website Popup Enquiry' }),
      });
      const data = await response.json().catch(() => ({}));
      // The API answers 200 even when the database save fails; only a returned id means it was stored.
      if (response.ok && data.contactId) {
        setStatus('success');
        setFormData(EMPTY_FORM);
        try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
        setTimeout(() => setOpen(false), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open || hiddenHere) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true"></div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        className="sk-card relative w-full max-w-[860px] max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-10 animate-fade-in-up"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close enquiry form"
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-brand-900 hover:bg-brand-50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id="enquiry-popup-title" className="text-2xl sm:text-3xl font-bold text-brand-900 mb-1 pr-10">Enquire Now</h2>
        <p className="text-base text-black mb-6">Leave your details and our counsellors will get back to you.</p>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <label htmlFor="popup-name" className="block text-base font-semibold text-black">Full Name</label>
              <input
                ref={firstFieldRef}
                id="popup-name" type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder="John Doe"
                className="sk-input"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="popup-email" className="block text-base font-semibold text-black">Email Address</label>
              <input
                id="popup-email" type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="john@example.com"
                className="sk-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <label htmlFor="popup-phone" className="block text-base font-semibold text-black">Phone Number</label>
              <input
                id="popup-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                placeholder="+91 00000 00000"
                className="sk-input"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="popup-service" className="block text-base font-semibold text-black">Service of Interest</label>
              <select
                id="popup-service" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange}
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
            <label htmlFor="popup-message" className="block text-base font-semibold text-black">Your Message</label>
            <textarea
              id="popup-message" name="message" required value={formData.message} onChange={handleChange}
              placeholder="Tell us how we can help you with your educational journey..."
              rows={4}
              className="sk-input"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3 bg-brand-700 text-white font-semibold hover:bg-brand-900 transition-colors disabled:opacity-70"
          >
            <span>{isSubmitting ? 'SENDING...' : 'Send Message'}</span>
            <Send className="h-3.5 w-3.5" />
          </button>

          {status === 'success' && (
            <p className="text-green-800 font-semibold">✅ Message sent successfully! We will get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-700 font-semibold">❌ Your message could not be saved. Please try again, or call +91 92413 0060.</p>
          )}
        </form>
      </div>
    </div>
  );
}
