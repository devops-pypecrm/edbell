'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import CourseApplicationForm from '@/components/CourseApplicationForm';

interface CourseEnrollmentSectionProps {
  courseId: string;
  courseName: string;
}

export default function CourseEnrollmentSection({ courseId, courseName }: CourseEnrollmentSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'apply' | 'enquiry'>('apply');

  const openModal = (type: 'apply' | 'enquiry') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <button 
          onClick={() => openModal('apply')}
          className="bg-yellow-500 hover:bg-yellow-600 text-brand-700 font-bold py-2 px-4 rounded-lg transition-all duration-300 text-base transform"
        >
          Apply Now
        </button>
        <button 
          onClick={() => openModal('enquiry')}
          className="bg-gray-50 hover:bg-gray-50 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-base border border-gray-200 transform"
        >
          Enquire Now
        </button>
      </div>

      <CourseApplicationForm 
        courseId={courseId} 
        courseName={courseName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
