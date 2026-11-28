'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Users,
  Target,
  Trophy,
  History,
  TrendingUp,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
  Orbit,
  Layers
} from 'lucide-react';

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const timeline = [
    { year: "2016", title: "EC HUB", desc: "The foundation of our educational vision was laid with the launch of EC Hub, centering academic support." },
    { year: "2024", title: "Edbelledu Solutions", desc: "Official launch of EdBell in Kerala. Core mission parameters established for high-performance learning." },
    { year: "2025", title: "ECOSYSTEM_v1", desc: "Edbell Digital Portal deployed for global operations and student synchronization." },
    { year: "FUTURE", title: "GLOBAL_EXPANSION", desc: "Scaling across every domestic and international educational zone." }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Visionary Hero */}
      <section className="relative">
        {/* Background Images */}
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1523240715632-99045506af5c?auto=format&fit=crop&q=70&w=1600"
            alt="University Students Backdrop"
            className="hidden"
          />
          <div className="absolute inset-0 bg-transparent"></div>
        </div>
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&q=70&w=1600"
            alt="About Backdrop"
            className="hidden"
          />
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        {/* Background Orb */}
        <div className="hidden">
          <div className="hidden"></div>
          <div className="hidden"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center">
          <div className="">
            <div className={`space-y-5 flex flex-col items-center ${mounted ? '' : ''}`}>
              <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
                <img src="/edbell-logo.jpg" alt="" className="hidden" />
                <span className="text-lg lg:text-[22px] font-semibold text-black">The Architects of Future Learning</span>
              </div>

              <div className="space-y-4">
                <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
                  Empowering <br />
                  <span className="text-brand-900">Success</span>
                </h1>
                <p className={`text-[17px] text-black max-w-3xl ${mounted ? '' : ''}`}>
                  Welcome to EdBell Edusolutions, where we bridge the gap between aspirations and achievements. Our mission is to empower individuals through accessible, high-quality education and career guidance, fostering a community of lifelong learners and successful professionals.
                </p>
              </div>

              <div className="flex pt-7">
                <Link href="/contact" className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Protocol - Values */}
      <section className="py-16 lg:py-20 sk-white">
        <div className="hidden"></div>
        <div className="max-w-[1300px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-lg lg:text-[22px] font-semibold text-black">Mission Parameters</span>
              <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Encoded <br /> With Value</h2>
            </div>

            <div className="space-y-6">
              {[
                { title: "Excellence", icon: <Target className="w-5 h-5" />, desc: "Highest academic standards achieved via precision auditing." },
                { title: "Innovation", icon: <Zap className="w-5 h-5" />, desc: "Leveraging technical stacks to transform traditional pedagogical models." },
                { title: "Integrity", icon: <Shield className="w-5 h-5" />, desc: "Absolute transparency in every synchronized transaction." }
              ].map((v, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center shrink-0">
                    {v.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-heading text-[22px] font-semibold text-brand-900">{v.title}</h4>
                    <p className="text-[17px] text-black">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hidden"></div>
            <div className="sk-card sk-person p-2.5 max-w-[420px] mx-auto">
              {/* Decorative corner accents */}
              <div className="hidden"></div>
              <div className="hidden"></div>
              <div className="hidden"></div>
              <div className="hidden"></div>

              {/* Photo */}
              <div className="sk-photo">
                <img
                  src="/about-director.jpg"
                  alt="Director - EdBell Edusolutions"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>

              {/* Name Badge */}
              <div className="px-3 pt-3 pb-2">
                <p className="font-heading text-xl font-semibold text-brand-900">Adv. Arif Wafy</p>
                <p className="text-base sk-role">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Odyssey - Modern Timeline */}
      <section className="py-16 lg:py-20 sk-navy">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-lg lg:text-[22px] font-semibold text-brand-300">The Chronology</span>
            <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-white">Growth Architecture</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="hidden"></div>

            {timeline.map((item, i) => (
              <div 
                key={i} 
                className={`sk-card p-6 ${i % 2 === 1 ? '' : ''} ${mounted ? '' : ''}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="mb-2">
                  <span className="font-heading text-3xl font-bold sk-role">{item.year}</span>
                </div>
                <div className="hidden"></div>
                <div className={`space-y-2`}>
                  <h4 className="font-heading text-[20px] font-semibold text-brand-900 break-words">{item.title}</h4>
                  <p className="text-base text-black">{item.desc}</p>
                </div>
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
