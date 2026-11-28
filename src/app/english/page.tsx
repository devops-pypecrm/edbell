'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Languages,
  BookOpenCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot,
  Quote,
  MessageCircle,
  Video,
  Mic2
} from 'lucide-react';

export default function SpokenEnglish() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "Vocabulary Matrix", icon: <BookOpenCheck className="h-5 w-5" />, desc: "High-performance linguistic expansion for global communication." },
    { title: "Interactive Hub", icon: <MessageCircle className="h-5 w-5" />, desc: "Real-time communication protocols with certified educators." },
    { title: "Phonetic Precision", icon: <Mic2 className="h-5 w-5" />, desc: "Advanced pronunciation and accent management sub-systems." },
    { title: "Digital Coaching", icon: <Video className="h-5 w-5" />, desc: "Live-streamed training sessions for intensive learning." }
  ];

  return (
    <div className="text-black">
      <section className="relative">
        <div className="hidden">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=70&w=1600" 
            alt="Spoken English Mastery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        <div className={`max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center relative space-y-5 ${mounted ? '' : ''}`}>
          <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
            <Languages className="hidden" />
            <span className="text-lg lg:text-[22px] font-semibold text-black">Language_Protocol_Online</span>
          </div>
          
          <h1 className="text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ">
            Fluency <br />
            <span className="text-brand-900">
              Mastery
            </span>
          </h1>
          
          <p className="text-[17px] text-black max-w-3xl ">
            Deployment of advanced linguistic communication protocols for professional global alignment. Achieve peak verbal performance with our certified interactive coaching.
          </p>

          <div className="flex">
             <Link href="/contact" className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors">
                Contact Us
             </Link>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-16 lg:py-24 ">
        <div className="max-w-[1300px] mx-auto px-5">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="sk-card p-8 transition-all group">
                   <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center mb-4">
                      {feature.icon}
                   </div>
                   <h3 className="text-xl font-semibold text-brand-900 mb-2">{feature.title}</h3>
                   <p className="text-base text-[var(--text-primary)] leading-relaxed font-normal">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimony Node */}
      <section className="py-24 ">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
            <Quote className="h-10 w-10 text-brand-700 mx-auto opacity-50" />
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              "The synchronization of linguistic skills at EdBell allowed me to bridge the gap between academic knowledge and professional communication."
            </h2>
            <div className="flex flex-col items-center">
               <div className="w-16 h-1 bg-white mb-4"></div>
               <p className="text-base font-semibold">Global Alumnus</p>
               <p className="text-base text-black font-semibold">Batch 2024</p>
            </div>
         </div>
      </section>

      <section className="py-12 sm:py-16 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
