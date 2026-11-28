'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import * as LucideIcons from 'lucide-react';
import {
  UserCheck,
  Plane,
  DollarSign,
  BookOpen,
  GraduationCap,
  Users,
  CheckCircle,
  ArrowRight,
  Globe,
  Award,
  Target,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  FileText,
  Briefcase,
  Star,
  Sparkles,
  Zap,
  Shield,
  Activity,
  Cpu,
  Database
} from 'lucide-react';

interface Service {
  _id?: string;
  serviceId: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: {
    name: string;
    details: string;
  }[];
  stats: {
    success: string;
    speed: string;
  };
}

const STATIC_SERVICES: Service[] = [
  {
    serviceId: 'SERV_001',
    icon: "GraduationCap",
    title: "SSLC / +2",
    description: "Direct academic pathways for completing Secondary (10th) and Senior Secondary (12th) certifications with recognized boards like Jamia, NIOS, and BOSSE.",
    features: [
      { name: "Jamia Admissions", details: "Official support for Jamia Millia Islamia school admissions and board enrollment." },
      { name: "NIOS Stream Execution", details: "End-to-end guidance for NIOS 10th/12th stream registration and examination." },
      { name: "BOSSE Board Selection", details: "State board equivalency programs through Board of Open Schooling and Skill Education." },
      { name: "Document Verification", details: "Assistance in authenticating previous academic records for smooth admission." }
    ],
    stats: { success: "100%", speed: "Verified Nodes" },
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    serviceId: 'SERV_002',
    icon: "Plane",
    title: "Study Abroad",
    description: "End-to-end data processing for international academic deployment across Tier-1 institutions globally.",
    features: [
      { name: "University Filtering", details: "Algorithmic matching of student profile with global institutional requirements." },
      { name: "Visa Logic Processing", details: "Expert handling of student visa documentation and interview preparation." },
      { name: "International Discovery", details: "Mapping global career market trends for optimal course selection." },
      { name: "Arrival Protocols", details: "Pre-departure briefings and on-ground landing support for international students." }
    ],
    stats: { success: "95%", speed: "Optimized" },
    gradient: "from-indigo-600 to-violet-600"
  },
  {
    serviceId: 'SERV_003',
    icon: "Award",
    title: "Online Degree",
    description: "Activating flexible digital academic protocols for recognized undergraduate and postgraduate programs.",
    features: [
      { name: "UGC Approved Nodes", details: "Ensuring all degree programs are fully recognized by University Grants Commission." },
      { name: "Flexible Learning", details: "Access to recorded sessions and digital modules for self-paced graduation." },
      { name: "Distance Calibration", details: "Optimizing communication between student and university for remote exams." },
      { name: "Digital Certification", details: "Verified electronic certificates issued directly by parent universities." }
    ],
    stats: { success: "98%", speed: "Rapid Access" },
    gradient: "from-violet-600 to-purple-600"
  },
  {
    serviceId: 'SERV_004',
    icon: "Zap",
    title: "Scholarships",
    description: "Activating financial aid protocols and scholarship discovery modules for academic funding and excellence.",
    features: [
      { name: "Merit Identification", details: "Identifying scholarship eligibility based on academic and sports excellence." },
      { name: "Asset Management", details: "Guidance on managing grants and tuition fee waivers efficiently." },
      { name: "Sponsorship Links", details: "Connecting students with corporate and NGO educational sponsors." },
      { name: "Document Auditing", details: "Compiling financial and identity proof for scholarship applications." }
    ],
    stats: { success: "92%", speed: "Accelerated" },
    gradient: "from-purple-600 to-fuchsia-600"
  },
  {
    serviceId: 'SERV_005',
    icon: "UserCheck",
    title: "Admission Support",
    description: "Comprehensive end-to-end assistance for navigating complex university admission protocols and documentation.",
    features: [
      { name: "Form Submission", details: "Expert handling of university application forms to ensure zero-error submissions." },
      { name: "SOP Assistance", details: "Guidance on drafting compelling Statements of Purpose for top-tier institutions." },
      { name: "Document Audit", details: "Thorough verification of all academic and identity proofs before application." },
      { name: "Follow-up Logic", details: "Persistent coordination with university admission desks for status updates." }
    ],
    stats: { success: "100%", speed: "Reliable" },
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    serviceId: 'SERV_006',
    icon: "Sparkles",
    title: "Career Guidance",
    description: "Expert mentorship and psychological mapping to align student passion with industry demand (Provided Free of Cost).",
    features: [
      { name: "Psychometric Testing", details: "Advanced aptitude mapping to identify the most suitable career streams." },
      { name: "One-on-One Mentoring", details: "Personalized sessions with industry leaders for strategic career planning." },
      { name: "Free Consultation", details: "Initial roadmap planning and career path discovery at zero cost." },
      { name: "Market Trend Audit", details: "Real-time updates on emerging high-growth industries and job roles." }
    ],
    stats: { success: "96%", speed: "Deep-Analysis" },
    gradient: "from-emerald-500 to-teal-500"
  }
];

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Cpu;
  return <IconComponent className={className} />;
};

