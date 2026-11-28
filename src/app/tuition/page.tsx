'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot,
  GraduationCap,
  Calculator,
  Beaker,
  History
} from 'lucide-react';

export default function TuitionServices() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "8th & 9th Nodes", icon: <Beaker className="h-5 w-5" />, desc: "Foundation acceleration programs for 8th and 9th standard students in all core subjects." },
    { id: "NODE_SSLC", name: "SSLC (10th) Excellence", icon: <GraduationCap className="h-5 w-5" />, desc: "High-focus online/offline coaching specifically designed for SSLC board success." },
    { title: "+2 Advanced Hub", icon: <Calculator className="h-5 w-5" />, desc: "Comprehensive +2 subjects support available via digital and physical learning nodes." },
    { title: "Hybrid Delivery", icon: <Zap className="h-5 w-5" />, desc: "Flexible switching between online and offline classes for uninterrupted academic synchronization." }
  ];

  return (
    <div className="text-black">
      <section className="relative">
        <div className="hidden">
          <img 
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=70&w=1600" 
            alt="Tuition Excellence" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        <div className={`max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center relative space-y-5 ${mounted ? '' : ''}`}>
          <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
            <BookOpen className="hidden" />
            <span className="text-lg lg:text-[22px] font-semibold text-black">Pedagogical_Audit_Active</span>
          </div>
          
          <h1 className="text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ">
            Tuition <br />
            <span className="text-brand-900">
              Excellence
            </span>
          </h1>
          
          <p className="text-[17px] text-black max-w-3xl ">
            EdBell offers both <strong>Online and Offline</strong> institutional classes for students in <strong>8th, 9th, SSLC, and +2</strong>. Flexible learning protocols allow SSLC and Higher Secondary (+2) candidates to synchronize their curriculum via high-speed online nodes.
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
                      {feature.icon || <Sparkles className="h-5 w-5" />}
                   </div>
                   <h3 className="text-xl font-semibold text-brand-900 mb-2">{feature.title || feature.name}</h3>
                   <p className="text-base text-[var(--text-primary)] leading-relaxed font-normal">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Node Subjects */}
      <section className="py-20">
         <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
               { sub: "PHYSICS", rate: "Lvl_04" },
               { sub: "CHEMISTRY", rate: "Lvl_04" },
               { sub: "BIOLOGY", rate: "Lvl_04" },
               { sub: "COMPUTING", rate: "Lvl_05" },
               { sub: "ADVANCED MATHS", rate: "Lvl_05" },
               { sub: "ENTRANCE PREP", rate: "EXAM_CORE" }
            ].map((sub, i) => (
               <div key={i} className="sk-card flex flex-col items-center justify-center p-8 text-center transition-all">
                  <span className="text-base font-semibold text-brand-700 mb-4 opacity-70">{sub.rate}</span>
                  <h4 className="text-lg font-bold text-brand-900">{sub.sub}</h4>
               </div>
            ))}
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
