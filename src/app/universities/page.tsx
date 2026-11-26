'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  Award,
  CheckCircle,
  Star,
  MapPin,
  Users,
  BookOpen,
  Globe,
  Calendar,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Trophy,
  Target,
  Zap,
  Shield,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Heart,
  TrendingUp
} from 'lucide-react';

interface University {
  _id?: string;
  name: string;
  url: string;
  accreditation: string;
  established: string;
  location?: string;
  website?: string;
  description: string;
  ranking?: string;
  studentsCount?: string;
  coursesOffered?: number;
  specialization?: string[];
  rating?: number;
}

export default function Universities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/universities');
      const data = await response.json();

      if (data.success && data.universities) {
        setUniversities(data.universities);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate university slugs that match the [id] route
  const getUniversitySlug = (universityName: string): string => {
    // Convert university name to URL-friendly slug
    return universityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const filters = [
    { id: 'all', name: 'All Universities', count: universities.length },
    { id: 'naac-a++', name: 'NAAC A++', count: universities.filter(u => u.accreditation === 'NAAC A++').length },
    { id: 'naac-a+', name: 'NAAC A+', count: universities.filter(u => u.accreditation === 'NAAC A+').length },
    { id: 'top-ranked', name: 'Top Ranked', count: universities.filter(u => u.ranking?.includes('#1') || u.ranking?.includes('#2') || u.ranking?.includes('#3')).length }
  ];

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.specialization?.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'naac-a++' && university.accreditation === 'NAAC A++') ||
      (selectedFilter === 'naac-a+' && university.accreditation === 'NAAC A+') ||
      (selectedFilter === 'top-ranked' && (university.ranking?.includes('#1') || university.ranking?.includes('#2') || university.ranking?.includes('#3')));

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-700 mx-auto mb-4"></div>
          <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Loading Universities</h3>
          <p className="text-[var(--text-muted)]">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Animation */}
        <div className="hidden">
          <img
            src="/about-campus.jpg"
            alt="University Background"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            style={{ animationDuration: '8s' }}
          />
          <div className="hidden"></div>
        </div>

        {/* Floating Light Elements */}
        <div className="hidden" />
        <div className="hidden" />

        <div className="max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center relative">
          <div className="">
            {/* Left Content */}
            <div className={`space-y-5 flex flex-col items-center ${mounted ? '' : ''}`}>
              <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
                <span className="hidden"></span>
                <span className="text-lg lg:text-[22px] font-semibold text-black">Premier University Partners</span>
              </div>

              <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
                Choose Your <br />
                <span className="text-brand-900">
                  Dream University
                </span>
              </h1>

              <p className={`text-[17px] text-black max-w-3xl ${mounted ? '' : ''}`}>
                Partner with India's top universities offering world-class online education with industry-recognized degrees and career support.
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-4 pt-3">
                <div className="bg-white rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.12)] px-8 py-4 text-center">
                  <div className="font-heading text-3xl font-bold text-brand-900">
                    {universities.length === 0 ? "10" : universities.length}+
                  </div>
                  <div className="text-base font-semibold sk-role">Top Universities</div>
                </div>
                <div className="bg-white rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.12)] px-8 py-4 text-center">
                  <div className="font-heading text-3xl font-bold text-brand-900">200+</div>
                  <div className="text-base font-semibold sk-role">Degree Programs</div>
                </div>
                <div className="bg-white rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.12)] px-8 py-4 text-center">
                  <div className="font-heading text-3xl font-bold text-brand-900">95%</div>
                  <div className="text-base font-semibold sk-role">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-3 justify-center">
                <Link href="#universities" className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors">
                  <span>Explore Universities</span>
                  <ArrowRight className="hidden" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-10 py-3 bg-brand-900 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-700 transition-colors">
                  Get Guidance
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Showcase (Dynamic) */}
            <div className="hidden">
              {universities.length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                  {universities.slice(0, 4).map((u, i) => (
                    <div 
                      key={u._id || i}
                      className={`sk-card group relative p-6 transition-all duration-500 cursor-pointer${i % 2 === 1 ? 'mt-12' : ''}`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg flex items-center justify-center text-brand-700 transition-transform">
                          {i % 2 === 0 ? <Award className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
                        </div>
                        <span className="text-base bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded font-semibold">{u.accreditation}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 group-hover:text-brand-700 transition-colors line-clamp-1">{u.name}</h3>
                      <p className="text-[var(--text-muted)] text-base font-normal leading-relaxed line-clamp-2">{u.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 opacity-50">
                    <Building className="w-16 h-16 mx-auto text-[var(--text-muted)]" />
                    <p className="text-base font-semibold">Network Synchronizing...</p>
                  </div>
                </div>
              )}

              {/* Central Floating Badge */}
              <div className="absolute -top-10 -right-10 bg-white border border-[var(--border)] rounded-lg p-5 hover:animate-none group transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-brand-700" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[var(--text-heading)]">UGC</div>
                    <div className="text-sm text-[var(--text-muted)] font-bold">Approved Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12" id="universities">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="mb-6 text-center">
            <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-black mb-2">Find Your Future University</h2>
            <p className="text-[17px] text-black max-w-3xl mx-auto ">
              Browse through our handpicked partner institutions to find the perfect fit for your educational journey.
            </p>
          </div>

          {/* Search Interface */}
          <div className="max-w-2xl mb-5 mx-auto">
            <div className="group relative">
              <div className="hidden" />
              <div className="relative">
                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-[var(--text-muted)] group-focus-within:text-brand-700 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, location, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sk-input !pl-12"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-2 text-[15px] font-semibold flex items-center gap-2 border rounded-[15px] transition-colors ${selectedFilter === filter.id
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-brand-900 text-brand-900 bg-white hover:bg-brand-50'
                  }`}
              >
                <span>{filter.name}</span>
                <span className={`text-sm ${selectedFilter === filter.id ? 'text-white' : 'text-brand-900'
                  }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[1300px] mx-auto px-5">
          {filteredUniversities.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center mx-auto mb-6 text-[var(--text-muted)]">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-heading)] mb-4">No results found</h3>
              <p className="text-[var(--text-primary)] max-w-md mx-auto mb-10 font-normal text-base">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedFilter('all'); }}
                className="bg-[var(--surface)] border border-[var(--border)] text-[var(--text-heading)] px-8 py-3 rounded-lg hover:bg-[var(--surface-alt)] transition-all font-bold text-base"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniversities.map((university, index) => (
                <div
                  key={university._id || university.name}
                  className="group h-full sk-card flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Top Bar Decoration */}
                  <div className="hidden" />

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-[60px] h-[60px] rounded-full bg-brand-700 text-white flex items-center justify-center">
                        <Building className="w-7 h-7" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold text-brand-700">
                          {university.accreditation}
                        </div>
                        <div className="flex items-center text-black">
                          <Star className="w-4 h-4 fill-current mr-1 text-yellow-500" />
                          <span className="text-sm font-semibold">{university.rating || '4.5'}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-[22px] leading-snug font-semibold text-brand-900 mb-2">{university.name}</h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-black text-[15px] mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-brand-700" />
                        <span>{university.location || 'India'}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-brand-700" />
                        <span>Est. {university.established}</span>
                      </div>
                    </div>

                    <p className="text-base text-black mb-5 line-clamp-3">
                      {university.description}
                    </p>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                      {university.specialization?.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-sm text-black">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                      <div className="bg-brand-200 rounded-[15px] p-3 text-center">
                        <div className="font-heading text-xl font-bold text-brand-900">{university.studentsCount || '5K+'}</div>
                        <div className="text-sm text-brand-900">Students</div>
                      </div>
                      <div className="bg-brand-200 rounded-[15px] p-3 text-center">
                        <div className="font-heading text-xl font-bold text-brand-900">{university.coursesOffered || '50+'}</div>
                        <div className="text-sm text-brand-900">Courses</div>
                      </div>
                    </div>

                    <div className="space-y-1 mb-6 text-base">
                       <div className="flex gap-2">
                         <div className="hidden"></div>
                         <span className="text-black">Type:</span>
                         <span className="text-gray-900">{university.ranking?.includes('Private') ? 'Private' : 'Central/Deemed'}</span>
                       </div>
                       <div className="flex gap-2">
                         <div className="hidden"></div>
                         <span className="text-black">Status:</span>
                         <span className="text-gray-900">UGC & DEB Approved</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link href={university.url || `/universities/${getUniversitySlug(university.name)}`} className="flex-1">
                        <button className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors text-center w-full">
                          View Program
                        </button>
                      </Link>
                      <Link href="/contact" className="shrink-0">
                        <button className="w-12 h-12 border border-brand-900 rounded-[15px] flex items-center justify-center text-brand-900 hover:bg-brand-50">
                          <Phone className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 sk-mint">
        <div className="hidden" />

        <div className="max-w-[1300px] mx-auto px-5">
          <div className="hidden">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-brand-700" />
          </div>

          <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-brand-900 mb-4">
            Start Your Journey with <br />
            <span className="text-brand-900">EDBELL EDUSOLUTIONS</span>
          </h2>

          <p className="text-lg text-black mb-8 max-w-2xl">
            Get personalized university recommendations. Our expert counselors will guide you through the entire admission process for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="">
              <button className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors gap-2 w-full">
                <Phone className="w-4 h-4" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/courses" className="">
              <button className="inline-flex items-center justify-center px-10 py-3 bg-brand-900 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-700 transition-colors gap-2 w-full">
                <BookOpen className="w-4 h-4" />
                <span>Explore Courses</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Addition */}
      <section className="py-16">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
