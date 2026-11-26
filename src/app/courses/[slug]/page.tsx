import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, Award, CheckCircle, ArrowLeft, ArrowRight, Star, Building2, MapPin, GraduationCap, Laptop, BookOpen, ShieldCheck } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import University from '@/models/University';
import { notFound } from 'next/navigation';
import Newsletter from '@/components/Newsletter';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  
  // Safe search slugs
  const searchSlugs = [`/courses/${slug}`, `courses/${slug}`, slug];
  if (!slug.startsWith('/')) searchSlugs.push(`/courses/${slug}`);
  
  const course = await Course.findOne({ url: { $in: searchSlugs } }).lean();
  
  if (!course) {
    return {
      title: 'Course Not Found - EDBELL EDUSOLUTIONS',
    };
  }

  return {
    title: `${course.name} | Online Degree Program | EDBELL EDUSOLUTIONS`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  
  // Initialize Database and Models
  await connectDB();
  
  // Explicitly reference University model to ensure it's registered for populate
  const _ensureReg = University.modelName;

  const searchSlugs = [`/courses/${slug}`, `courses/${slug}`, slug];
  const dbCourse = await Course.findOne({ 
    url: { $in: searchSlugs }
  }).populate('offeredByUniversities').lean();

  if (!dbCourse) {
    notFound();
  }

  // Manually map to a plain object to ensure 100% serializability for RSC
  const course = {
    _id: String(dbCourse._id),
    name: String(dbCourse.name || ''),
    description: String(dbCourse.description || ''),
    category: String(dbCourse.category || 'Undergraduate'),
    duration: String(dbCourse.duration || '2 Years'),
    fees: String(dbCourse.fees || 'TBA'),
    eligibility: String(dbCourse.eligibility || 'Graduation'),
    curriculum: String(dbCourse.curriculum || ''),
    careerOpportunities: String(dbCourse.careerOpportunities || ''),
    admissionProcess: String(dbCourse.admissionProcess || ''),
    learningOutcomes: String(dbCourse.learningOutcomes || ''),
    studyMaterials: String(dbCourse.studyMaterials || ''),
    offeredByUniversities: (dbCourse.offeredByUniversities || []).map((uni: any) => ({
      name: String(uni.name || 'Partner'),
      location: String(uni.location || ''),
      url: String(uni.url || '#'),
      logo: String(uni.logo || ''),
      accreditation: String(uni.accreditation || 'UGC Approved')
    }))
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className=" pt-10 pb-14 lg:pt-14 lg:pb-20 px-5 sm:px-8">
        {/* Dynamic Backdrop */}
        <div className="hidden">
          <img
            src="/campus-modern.jpg" 
            alt="Courses Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="hidden"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-7">
              <Link href="/courses" className="inline-flex items-center text-brand-700 hover:text-brand-700 text-base font-bold transition-all group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Catalog
              </Link>
              
              <div className="space-y-3">
                <div className="">
                  <GraduationCap className="hidden" />
                  <span className="text-base font-semibold text-black">{course.category} Program</span>
                </div>
                
                <h1 className="text-4xl lg:text-[52px] lg:leading-[1.1] font-bold text-gray-900">
                   {course.name}
                </h1>
                
                <p className="text-lg lg:text-xl text-black max-w-2xl">
                  {course.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 border-t border-gray-300">
                {[
                  { icon: Clock, label: 'Duration', val: course.duration },
                  { icon: Laptop, label: 'Mode', val: 'Online' },
                  { icon: BookOpen, label: 'Eligibility', val: course.eligibility || 'Graduation' },
                  { icon: ShieldCheck, label: 'Status', val: 'Approved' }
                ].map((item, i) => (
                  <div key={i} className="py-4 border-b border-gray-300">
                    <item.icon className="hidden" />
                    <div className="text-base text-black">{item.label}</div>
                    <div className="text-base font-semibold text-gray-900">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-brand-700 rounded-[10px] text-white font-semibold hover:bg-brand-800 transition-colors">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="hidden"></div>
              <div className="sk-card p-6 sm:p-8 space-y-6">
                <h3 className="text-2xl font-bold text-brand-900">Course Parameters</h3>
                
                <div className="border-t border-gray-200">
                   <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-black text-base font-semibold">Enrollment Fee</span>
                      <span className="font-semibold text-gray-900 text-base">{course.fees || 'TBD'}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-black text-base font-semibold">Academic Board</span>
                      <span className="font-semibold text-gray-900 text-base">UGC Recognized</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <span className="text-black text-base font-semibold">Learning System</span>
                      <span className="font-semibold text-brand-700 text-base">Synchronous Online</span>
                   </div>
                </div>

                <div className="border-l-4 border-brand-700 bg-brand-50 p-5">
                  <p className="text-base font-semibold text-brand-700 mb-3">Admission Protocol</p>
                  <p className="text-base text-black leading-relaxed mb-4">
                    Secure your entry for the 2024-2025 academic session. Enrollment nodes are currently open for verified applicants.
                  </p>
                  <div className="flex items-center space-x-2 text-sm font-bold text-gray-900 bg-white w-fit px-3 py-1.5 rounded-lg border border-gray-200">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>ACTIVE_CYCLE_01</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 ">
        <div className="max-w-[1300px] mx-auto px-5">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <div className="lg:col-span-8 space-y-16">
               {/* Offered By Universities */}
               {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                 <div className="space-y-8">
                   <div className="flex items-center space-x-3">
                     <Building2 className="h-5 w-5 text-brand-700" />
                     <h3 className="text-2xl font-bold text-brand-900">Universities</h3>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {course.offeredByUniversities?.map((uni: any, idx: number) => (
                       <Link 
                        href={uni?.url || '#'} 
                        key={idx} 
                        className="sk-card p-6 flex flex-col gap-4 transition-all group relative"
                       >
                         <div className="hidden"></div>
                         <div className="flex items-center gap-4">
                           {uni?.logo ? (
                            <img src={uni.logo} alt={uni.name} className="w-12 h-12 rounded-lg object-contain bg-white border border-gray-200" />
                           ) : (
                            <div className="w-12 h-12 rounded-[10px] bg-brand-700 flex items-center justify-center font-bold text-white text-lg border border-gray-200">{(uni?.name || 'U').charAt(0)}</div>
                           )}
                           <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-brand-900 text-sm truncate">{uni?.name || 'Partner University'}</h4>
                             <p className="text-base text-brand-700 font-semibold mt-1">{uni?.accreditation || 'UGC A++'}</p>
                           </div>
                         </div>
                         <div className="flex items-center text-black text-sm font-bold">
                           <MapPin className="w-3 h-3 mr-1.5 text-brand-700" />
                           {uni?.location || 'GLOBAL_NODE'}
                         </div>
                       </Link>
                     ))}
                   </div>
                 </div>
               )}

               {/* Curriculum & Specs */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="sk-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-brand-900 border-b border-gray-200 pb-4">Curriculum Pulse</h3>
                    <p className="text-base text-black leading-relaxed font-normal">
                      {course.curriculum || 'A comprehensive framework designed for industry synchronization and professional mastery.'}
                    </p>
                 </div>
                 <div className="sk-card p-8 space-y-6">
                    <h3 className="text-xl font-bold text-brand-900 border-b border-gray-200 pb-4">Career Trajectory</h3>
                    <p className="text-base text-black leading-relaxed font-normal">
                      {course.careerOpportunities || 'Deployment benchmarks targeting top-tier global sectors and leadership positions.'}
                    </p>
                 </div>
               </div>

               {/* Admission & Support */}
               <div className="sk-card p-8 sm:p-12">
                  <h3 className="text-2xl font-bold text-brand-900 mb-8">Admission Protocol</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold text-brand-700">Process Flow</h4>
                       <p className="text-base text-black leading-relaxed">
                         {course.admissionProcess || 'Single-source documentation handling with end-to-end institutional synchronization support.'}
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold text-brand-700">Learning Outcomes</h4>
                       <p className="text-base text-black leading-relaxed">
                         {course.learningOutcomes || 'Mastery of technical core and development of high-performance professional competencies.'}
                       </p>
                    </div>
                  </div>
               </div>
             </div>

             <div className="lg:col-span-4 space-y-8">
               <div className="sk-card p-8 relative group">
                  <div className="absolute inset-0 bg-brand-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 className="text-lg font-bold text-brand-900 mb-6">Quick Specs</h3>
                  <div className="space-y-5">
                    {[
                      'UGC Approved Degree',
                      '100% Online Delivery',
                      'Flexible Examination',
                      'Expert Counselor Support',
                      'Technical Certification',
                      'Career Mentoring'
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm text-black">
                        <CheckCircle className="h-4 w-4 text-brand-700 flex-shrink-0" />
                        <span className="font-normal">{feat}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="sk-card p-8 space-y-6">
                  <Star className="h-8 w-8 text-brand-700" />
                  <h3 className="text-lg font-bold text-brand-900">Support Architecture</h3>
                  <p className="text-base text-black leading-relaxed font-normal">
                    {course.studyMaterials || 'Receive full access to digital pedagogy resources and 24/7 technical infrastructure for consistent learning.'}
                  </p>
               </div>
             </div>
           </div>
        </div>
      </section>

      <section className="py-24 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
