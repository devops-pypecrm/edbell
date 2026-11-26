import { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle, MapPin, Users, Globe, Calendar, ArrowLeft, ArrowRight, Building, GraduationCap, Phone, Info, Clock } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import University from '@/models/University';
import Course from '@/models/Course';
import { notFound } from 'next/navigation';
import Newsletter from '@/components/Newsletter';
import CourseApplyButton from '@/components/CourseApplyButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const university = await University.findOne({ 
    $or: [
      { url: `/universities/${slug}` },
      { url: `universities/${slug}` },
      { url: new RegExp(`^/universities/${slug}$`, 'i') }
    ]
  }).lean();
  
  if (!university) {
    return {
      title: 'University Not Found - EDBELL EDUSOLUTIONS',
    };
  }

  return {
    title: `${university.name} - Online University Programs | EDBELL EDUSOLUTIONS`,
    description: university.description,
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  
  // Initialize Database and Models
  await connectDB();
  const dbUni = await University.findOne({ 
    $or: [
      { url: `/universities/${slug}` },
      { url: `universities/${slug}` },
      { url: new RegExp(`^/universities/${slug}$`, 'i') }
    ]
  }).lean();

  if (!dbUni) {
    notFound();
  }

  // Manually map to a plain object to ensure 100% serializability for RSC
  const university = {
    _id: String(dbUni._id),
    name: String(dbUni.name || 'University'),
    description: String(dbUni.description || ''),
    accreditation: String(dbUni.accreditation || 'UGC A++'),
    established: String(dbUni.established || 'TBD'),
    location: String(dbUni.location || 'India'),
    website: String(dbUni.website || '')
  };

  // Fetch courses offered by this university
  const dbCourses = await Course.find({ 
    offeredByUniversities: dbUni._id 
  }).lean();

  const universityCourses = dbCourses.map((c: any) => ({
    name: String(c.name || ''),
    url: String(c.url || '#'),
    category: String(c.category || 'Program'),
    duration: String(c.duration || '')
  }));

  return (
    <div className="min-h-screen">
      <section className=" pt-10 pb-14 lg:pt-14 lg:pb-20 px-5 sm:px-8">
        {/* Dynamic Backdrop */}
        <div className="hidden"></div>
        <div className="hidden"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <Link href="/universities" className="inline-flex items-center text-brand-700 hover:underline text-base font-semibold group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Universities
              </Link>
              
              <div className="space-y-3">
                <div className="">
                  <Award className="hidden" />
                  <span className="text-base font-semibold text-black">{university.accreditation} ACCREDITED</span>
                </div>
                
                <h1 className="text-4xl lg:text-[52px] lg:leading-[1.1] font-bold text-gray-900">
                   {university.name}
                </h1>
                
                <p className="text-lg lg:text-xl text-black max-w-2xl">
                  {university.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 border-y border-gray-300">
                <div className="py-4">
                  <Calendar className="hidden" />
                  <div className="text-base text-black">Established</div>
                  <div className="text-base font-semibold text-gray-900">{university.established}</div>
                </div>
                <div className="py-4">
                  <MapPin className="hidden" />
                  <div className="text-base text-black">Location</div>
                  <div className="text-base font-semibold text-gray-900">{university.location || 'India'}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CourseApplyButton 
                  courseId={university._id}
                  courseName={university.name}
                  label="Apply Now"
                />
                {university.website && (
                  <a href={university.website.startsWith('http') ? university.website : `https://${university.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-brand-900 rounded-[15px] text-brand-900 font-semibold hover:bg-brand-50 transition-colors">
                    Official Website
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="hidden"></div>
              <div className="sk-card p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-brand-900 mb-4">University Protocol</h3>
                
                <div className="border-t border-gray-200">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200 group">
                    <div className="flex items-center space-x-3 text-black group-hover:text-brand-700 transition-colors">
                      <Building className="h-4 w-4" />
                      <span className="text-base font-semibold">Institution Type</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-base">UGC Approved</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-4 border-b border-gray-200 group">
                    <div className="flex items-center space-x-3 text-black group-hover:text-brand-700 transition-colors">
                      <Globe className="h-4 w-4" />
                      <span className="text-base font-semibold">Learning Mode</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-base">100% Online</span>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b border-gray-200 group">
                    <div className="flex items-center space-x-3 text-black group-hover:text-brand-700 transition-colors">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-base font-semibold">Accreditation</span>
                    </div>
                    <span className="font-semibold text-brand-700 text-base">{university.accreditation}</span>
                  </div>

                  <div className="pt-6">
                    <div className="bg-brand-50 border border-brand-200 rounded-lg p-5">
                       <p className="text-base font-semibold text-brand-700 mb-2 flex items-center">
                         <Info className="h-3 w-3 mr-1.5" />
                         Admission Support
                       </p>
                       <p className="text-base text-black leading-relaxed">
                         Our expert counselors handle the entire documentation and submission process for this institution.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Programs Section */}
      <section className="py-24 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <p className="text-base font-semibold text-brand-700">Academic Catalog</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Available Programs</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universityCourses.length > 0 ? (
              universityCourses.map((course, idx) => (
                <Link 
                  href={course.url} 
                  key={idx}
                  className="sk-card group relative p-8 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded">
                        {course.category}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-900 group-hover:text-brand-700 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-900 leading-tight group-hover:text-brand-700 transition-colors">
                      {course.name}
                    </h3>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center text-sm font-bold text-black">
                       <Clock className="h-3 w-3 mr-2 text-brand-700" />
                       {course.duration}
                    </div>
                    <span className="text-base font-semibold text-brand-700 group-hover:underline underline-offset-4">
                      Examine Module
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
                <GraduationCap className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <p className="text-black font-normal">Standard academic programs currently being synchronized for this university.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="max-w-[1300px] mx-auto px-5 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Ready to Start?</h2>
            <p className="text-lg text-black font-normal leading-relaxed">
              Connect with our senior admission architect to begin your enrollment procedure at {university.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <CourseApplyButton 
                courseId={university._id}
                courseName={university.name}
                label="Apply Now"
                className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-5 px-12 rounded-[10px] transition-all text-sm flex items-center justify-center"
              />
              <a href={`tel:+91924130060`} className="bg-gray-50 hover:bg-gray-50 border border-gray-200 text-gray-900 font-bold py-5 px-12 rounded-lg transition-all text-base flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" /> Call Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
