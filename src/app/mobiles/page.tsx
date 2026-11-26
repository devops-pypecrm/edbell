'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Smartphone,
  CheckCircle2,
  Cpu,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Settings,
  CircleDot
} from 'lucide-react';

export default function MobilePhones() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "Hardware Diagnostics", desc: "Expert analysis and repair of institutional mobile units used across the EdBell network." },
    { title: "System Synchronization", desc: "Ensuring all student devices are perfectly configured for the latest academic portal updates." },
    { title: "Connectivity Shield", desc: "Advanced hardware maintenance to prevent data loss and ensure long-term student connectivity." },
    { title: "Priority Support Hub", desc: "Direct access to EdBell's hardware technicians for rapid turnaround on all equipment issues." }
  ];

  return (
    <div className="text-black">
      <section className="relative">
        <div className="hidden">
          <img 
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80" 
            alt="Mobile Technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        <div className={`max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center relative space-y-5 ${mounted ? '' : ''}`}>
          <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
            <Smartphone className="hidden" />
            <span className="text-lg lg:text-[22px] font-semibold text-black">Digital_Node_Integrated</span>
          </div>
          
          <h1 className="text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ">
            Mobile Phone <br />
            <span className="text-brand-900">
              Technician
            </span>
          </h1>
          
          <p className="text-[17px] text-black max-w-3xl ">
            EdBell's high-performance technical support facility, providing expert hardware maintenance and digital provisioning to ensure the continuous operational integrity of the student ecosystem.
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
                      {i === 0 ? <Cpu className="h-5 w-5" /> : i === 1 ? <PhoneCall className="h-5 w-5" /> : i === 2 ? <Shield className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                   </div>
                   <h3 className="text-xl font-semibold text-brand-900 mb-2">{feature.title}</h3>
                   <p className="text-base text-[var(--text-primary)] leading-relaxed font-normal">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Technical Support Solutions */}
      <section className="py-20">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Technical Support Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                  { title: "Software Sync", desc: "Automated updates for educational portals and academic toolkits.", icon: <Settings className="h-5 w-5" /> },
                  { title: "Hardware Nodes", desc: "Diagnostic support and maintenance for institutional mobile devices.", icon: <Cpu className="h-5 w-5" /> },
                  { title: "Cloud Integration", desc: "Secure provisioning of cloud storage for academic project backups.", icon: <Sparkles className="h-5 w-5" /> },
                  { title: "Network Access", desc: "Configuration of high-speed institutional WiFi and data protocols.", icon: <Zap className="h-5 w-5" /> }
               ].map((service, i) => (
                 <div key={i} className="sk-card group p-8 transition-all flex flex-col items-center text-center">
                    <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center mb-4">
                       {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-brand-900 mb-2">{service.title}</h3>
                    <p className="text-base text-[var(--text-primary)] font-normal leading-relaxed">{service.desc}</p>
                 </div>
               ))}
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
