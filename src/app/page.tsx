'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Globe,
  DollarSign,
  Star,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  UserCheck,
  Award,
  BookOpen,
  Users,
  CheckCircle,
  Play,
  Building2
} from 'lucide-react';

interface Course {
  _id?: string;
  id?: string;
  name: string;
  url: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
  offeredByUniversities?: {
    _id: string;
    name: string;
    location?: string;
    url?: string;
    logo?: string;
  }[];
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    setMounted(true);
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.courses) {
          setCourses(data.courses);
        }
      })
      .catch(console.error);
  }, []);
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'World-Class Education',
      description: 'Access to premium courses from top universities with industry experts.',
      accent: 'text-brand-700'
    },
    {
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Global Recognition',
      description: 'Degrees recognized internationally with global career opportunities.',
      accent: 'text-brand-700'
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials.',
      accent: 'text-brand-700'
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Career Growth',
      description: 'Placement assistance and career counseling for all graduates.',
      accent: 'text-brand-700'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Secure & Verified',
      description: 'UGC approved universities with verified credentials.',
      accent: 'text-brand-700'
    },
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Fast Track Programs',
      description: 'Accelerated learning paths for working professionals.',
      accent: 'text-brand-700'
    }
  ];

  const milestones = [
    {
      title: 'Institutional Sync',
      metric: '15+ Nodes',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200',
      text: 'Successfully digitized 15+ legacy universities into the Edbell ecosystem, providing high-bandwidth course delivery for global learners.'
    },
    {
      title: 'Global Deployment',
      metric: '2,500+ Syncs',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=75&w=800',
      text: 'Executed 2,500+ international student deployments to Tier-1 global institutions with a 100% synchronization rate in visa protocols.'
    },
    {
      title: 'Capital Engineering',
      metric: '₹12Cr+ Grants',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200',
      text: 'Unlocked strategic financial grants through our proprietary Discovery Engine, maximizing academic accessibility for the 2024-25 cycle.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pb-52">
        {/* Dynamic Backdrop */}
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=70&w=1600"
            alt="Technology and Innovation Backdrop"
            className="w-full h-full object-cover opacity-35"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="absolute inset-0 bg-white"></div>
        </div>

        {/* Global Glows */}
        <div className="sk-ribbon sk-ribbon-a"></div>
        <div className="sk-ribbon sk-ribbon-b"></div>

        <div className="max-w-[1300px] mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12 lg:pt-16">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className={`flex items-center ${mounted ? '' : ''}`}>
              <img src="/edbell-logo.jpg" alt="" className="hidden" />
              <span className="font-heading text-xl lg:text-[22px] font-semibold text-brand-700">Excellence Re-engineered</span>
            </div>

            <h1 className={`text-[42px] sm:text-6xl lg:text-[70px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
              Future <br />
              <span className="text-brand-900">
                Infrastructure
              </span>
            </h1>

            <p className={`text-[17px] leading-relaxed text-black max-w-xl ${mounted ? '' : ''}`}>
              Access high-bandwidth educational pathways. We provide the structural support for the next generation of global leaders and working professionals.
            </p>

            <div className={`flex flex-col sm:flex-row gap-5 pt-3 ${mounted ? '' : ''}`}>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center"
              >
                <div className="hidden"></div>
                Explore Curriculum
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-900 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-700 transition-colors text-center"
              >
                <Play className="hidden" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          <div className={`lg:col-span-5 relative w-full max-w-[400px] mx-auto ${mounted ? '' : ''}`}>
            <div className="sk-doodle"></div>
            <div className="sk-card sk-person p-2.5">
              <img src="/hero-arif.jpg" alt="Adv.Arif Wafy" className="sk-photo w-full h-[380px] lg:h-[420px] object-cover object-top" />
              <div className="hidden"></div>

              <div className="px-2 pt-3 pb-2">
                <p className="hidden">Leadership</p>
                <h3 className="text-xl font-semibold text-brand-900 leading-snug">
                  Adv.Arif Wafy <br />
                  <span className="font-sans text-base font-medium sk-role">Educational Architect</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-16 lg:py-20 sk-white">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
            <div className="">
              <h2 className="font-sans text-lg lg:text-[22px] font-semibold text-black mb-3">Operational Logic</h2>
              <h3 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Why Choose <br className="hidden" /> The EDBELL <br className="hidden" /> Stack</h3>
            </div>
            <p className="text-[17px] text-black">
              Our proprietary framework integrates institutional excellence with high-performance digital delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <div key={i} className="sk-card p-8 text-center">
                <div className={`w-[60px] h-[60px] mx-auto mb-5 bg-brand-900 flex items-center justify-center ${f.accent} [&]:!text-white`}>
                  {f.icon}
                </div>
                <h4 className="font-heading text-[22px] font-semibold text-brand-900 mb-2">{f.title}</h4>
                <p className="text-base text-black">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC MODULES - COURSES */}
      <section className="py-16 lg:py-20">
        <div className="hidden"></div>

        <div className="max-w-[1300px] mx-auto px-5">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="font-sans text-lg lg:text-[22px] font-semibold text-black mb-3">Curriculum Layers</h2>
            <h3 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Strategic <br /> Degree Programs</h3>
          </div>

          <div className="sk-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.length === 0 ? (
               <div className="col-span-full py-12 text-gray-600">Retrieving specialized modules...</div>
            ) : courses.slice(0, 6).map((c, i) => (
              <Link key={c.id || c._id || i} href={c.url} className="group">
                <div className="sk-card sk-course">
                  <div className="contents">
                    <div className="sk-ico">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <span className="order-2 mt-4 text-[15px] font-semibold text-brand-700">{c.category}</span>
                  </div>

                  <div className="contents">
                    <h4 className="sk-name order-1">{c.name}</h4>
                    {c.offeredByUniversities && c.offeredByUniversities.length > 0 && (
                      <div className="order-2 mt-2 text-[15px]">
                        <Building2 className="hidden" />
                        <span className="">{c.offeredByUniversities[0].name}</span>
                      </div>
                    )}
                    <p className="order-3 mt-2 mb-5 text-base text-black line-clamp-3 flex-1">{c.description}</p>
                  </div>

                  <div className="order-4 flex items-center justify-between">
                    <div className="flex gap-2 text-base">
                      <span className="text-black">Duration</span>
                      <span className="font-semibold text-black">{c.duration}</span>
                    </div>
                    <div className="border border-brand-900 rounded-[15px] px-5 py-2">
                      <ArrowRight className="h-5 w-5 text-inherit" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center">
              <span>Scan Full Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALIDATION NODES - MILESTONES */}
      <section className="py-16 lg:py-20 sk-navy">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="flex flex-col items-center text-center gap-8 mb-12">
            <div className="max-w-3xl">
              <h2 className="font-sans text-lg lg:text-[22px] font-semibold text-brand-300 mb-3">Network Integrity</h2>
              <h3 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-white">Operational <br /> Milestones</h3>
            </div>
            <div className="flex items-stretch gap-4">
              <div className="bg-white rounded-[15px] px-8 py-4">
                <p className="font-heading text-4xl font-bold text-brand-900">10K+</p>
                <p className="text-base font-semibold sk-role">Active Learners</p>
              </div>
              <div className="hidden"></div>
              <div className="bg-white rounded-[15px] px-8 py-4">
                <p className="font-heading text-4xl font-bold text-brand-900">98%</p>
                <p className="text-base font-semibold sk-role">Success Velocity</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {milestones.map((m, i) => (
              <div key={i} className="sk-card p-2.5 pb-6">
                <div className="">
                  <div className="w-full aspect-[4/3] sk-photo mb-4">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="px-3 font-heading text-[22px] font-semibold text-brand-900">{m.title}</h5>
                    <p className="px-3 text-base sk-role mb-2">{m.metric}</p>
                  </div>
                </div>
                <p className="px-3 text-base text-black">
                  &quot;{m.text}&quot;
                </p>
                <div className="hidden">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-brand-700 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE CTA ENGINE */}
      <section className="py-16 lg:py-24 px-5 sk-mint">
        <div className="hidden"></div>
        <div className="hidden"></div>

        <div className="max-w-[1260px] mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="hidden">
            <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-brand-700 mx-auto" />
            <div className="hidden"></div>
          </div>

          <h2 className="text-[42px] lg:text-[60px] leading-none font-bold text-brand-900">
            Initialize Your <br />
            <span className="text-brand-700">Success Protocol</span>
          </h2>

          <p className="text-[17px] text-black leading-relaxed">
            Global recognition. Unmatched flexibility. Strategic career growth. The future is a decision away.
          </p>

          <div className="lg:col-start-2 flex flex-col sm:flex-row gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center"
            >
              <div className="hidden"></div>
              Contact Now
            </Link>
            <Link
              href="/universities"
              className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-900 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-700 transition-colors text-center"
            >
              Global Nodes
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER NODES */}
      <section className="py-16">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