export default function Services() {
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeFeature, setActiveFeature] = useState<{serviceIdx: number, featureIdx: number} | null>(null);
  const [displayingServices, setDisplayingServices] = useState<Service[]>(STATIC_SERVICES);

  useEffect(() => {
    setActiveFeature(null);
  }, [activeService]);

  useEffect(() => {
    setMounted(true);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success && data.services.length > 0) {
        // Merge static and dynamic services, prioritizing dynamic ones if serviceId matches
        const combined = [...STATIC_SERVICES];
        
        data.services.forEach((dynService: Service) => {
          const index = combined.findIndex(s => s.serviceId === dynService.serviceId);
          if (index !== -1) {
            combined[index] = dynService;
          } else {
            combined.push(dynService);
          }
        });
        
        setDisplayingServices(combined);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pb-16 lg:pb-20">
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=70&w=1600"
            alt="Students Collaborating Backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="hidden"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5">
          <div className={`pt-14 pb-2 flex flex-col items-center text-center gap-4 ${mounted ? '' : ''}`}>
            <div className="flex items-center gap-2 text-lg lg:text-[22px] font-semibold text-black">
              <Cpu className="hidden" />
              <span>Service Execution Matrix</span>
            </div>

            <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
              Structural <br />
              <span className="text-brand-900">Execution</span>
            </h1>

            <p className={`text-[17px] text-black max-w-3xl mx-auto ${mounted ? '' : ''}`}>
              Activating high-performance modules for global educational excellence. Every protocol is optimized for your precise academic trajectory.
            </p>
          </div>

          <div className="hidden"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full pt-10 items-start">
            {/* Left: Tactical Selector */}
            <div className="lg:col-span-5 space-y-0.5">
              <div className="hidden">
                <p className="text-base font-semibold text-[var(--text-muted)] mb-1.5">Protocol_Select</p>
                <div className="h-1 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-700 transition-all duration-700"
                    style={{ width: `${((activeService + 1) / displayingServices.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              {displayingServices.map((s, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left px-4 py-4 rounded transition-colors border border-gray-300 ${activeService === i
                    ? 'bg-brand-900 border-brand-900'
                    : 'bg-white hover:bg-brand-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`hidden${activeService === i ? '' : ''}`}>{s.serviceId}</p>
                      <h3 className={`!font-sans text-[17px] font-semibold ${activeService === i ? 'text-white' : 'text-black'}`}>{s.title}</h3>
                    </div>
                    <div className={`${activeService === i ? 'text-white' : 'text-black'}`}>
                      <ArrowRight className={`h-5 w-5 ${activeService === i ? '' : ''}`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Operational Data */}
            <div className="lg:col-span-7">
              {displayingServices[activeService] && (
                <div className={`sk-card p-6 sm:p-10 ${displayingServices[activeService].gradient} flex flex-col justify-between`}>
                  <div className="hidden">
                    <DynamicIcon name={displayingServices[activeService].icon} className="h-24 w-24" />
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div className="space-y-3">
                      <h4 className="font-heading inline-block bg-brand-200 rounded-[20px] px-8 py-6 text-2xl lg:text-3xl font-semibold text-brand-900">{displayingServices[activeService].title}</h4>
                      <p className="text-[17px] text-black leading-relaxed">
                        {displayingServices[activeService].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                      {displayingServices[activeService].features.map((f, idx) => (
                        <div key={idx} className="relative group/feature">
                          <button 
                            onClick={() => setActiveFeature(activeFeature?.featureIdx === idx ? null : {serviceIdx: activeService, featureIdx: idx})}
                            className={`w-full flex items-center gap-3 px-4 py-3 border rounded-[15px] transition-colors ${activeFeature?.featureIdx === idx ? 'border-brand-700 bg-brand-50' : 'border-brand-900 hover:bg-brand-50'}`}
                          >
                            <CheckCircle className={`h-5 w-5 flex-shrink-0 text-brand-700 ${activeFeature?.featureIdx === idx ? '' : ''}`} />
                            <span className="text-base font-semibold text-brand-900 text-left">{f.name}</span>
                          </button>
                          
                          {activeFeature?.serviceIdx === activeService && activeFeature?.featureIdx === idx && (
                            <div className="absolute top-full left-0 right-0 mt-2 z-[60]">
                              <div className="bg-white p-5 rounded-[15px] border border-brand-900 shadow-lg relative">
                                <div className="hidden"></div>
                                <p className="font-heading text-lg font-semibold text-brand-900 mb-1">
                                  <Sparkles className="hidden" />
                                  Execution Detail
                                </p>
                                <p className="text-base text-black">
                                  {f.details}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between relative z-10 pt-8">
                    <div className="flex gap-10">
                      <div>
                        <p className="text-base sk-role">Success_Rate</p>
                        <p className="font-heading text-3xl font-bold text-brand-900">{displayingServices[activeService].stats.success}</p>
                      </div>
                      <div>
                        <p className="text-base sk-role">Execution_Speed</p>
                        <p className="font-heading text-3xl font-bold text-brand-900">{displayingServices[activeService].stats.speed}</p>
                      </div>
                    </div>
                    <Link href="/contact" className="hidden sm:flex h-12 w-12 bg-brand-900 rounded-full items-center justify-center text-white hover:bg-brand-700">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Auxiliary Support */}
      <section className="py-16 lg:py-20 sk-white">
        <div className="max-w-[1300px] mx-auto px-5 space-y-10">
          <div className="text-center space-y-3">
            <div className="">
              <p className="text-lg lg:text-[22px] font-semibold text-black">Integrated Nodes</p>
              <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black">Auxiliary Support</h2>
            </div>
            <p className="text-[17px] text-black max-w-3xl mx-auto ">Secondary infrastructure nodes ensuring complete operational coverage for all student parameters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Admission Support", icon: <UserCheck className="w-5 h-5" />, desc: "Complete assistance for university admissions and institutional enrollment." },
              { title: "Career Guidance", icon: <Sparkles className="w-5 h-5" />, desc: "Expert assessment and trajectory mapping for students (Free of cost)." },
              { title: "Visa Sync", icon: <Shield className="w-5 h-5" />, desc: "High-priority visa documentation and processing modules." },
              { title: "Asset Discovery", icon: <FileText className="w-5 h-5" />, desc: "Discovery protocols for scholarships and financial grants." },
              { title: "Arrival Protocols", icon: <Globe className="w-5 h-5" />, desc: "Pre-departure coordination and landing logistics." },
              { title: "Node Networking", icon: <Users className="w-5 h-5" />, desc: "Connecting students with verified alumni clusters." }
            ].map((item, i) => (
              <div key={i} className="sk-card p-8 text-center">
                <div className="w-[60px] h-[60px] mx-auto mb-5 bg-brand-900 text-white flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="font-heading text-[22px] font-semibold text-brand-900 mb-2">{item.title}</h4>
                <p className="text-base text-black">{item.desc}</p>
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
