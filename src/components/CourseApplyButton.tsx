'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CourseApplicationForm from '@/components/CourseApplicationForm';

interface CourseApplyButtonProps {
  courseId: string;
  courseName: string;
  className?: string;
  label?: string;
  type?: 'apply' | 'enquiry';
}

export default function CourseApplyButton({ 
  courseId, 
  courseName, 
  className = "bg-brand-700 hover:bg-brand-900 text-white font-semibold px-10 py-3 rounded-[10px] transition-colors text-base flex items-center justify-center",
  label = "Apply Now",
  type = "apply"
}: CourseApplyButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={className}
      >
        <span>{label}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      <CourseApplicationForm 
        courseId={courseId}
        courseName={courseName}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={type}
      />
    </>
  );
}
