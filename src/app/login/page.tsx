'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: 'admin12@gmail.com',
    password: '123456'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password combination
      if (formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        router.push('/admin');
      } else {
        setError('Please enter both email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 px-5">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="hidden"></div>
        <div className="hidden"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="hidden">
              <img
                src="/edbell-logo.jpg"
                alt="EDBELL"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling;
                  if (fb) (fb as HTMLElement).style.display = 'block';
                }}
              />
              <div className="hidden bg-gray-50 border border-gray-200 rounded-lg p-2.5">
                <ShieldCheck className="h-7 w-7 text-brand-700" />
              </div>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-gray-900">EDBELL</h1>
              <p className="text-base text-black">Edusolutions LLP</p>
            </div>
          </Link>
        </div>

        {/* Header section removed per user request */}
      </div>

      <div className="relative z-10 mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sk-card py-8 px-6 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div className="ml-3">
                    <p className="text-base text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="email" className="block text-base font-medium text-black ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="hidden"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-black group-focus-within:text-brand-700 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    readOnly
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-500 rounded-[22px] text-gray-900 placeholder-slate-600 focus:outline-none transition-all text-sm cursor-not-allowed opacity-80"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-base font-medium text-black ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="hidden"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-black group-focus-within:text-brand-700 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    readOnly
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-12 py-3.5 bg-white border border-gray-500 rounded-[22px] text-gray-900 placeholder-slate-600 focus:outline-none transition-all text-sm cursor-not-allowed opacity-80"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-black hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between ml-1 text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-white border-gray-200 text-brand-700 focus:ring-brand-200 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-black">
                  Remember session
                </label>
              </div>

              <a href="#" className="font-medium text-brand-700 hover:text-brand-700 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 bg-brand-700 hover:bg-brand-800 text-white text-base font-bold rounded-[10px] transition-all duration-300 transform"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-200 border-t-gray-200 mr-2"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>

            {/* Signup options removed per user request */}
          </form>

          <p className="mt-8 text-center text-base text-black font-normal">
            Secured by enterprise-grade 256-bit encryption
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-base text-black hover:text-brand-700 font-medium transition-colors flex items-center justify-center group">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
