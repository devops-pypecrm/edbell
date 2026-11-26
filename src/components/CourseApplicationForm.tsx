'use client';

import { useState } from 'react';
import { X, CheckCircle, Shield, AlertCircle } from 'lucide-react';

interface CourseApplicationFormProps {
  courseId: string;
  courseName: string;
  isOpen: boolean;
  onClose: () => void;
  type: 'apply' | 'enquiry';
}

export default function CourseApplicationForm({ courseId, courseName, isOpen, onClose, type }: CourseApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/courses/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseId,
          courseName,
          type
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        
        // Store enrolled course in localStorage
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        if (type === 'apply') {
          enrolledCourses.push({
            courseId,
            courseName,
            studentName: formData.name,
            studentEmail: formData.email,
            studentPhone: formData.phone,
            enrolledAt: new Date().toISOString(),
            status: 'new'
          });
          localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        }
        
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: '', email: '', phone: '', password: '' });
        }, 2500);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 bg-black/60 overflow-y-auto">
      <div className="relative bg-white rounded-lg w-full max-w-md border border-gray-100 my-4 flex flex-col">
        <div className={`p-6 text-gray-900 rounded-t-3xl ${type === 'apply' ? 'bg-brand-700' : 'bg-brand-700'}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">
              {type === 'apply' ? 'Enroll Now' : 'Course Enquiry'}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-brand-700 text-base font-medium">{courseName}</p>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-130px)]">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-brand-900">Successfully Sent!</h4>
              <p className="text-black text-base">
                {type === 'apply' 
                  ? 'Your application has been logged. Our admissions team will sync with you shortly.'
                  : 'Your enquiry has been received. A counselor will contact you soon.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg flex items-center space-x-2 text-sm font-bold animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-base font-semibold text-black">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:bg-white outline-none transition-all text-sm font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-black">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:bg-white outline-none transition-all text-sm font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {type === 'apply' && (
                <>
                  <div className="space-y-2">
                    <label className="text-base font-semibold text-black">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:bg-white outline-none transition-all text-sm font-medium"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-semibold text-black">Choose Password</label>
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-500 rounded-[22px] focus:ring-2 focus:ring-brand-600 focus:bg-white outline-none transition-all text-sm font-medium"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </>
              )}

              <button
                disabled={loading}
                type="submit"
                className={`w-full py-4 rounded-lg text-gray-900 font-bold text-base transition-all flex items-center justify-center space-x-2 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-700 hover:bg-brand-700'
                }`}
              >
                <span>{loading ? 'Processing...' : type === 'apply' ? 'Submit Application' : 'Send Enquiry'}</span>
              </button>

              <div className="pt-2 flex items-center justify-center space-x-2 text-sm font-bold text-black">
                <Shield className="h-3 w-3" />
                <span>Secure SSL Encryption Protocol Active</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
