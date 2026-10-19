import React from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  BookOpen,
  Clock
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { courseCatalog } from '../data/courses';

export const MyLearningView: React.FC = () => {
  const {
    enrolledCourseIds,
    completedLessons,
    openCourseDetail,
    setActiveTab,
    language
  } = useApp();

  const enrolledCourses = courseCatalog.filter(c => enrolledCourseIds.includes(c.id));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'నా అభ్యాసం' : 'My Active Learning'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {language === 'te' ? 'మీరు నమోదు చేసుకున్న కోర్సులు & పురోగతి' : 'Enrolled Courses & Active Learning Progress'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Track your course completion, resume lessons right where you left off, and review completed modules.
        </p>
      </div>

      {/* Enrolled Courses Grid */}
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map(course => {
            return (
              <div
                key={course.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.durationHours} hrs
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span>Course Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-750 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Instructor: {course.instructor}</span>
                  <button
                    onClick={() => openCourseDetail(course)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Course</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4">
          <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No courses enrolled yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse our 10-category catalog to enroll in Generative AI, Full-Stack React, and Python courses.
          </p>
          <button
            onClick={() => setActiveTab('courses')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Explore Course Catalog
          </button>
        </div>
      )}

      {/* Completed Lessons Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Completed Lessons ({completedLessons.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {completedLessons.map(lessonId => (
            <div
              key={lessonId}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                  {lessonId.replace(/-/g, ' ')}
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Verified</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
