'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Building2,
  PhoneCall,
  Languages,
  BookOpenCheck,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export default function Center() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Center = [
    {
      name: "CORPORATE HEAD OFFICE",
      location: "15/382, Calicut Tower, Kozhikode Road, Wayanad, Kerala, India",
      phone: "+91 924130060",
      email: "edbelledu@gmail.com",
      image: "/zakaria-cm.jpg",
      manager: {
        name: "Zakaria CM",
        position: "Manager"
      }
    },
    {
      name: "CALICUT REGIONAL HUB",
      location: "Building 4, Cyberpark Road, Nellikode, Kozhikode, Kerala",
      phone: "+91 924130060",
      email: "edbelledu@gmail.com",
      image: "/rashid-director.jpg",
      manager: {
        name: "Rashid",
        position: "Regional Director"
      }
    },
    {
      name: "KOCHI ACADEMIC CENTRE",
      location: "MG Road, Ravipuram, Kochi, Kerala",
      phone: "+91 924130060",
      email: "edbelledu@gmail.com",
      image: "/kochi-director.jpg",
      manager: {
        name: "Abdu Raheem",
        position: "Director"
      }
    }
  ];

  const auxiliaryServices = [
    {
      title: "MOBILE PHONE TECHNICIAN",
      icon: <PhoneCall className="h-6 w-6" />,
      desc: "EdBell's high-performance technical support facility, providing expert hardware maintenance and digital provisioning to ensure the continuous operational integrity of the student ecosystem.",
      href: "/mobiles"
    },
    {
      title: "SPOKEN ENGLISH COURSES",
      icon: <Languages className="h-6 w-6" />,
      desc: "Advanced fluency protocols to enhance global communication competence and professional presentation.",
      href: "/english"
    },
    {
      title: "PREMIUM TUITION NODES",
      icon: <BookOpenCheck className="h-6 w-6" />,
      desc: "Subject-specific acceleration programs focusing on core academic performance across all boards.",
      href: "/tuition"
    }
  ];

  const growthArchitecture = [
    { 
      label: "EC HUB", 
      desc: "The foundation of our educational vision was laid with the launch of EC Hub, centering academic support.",
      metric: "Phase_01",
      icon: <Building2 className="h-5 w-5" />
    },
    { 
      label: "Edbelledu Solutions", 
      desc: "Official launch of EdBell in Kerala. Core mission parameters established for high-performance learning.",
      metric: "Phase_02",
      icon: <Sparkles className="h-5 w-5" />
    },
    { 
      label: "ECOSYSTEM_v1", 
      desc: "Edbell Digital Portal deployed for global operations and student synchronization.",
      metric: "Phase_03",
      icon: <Cpu className="h-5 w-5" />
    },
    { 
      label: "GLOBAL_EXPANSION", 
      desc: "Scaling across every domestic and international educational zone.",
      metric: "Phase_04",
      icon: <Globe className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section - About style */}
      <section className="relative">
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1524178232457-3bb2449b382a?auto=format&fit=crop&q=70&w=1600"
            alt="Center Backdrop"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="absolute inset-0 bg-white/5"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center space-y-5">
          <div className={`space-y-5 flex flex-col items-center ${mounted ? '' : ''}`}>
            <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
              <Building2 className="hidden" />
              <span className="text-lg lg:text-[22px] font-semibold text-black">Our Physical Locations</span>
            </div>

            <div className="space-y-5 flex flex-col items-center ">
              <h1 className="text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ">
                Edbell <br />
                <span className="text-brand-900">
                  Study Centers
                </span>
              </h1>
              <p className="text-[17px] text-black max-w-3xl ">
                EdBell Study Centers serve as the physical backbone of our educational ecosystem. Our strategically located centers across Kerala provide students with dedicated learning spaces, high-speed access, and personalized academic support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Nodes - The 3 Photos Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1300px] mx-auto px-5 space-y-10">
          <div className="text-center">
            <div className="space-y-2">
              <p className="text-lg lg:text-[22px] font-semibold text-black">Institutional_Council</p>
              <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Our Leadership Team</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Center.map((centre, i) => (
              <div key={i} className="sk-card sk-person p-2.5">
                <div className="aspect-[4/3] sk-photo">
                  <div className="hidden"></div>
                  <img
                    src={centre.image}
                    alt={centre.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="px-3 pt-4 pb-2">
                  {centre.manager && (
                    <div className="">
                       <h3 className="text-xl font-semibold text-brand-900">
                         {centre.manager.name}
                       </h3>
                       <div className="">
                         <span className="text-base sk-role">{centre.manager.position}</span>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Architecture section */}
      <section className="py-16 lg:py-20 sk-navy">
        <div className="max-w-[1300px] mx-auto px-5 space-y-10">
          <div className="text-center space-y-2">
            <div className="">
                <TrendingUp className="hidden" />
                <span className="text-lg lg:text-[22px] font-semibold text-brand-300">Chronological_Roadmap</span>
            </div>
            <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-white">Growth Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Background Line */}
            <div className="hidden"></div>
            
            {growthArchitecture.map((phase, i) => (
              <div 
                key={i} 
                className={`sk-card p-6 ${mounted ? '' : ''}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="space-y-2">
                  <div className="">
                    <span className="text-base sk-role">{phase.metric}</span>
                    <div className="hidden">
                      {phase.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 break-words">{phase.label}</h3>
                  <p className="text-base text-black">{phase.desc}</p>
                </div>
                
                {/* Connector Nodes */}
                <div className="hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Sub-Systems - Mobile, English, Tuition */}
      <section className="py-16 lg:py-20 sk-white">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-lg lg:text-[22px] font-semibold text-black">Service_Extensions</span>
                <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Additional <br /> Learning Hubs</h2>
                <p className="text-[17px] text-black pt-2">
                  We provide specialized support modules beyond university curriculums, including technical training and language proficiency, ensuring the holistic development of every student.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {auxiliaryServices.map((service, i) => (
                <Link 
                  key={i} 
                  href={service.href}
                  className={`sk-card p-6 block ${i === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">{service.title}</h3>
                  <p className="text-base text-black">{service.desc}</p>
                </Link>
              ))}
            </div>
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
