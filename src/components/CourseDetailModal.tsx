import React from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  BookOpen,
  Play,
  Check
} from 'lucide-react';
import { useApp } from '../context/useApp';
import type { CourseModuleLesson } from '../data/courses';

export const CourseDetailModal: React.FC = () => {
  const {
    selectedCourse,
    closeCourseDetail,
    enrolledCourseIds,
    enrollInCourse,
    openLessonDetail,
    completedLessons,
    language
  } = useApp();

  if (!selectedCourse) return null;

  const isEnrolled = enrolledCourseIds.includes(selectedCourse.id);

  const handleStartLesson = (lesson: CourseModuleLesson) => {
    openLessonDetail(lesson);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Hero */}
        <div className={`p-6 sm:p-8 bg-gradient-to-tr ${selectedCourse.thumbnailGradient} text-white relative shrink-0`}>
          <button
            onClick={closeCourseDetail}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-all cursor-pointer"
            aria-label="Close course detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-xs">
                {selectedCourse.category}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20">
                {selectedCourse.level}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight">
              {selectedCourse.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
              {language === 'te' && selectedCourse.descriptionTe
                ? selectedCourse.descriptionTe
                : selectedCourse.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-white/80">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {selectedCourse.durationHours} Hours Duration
              </span>
              <span>•</span>
              <span>Instructor: {selectedCourse.instructor}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Learning Objectives */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              What You Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedCourse.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites and Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">Prerequisites</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                {selectedCourse.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">Tools Required</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                {selectedCourse.toolsRequired.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Module-by-Module Syllabus */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Course Syllabus & Interactive Lessons
            </h3>

            {selectedCourse.modules.length > 0 ? (
              selectedCourse.modules.map(mod => (
                <div
                  key={mod.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Module {mod.moduleNumber}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {mod.title}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500">{mod.lessons.length} Lessons</span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mod.lessons.map(lesson => {
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer"
                          onClick={() => handleStartLesson(lesson)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isDone
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {isDone ? <Check className="w-4 h-4" /> : lesson.lessonNumber}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                                {lesson.title}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {lesson.durationMinutes} mins • {lesson.level}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={e => { e.stopPropagation(); handleStartLesson(lesson); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-indigo-600" />
                            <span>{isDone ? 'Review' : 'Start'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 text-center space-y-2 border border-slate-200 dark:border-slate-800">
                <BookOpen className="w-8 h-8 mx-auto text-indigo-400" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Interactive Syllabus Available on Enrollment
                </div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Enroll to unlock real-time code environments, quizzes, and AI Tutor step-by-step guidance.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            {isEnrolled ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Enrolled in this Course
              </span>
            ) : (
              '100% Free • Self-Paced • Verified Certification'
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={closeCourseDetail}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750 transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => enrollInCourse(selectedCourse.id)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {isEnrolled ? 'Enrolled' : 'Enroll Free'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
