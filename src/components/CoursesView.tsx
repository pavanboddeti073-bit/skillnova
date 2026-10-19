import React, { useState } from 'react';
import {
  Compass,
  Search,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { courseCatalog, COURSE_CATEGORIES } from '../data/courses';

export const CoursesView: React.FC = () => {
  const {
    language,
    enrolledCourseIds,
    enrollInCourse,
    openCourseDetail
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courseCatalog.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel || course.level === 'all';
    const matchesSearch =
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'కోర్సు లైబ్రరీ' : 'Course Catalog'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {language === 'te' ? '10 సాంకేతిక రంగాలలో అగ్రశ్రేణి కోర్సులు' : 'Master In-Demand Skills with AI-Enhanced Courses'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'ప్రతి కోర్సులో స్పష్టమైన సిలబస్, దశలవారీ పాఠాలు, కోడ్ ప్రయోగాలు మరియు తక్షణ మూల్యాంకనం కోసం క్విజ్‌లు ఉంటాయి.'
            : 'Comprehensive, structured courses covering Artificial Intelligence, Web Development, Data Science, Math, Cloud, and Career Placement with interactive lessons.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or language (e.g. React, LLM, Python)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="beginner">Beginner Friendly</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* 10 Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Categories ({courseCatalog.length})
          </button>
          {COURSE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourseIds.includes(course.id);
          return (
            <div
              key={course.id}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group"
            >
              <div>
                {/* Visual Banner */}
                <div className={`h-36 bg-gradient-to-tr ${course.thumbnailGradient} p-5 flex flex-col justify-between text-white relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-xs">
                      {course.level}
                    </span>
                    {isEnrolled && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Enrolled
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg leading-snug drop-shadow-xs line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Course Metadata & Description */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.durationHours} hrs
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {language === 'te' && course.descriptionTe ? course.descriptionTe : course.description}
                  </p>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    Instructor: <span className="text-slate-700 dark:text-slate-300 font-medium">{course.instructor}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 dark:border-slate-750 mt-4">
                <button
                  onClick={() => openCourseDetail(course)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-800 dark:text-slate-100 font-bold text-xs transition-all cursor-pointer"
                >
                  View Syllabus
                </button>
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isEnrolled
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  }`}
                >
                  {isEnrolled ? 'Enrolled' : 'Enroll Free'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
