'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, CheckCircle, Loader2, Zap, LogIn, Sparkles } from 'lucide-react';

interface NewsletterProps {
  variant?: 'default' | 'compact' | 'sidebar';
  className?: string;
}

export default function Newsletter({ variant = 'default', className = '' }: NewsletterProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const userEmail = localStorage.getItem('userEmail');
      if (loggedIn === 'true' && userEmail) {
        setIsAuthenticated(true);
        setEmail(userEmail);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('AUTHENTICATION REQUIRED');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setMessage('SUBSCRIPTION SYNCHRONIZED');
      setIsLoading(false);
    }, 1500);
  };

  if (variant === 'sidebar') {
    return (
      <div className={`sk-card p-6 space-y-4 ${className}`}>
        <div className="space-y-1">
          <span className="text-[15px] sk-role">Signal Subscription</span>
          <h3 className="text-2xl font-bold text-brand-900">Stay Connected</h3>
        </div>
        {!isAuthenticated ? (
          <button onClick={() => router.push('/login')} className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center w-full">Initialize Auth</button>
        ) : isSubscribed ? (
          <div className="flex items-center space-x-3 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-bold">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="IDENT_EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sk-input"
              required
            />
            <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Subscribe Node'}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`sk-card p-8 lg:p-12 ${className}`}>
      <div className="hidden">
        <Sparkles className="h-24 w-24 text-brand-700" />
      </div>
      <div className="grid lg:grid-cols-12 gap-4 lg:gap-x-12 items-center">
        <div className="lg:col-span-12 text-lg lg:text-[22px] font-semibold text-black">
          <Zap className="hidden" />
          <span>Intelligence Stream</span>
        </div>
        <h3 className="lg:col-span-12 text-3xl lg:text-[45px] lg:leading-tight font-bold text-brand-900">Stay Ahead of the Curve</h3>
        <p className="lg:col-span-8 text-[17px] text-black max-w-xl">Join our elite network of students and professionals receiving real-time insights and career opportunities.</p>

        {!isAuthenticated ? (
          <button onClick={() => router.push('/login')} className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center lg:col-span-4 lg:justify-self-end">Connect Terminal</button>
        ) : isSubscribed ? (
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle className="h-6 w-6 shrink-0" />
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lg:col-span-4 flex flex-col sm:flex-row gap-3 min-w-0">
            <input
              type="email"
              placeholder="Terminal Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 sk-input"
              required
            />
            <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
