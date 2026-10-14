import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  FileText, 
  Layout, 
  FileSearch, 
  Briefcase, 
  Terminal, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Award,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/siteConfig';
import { verifiedTools } from '../data/tools';
import { academyLessons } from '../data/lessons';
import { buildRecipes } from '../data/recipes';

export const DashboardView: React.FC = () => {
  const { 
    language, 
    setActiveTab, 
    openStudioRecipe, 
    openToolDetail,
    completedLessons, 
    savedPlans, 
    savedPrompts,
    setLauncherGoal 
  } = useApp();

  const [inputIdea, setInputIdea] = useState('');

  const handleLaunchIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIdea.trim()) return;
    setLauncherGoal(inputIdea.trim());
    setActiveTab('wizard');
  };

  const quickStartCards = [
    {
      titleEn: "I have an idea but don't know where to start",
      titleTe: "నాకు ఒక ఆలోచన ఉంది కానీ ఎక్కడ ప్రారంభించాలో తెలియదు",
      descEn: "Turn your vague thought into a visual build kit with diagrams and prompts.",
      descTe: "మీ ఆలోచనను దశలవారీగా విజువల్ గైడ్ మరియు ప్రాంప్ట్‌లుగా మార్చండి.",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      action: () => openStudioRecipe('presentation'),
      badge: 'Start Here',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      titleEn: "Build a Website / Web App",
      titleTe: "వెబ్‌సైట్ లేదా వెబ్ యాప్ నిర్మించండి",
      descEn: "Step-by-step React + Tailwind scaffolding, GitHub sync, and Vercel hosting.",
      descTe: "రియాక్ట్ వెబ్‌సైట్ నిర్మించి గిట్‌హబ్ మరియు వెర్సెల్‌లో హోస్ట్ చేయడం.",
      icon: <Layout className="w-5 h-5 text-blue-500" />,
      action: () => openStudioRecipe('website'),
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      titleEn: "Create an Academic PPT / Deck",
      titleTe: "కాలేజ్ సెమినార్ ప్రెజెంటేషన్ (PPT) తయారు చేయండి",
      descEn: "8-slide narrative structure, 12-word bullets, speaker notes, and Gamma/Canva prompts.",
      descTe: "8 స్లైడ్ల నిర్మాణం, తక్కువ పదాలు మరియు గామా/కాన్వా ప్రాంప్ట్స్.",
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      action: () => openStudioRecipe('presentation'),
      badge: 'High Impact',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      titleEn: "Create Project Documentation / Report",
      titleTe: "ప్రాజెక్ట్ డాక్యుమెంటేషన్ & రిపోర్ట్ రాయండి",
      descEn: "Abstract, system architecture flowchart, test matrix, and academic formatting.",
      descTe: "అబ్‌స్ట్రాక్ట్, సిస్టమ్ ఫ్లోచార్ట్ మరియు టెస్టింగ్ టేబుల్స్.",
      icon: <FileText className="w-5 h-5 text-emerald-500" />,
      action: () => openStudioRecipe('documentation')
    },
    {
      titleEn: "Improve a Prompt (CR-TCO)",
      titleTe: "ప్రాంప్ట్‌ను మెరుగుపరచండి (CR-TCO)",
      descEn: "Transform vague instructions into structured role-task-constraint prompts.",
      descTe: "సాధారణ ప్రాంప్ట్‌ను ప్రొఫెషనల్ ఫార్మాట్‌గా మార్చి ఉత్తమ ఫలితాలు పొందండి.",
      icon: <Terminal className="w-5 h-5 text-purple-500" />,
      action: () => setActiveTab('prompt-lab')
    },
    {
      titleEn: "Learn AI Fundamentals",
      titleTe: "AI ప్రాథమిక సూత్రాలు నేర్చుకోండి",
      descEn: "Bite-sized lessons on LLMs, tokens, temperature, and responsible AI with quizzes.",
      descTe: "టోకెన్లు, కాంటెక్స్ట్ మరియు బాధ్యతాయుతమైన AI గురించి క్విజ్‌లతో నేర్చుకోండి.",
      icon: <GraduationCap className="w-5 h-5 text-rose-500" />,
      action: () => setActiveTab('academy')
    },
    {
      titleEn: "Check My Resume (Impact Bullets)",
      titleTe: "నా రెజ్యూమ్‌ను తనిఖీ చేయండి",
      descEn: "Analyze clarity, ATS formatting risks, and convert bullets to Google XYZ format.",
      descTe: "రెజ్యూమ్ క్లారిటీ, ATS చిట్కాలు మరియు గూగుల్ XYZ ఇంపాక్ట్ బుల్లెట్స్.",
      icon: <FileSearch className="w-5 h-5 text-cyan-500" />,
      action: () => setActiveTab('career')
    },
    {
      titleEn: "Find Verified Student Programs",
      titleTe: "ధృవీకరించబడిన విద్యార్థి ప్రోగ్రామ్‌లు",
      descEn: "Curated official portals: Google Summer of Code, MLH, Microsoft Ambassadors.",
      descTe: "అఫీషియల్ కెరీర్ పోర్టల్స్, ఓపెన్ సోర్స్ ఫెలోషిప్‌లు మరియు నైపుణ్య రోడ్‌మ్యాప్.",
      icon: <Briefcase className="w-5 h-5 text-teal-500" />,
      action: () => setActiveTab('career')
    }
  ];

  const featuredTools = verifiedTools.slice(0, 4);
  const beginnerLessons = academyLessons.filter(l => l.level === 'beginner');

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 sm:p-12 shadow-xl border border-slate-700/50">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'స్టూడెంట్-ఫస్ట్ AI ప్లాట్‌ఫారమ్' : 'Student-First AI Learning & Creation Launchpad'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'te' 
              ? 'ఆలోచన నుండి నిజమైన ఫలితం వరకు—దశలవారీగా.' 
              : 'From "I have an idea" to a real working result.'}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {language === 'te' ? siteConfig.taglineTe : siteConfig.tagline}
          </p>

          {/* Goal Input Launcher */}
          <form onSubmit={handleLaunchIdea} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputIdea}
                onChange={(e) => setInputIdea(e.target.value)}
                placeholder={
                  language === 'te'
                    ? "ఉదా: నా సెమినార్ కోసం AI RAG పై 8-స్లైడ్ల PPT కావాలి..."
                    : "e.g. Build an 8-slide presentation on Edge AI or a study habit tracker..."
                }
                className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{language === 'te' ? 'ప్లాన్ సృష్టించండి' : 'Generate Build Kit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick tags */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span className="text-slate-500">{language === 'te' ? 'శీఘ్ర ఎంపికలు:' : 'Quick shortcuts:'}</span>
            <button 
              type="button" 
              onClick={() => { setLauncherGoal('Build a college seminar presentation on Renewable Energy'); setActiveTab('wizard'); }}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              ⚡ Seminar PPT
            </button>
            <button 
              type="button" 
              onClick={() => { setLauncherGoal('Scaffold a personal portfolio website with React'); setActiveTab('wizard'); }}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              🌐 Portfolio Website
            </button>
            <button 
              type="button" 
              onClick={() => { setLauncherGoal('Generate system architecture documentation for mini project'); setActiveTab('wizard'); }}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              📄 Project Report
            </button>
          </div>
        </div>

        {/* Subtle decorative grid */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full border-l border-white/20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </section>

      {/* Recommended Beginner Path Banner */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te' ? 'స్టార్ట్ యాజ్ ఎ బిగినర్: స్పష్టమైన రోడ్‌మ్యాప్' : 'Start as a Beginner: The 3-Step Confidence Path'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {language === 'te'
                ? 'గందరగోళం లేదు: 1. ఒక టూల్ ఎంచుకోండి → 2. సరైన ప్రాంప్ట్ రాయండి → 3. విజువల్ బిల్డ్ స్టూడియోలో నిజమైన ఫలితం పొందండి.'
                : 'Zero confusion: 1. Learn the CR-TCO prompt formula → 2. Pick a verified student tool → 3. Use the Visual Build Studio.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => openStudioRecipe('presentation')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold border border-blue-200 transition-all shadow-xs self-start md:self-auto"
        >
          <span>{language === 'te' ? 'బిగినర్ స్టూడియో తెరవండి' : 'Launch Beginner Studio'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Quick-Start Launchpad (8 Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {language === 'te' ? 'త్వరిత ప్రారంభ కార్డ్‌లు' : 'What do you want to build today?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'te' ? 'మీ అవసరానికి తగిన విభాగాన్ని ఎంచుకోండి' : 'Select a proven path to jump straight into action'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStartCards.map((card, idx) => (
            <div
              key={idx}
              onClick={card.action}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {language === 'te' ? card.titleTe : card.titleEn}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'te' ? card.descTe : card.descEn}
                </p>
              </div>

              <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>{language === 'te' ? 'ప్రారంభించండి' : 'Start now'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Step-by-Step Build Studio Showcase */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Layers className="w-4 h-4" />
              <span>{language === 'te' ? 'ముఖ్య ప్రత్యేకత (Signature Feature)' : 'The Main Differentiator'}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {language === 'te' ? 'విజువల్ స్టెప్-బై-స్టెప్ బిల్డ్ స్టూడియో' : 'Visual Step-by-Step Build Studio'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'te'
                ? 'దృశ్య లేఅవుట్‌లు, కాపీ చేయగల ప్రాంప్ట్‌లు, మరియు "I am stuck" పరిష్కారాలతో కూడిన గైడ్స్.'
                : 'Turn vague ideas into visual recipes with wireframe previews, checkpoints, and real-world troubleshooting.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('studio')}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>{language === 'te' ? 'అన్ని రెసిపీలు చూడండి' : 'View all 5 guided recipes'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {buildRecipes.slice(0, 3).map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => openStudioRecipe(recipe.slug)}
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {recipe.slug.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.durationEstimate}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {language === 'te' ? recipe.titleTe : recipe.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {language === 'te' ? recipe.shortDescriptionTe : recipe.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500">{recipe.steps.length} {language === 'te' ? 'దశలు' : 'interactive steps'}</span>
                <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                  {language === 'te' ? 'ఓపెన్ గైడ్' : 'Open recipe'}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Split Section: Continue Learning + Saved Items */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recommended Lessons */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>{language === 'te' ? 'సిఫార్సు చేయబడిన పాఠాలు' : 'Curated Academy Lessons'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'te' ? 'క్విజ్ మరియు సర్టిఫైడ్ సూచనలతో' : 'Structured lessons with interactive quizzes'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('academy')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              {language === 'te' ? 'అన్నీ చూడండి' : 'View all'}
            </button>
          </div>

          <div className="space-y-3">
            {beginnerLessons.slice(0, 3).map((lesson) => {
              const isDone = completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveTab('academy')}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {lesson.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.durationMinutes}m
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {language === 'te' ? lesson.titleTe : lesson.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                        {language === 'te' ? 'చదవండి' : 'Start'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Saved Progress / Plans */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>{language === 'te' ? 'మీ ప్రోగ్రెస్ & ప్లాన్లు' : 'My Saved Progress'}</span>
            </h2>
            <span className="text-xs text-slate-400">
              {completedLessons.length} done
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Completed Lessons</span>
                <span className="font-bold text-slate-900">{completedLessons.length} / {academyLessons.length}</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((completedLessons.length / academyLessons.length) * 100)}%` }}
                />
              </div>
            </div>

            {savedPlans.length > 0 ? (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Saved Project Plans
                </span>
                {savedPlans.slice(0, 2).map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => setActiveTab('wizard')}
                    className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 text-xs cursor-pointer bg-white"
                  >
                    <p className="font-medium text-slate-800 line-clamp-1">{plan.goalSummary}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{plan.milestones.length} milestones</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-500">No project plans saved yet.</p>
                <button
                  onClick={() => setActiveTab('wizard')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold text-xs hover:bg-blue-100"
                >
                  Create Plan in Wizard
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Saved Prompts: {savedPrompts.length}</span>
              <button
                onClick={() => setActiveTab('prompt-lab')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Prompt Lab →
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Verified AI Tools Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'te' ? 'ధృవీకరించబడిన విద్యార్థి AI టూల్స్' : 'Verified AI Tools for Students'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'te' 
                ? 'ఖచ్చితమైన ఫ్రీ-టైర్ వివరాలు మరియు అధికారిక వెబ్‌సైట్ లింకులతో' 
                : 'With honest pricing tiers, verification dates, and official documentation links'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tools')}
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>{language === 'te' ? 'అన్ని టూల్స్ (18+)' : 'Explore all 18+ tools'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => openToolDetail(tool)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{tool.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tool.pricingLabel === 'Open Source' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : tool.pricingLabel === 'Free Tier'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tool.pricingLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {language === 'te' && tool.summaryTe ? tool.summaryTe : tool.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Verified: {tool.lastVerifiedAt}</span>
                <span className="text-blue-600 font-semibold hover:underline">Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
