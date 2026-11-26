'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Newsletter from '@/components/Newsletter';
import { BookOpen, Clock, Award, CheckCircle, GraduationCap, ArrowRight, Sparkles, Filter, Search, Zap } from 'lucide-react';

interface Course {
  _id?: string;
  id: string;
  name: string;
  url: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Specialized';
  duration: string;
  fees?: string;
  eligibility?: string;
  description: string;
  offeredByUniversities?: {
    _id: string;
    name: string;
    location?: string;
    url?: string;
  }[];
}



export default function CoursesClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        const response = await fetch('/api/courses', { signal: controller.signal });
        const data = await response.json();
        clearTimeout(timeoutId);

        if (data.success && data.courses) {
          setCourses(data.courses);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Live sync failed or timed out.', err);
      }

      setCourses([]);
    } catch (error) {
      console.error('Critical failure in fetchCourses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Modules' },
    { id: 'Undergraduate', name: 'Undergraduate' },
    { id: 'Postgraduate', name: 'Postgraduate' },
    { id: 'Specialized', name: 'Specialized' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = (course.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                        (course.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="relative">
          <div className="hidden"></div>
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 border-t-2 border-b-2 border-brand-700 rounded-full animate-spin"></div>
            <p className="mt-8 text-[var(--text-muted)] font-semibold text-base">Syncing Educational Modules...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative">
        {/* Dynamic Backdrop */}
        <div className="hidden">
          <img
            src="/campus-modern.jpg" 
            alt="Courses Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="hidden"></div>
        </div>

        {/* Floating Particles/Glows */}
        <div className="hidden"></div>
        <div className="hidden"></div>

        <div className="max-w-[1300px] mx-auto px-5 pt-14 pb-8 w-full text-center flex flex-col items-center">
          <div className={`space-y-5 flex flex-col items-center ${mounted ? '' : ''}`}>
            <div className="flex items-center justify-center text-lg lg:text-[22px] font-semibold text-black">
              <GraduationCap className="hidden" />
              <span className="text-lg lg:text-[22px] font-semibold text-black">Knowledge Architecture</span>
            </div>

            <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
              Engineered <br />
              <span className="text-brand-900">
                For Growth
              </span>
            </h1>

            <p className={`text-[17px] text-black max-w-3xl ${mounted ? '' : ''}`}>
              Access globally recognized degrees and specialized certifications designed to meet the demands of the modern industrial landscape. 100% Digital. 100% Recognized.
            </p>

            <div className={`flex pt-2 ${mounted ? '' : ''}`}>
              <button
                onClick={() => document.getElementById('course-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors"
              >
                Scan Available Modules
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Filter Node */}
      <section id="filter-node" className="relative z-20 py-4">
        <div className="max-w-[1300px] mx-auto px-5 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="hidden">
              <Filter className="h-5 w-5" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 text-[15px] font-semibold border rounded-[15px] transition-colors ${selectedCategory === category.id
                    ? 'border-brand-900 bg-brand-900 text-white'
                    : 'border-brand-900 text-brand-900 bg-white hover:bg-brand-50'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black group-focus-within:text-brand-700 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH CURRICULUM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sk-input !pl-11"
            />
          </div>
        </div>
      </section>

      {/* Main Course Grid */}
      <section id="course-grid" className="pt-6 pb-16 lg:pb-20">
        <div className="max-w-[1300px] mx-auto px-5">
          {filteredCourses.length === 0 ? (
            <div className="sk-card py-20 text-center">
              <Zap className="hidden" />
              <h3 className="text-2xl font-bold text-brand-900 mb-2">No Matches Detected</h3>
              <p className="text-lg text-black">Our database is currently updating. Try refining your parameters.</p>
            </div>
          ) : (
            <div className="sk-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course, index) => (
                <Link key={course._id || course.id || index} href={course.url} className="group relative">
                  <div className="sk-card sk-course">
                    {/* Animated Gradient Border Overlay */}
                    <div className="hidden"></div>

                    <div className="contents">
                      <div className="sk-ico">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <span className={`order-2 mt-4 text-[15px] font-semibold ${course.category === 'Undergraduate' ? 'text-brand-700' :
                        course.category === 'Postgraduate' ? 'text-brand-700' :
                          'text-brand-700'
                        }`}>
                        {course.category}
                      </span>
                    </div>

                    <div className="contents">
                      <h4 className="sk-name order-1">
                        {course.name}
                      </h4>
                      <p className="order-3 mt-2 mb-5 text-base text-black flex-1">
                        {course.description}
                      </p>
                    </div>

                    <div className="order-4 space-y-1">
                      <div className="flex justify-between gap-4">
                        <div className="">
                          <Clock className="hidden" />
                          <span className="text-base text-black">Duration</span>
                        </div>
                        <span className="text-base font-semibold text-black text-right">{course.duration}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="">
                          <Award className="hidden" />
                          <span className="text-base text-black">Investment</span>
                        </div>
                        <span className="text-base font-semibold text-black text-right">{course.fees || 'TBA'}</span>
                      </div>
                      {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                        <div className="flex justify-between gap-4">
                          <div className="shrink-0">
                            <GraduationCap className="hidden" />
                            <span className="text-base text-black">University</span>
                          </div>
                          <span className="text-base font-semibold text-black text-right line-clamp-1">{course.offeredByUniversities[0].name}</span>
                        </div>
                      )}
                    </div>

                    <div className="order-5 mt-5 mx-auto flex items-center gap-2 border border-brand-900 text-brand-900 rounded-[15px] px-4 py-2">
                      <span className="text-[15px] font-semibold">Examine Module</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-16 lg:py-20 sk-mint">
        <div className="hidden"></div>
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="">
            <div className="hidden"></div>
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <h2 className="lg:col-span-6 text-3xl lg:text-[45px] lg:leading-tight font-bold text-brand-900">
                Initialize Your <br />
                Career Protocol
              </h2>
              <p className="lg:col-span-6 text-lg text-black">
                Global recognition. Expert guidance. Strategic growth. Connect with our admission architects for a customized roadmap.
              </p>
              <div className="lg:col-span-12 flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors">
                  Apply Now
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center px-10 py-3 bg-brand-900 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-700 transition-colors">
                  The Charter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nodes */}
      <section className="py-20 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
