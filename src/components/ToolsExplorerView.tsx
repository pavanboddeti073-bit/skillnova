import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Bookmark, 
  Calendar, 
  Wrench,
  RotateCcw
} from 'lucide-react';
import { verifiedTools } from '../data/tools';
import { useApp } from '../context/useApp';
import { Tool } from '../types';

export const ToolsExplorerView: React.FC = () => {
  const { language, openToolDetail, favoriteTools, toggleFavoriteTool } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyBeginner, setOnlyBeginner] = useState(false);

  const categories: Array<{ id: string; labelEn: string; labelTe: string }> = [
    { id: 'all', labelEn: 'All Categories', labelTe: 'అన్నీ' },
    { id: 'coding', labelEn: 'Coding & Builders', labelTe: 'కోడింగ్ & బిల్డర్స్' },
    { id: 'chat_research', labelEn: 'Chat & Research', labelTe: 'చాట్ & రీసెర్చ్' },
    { id: 'local_models', labelEn: 'Open Source / Local', labelTe: 'ఓపెన్ సోర్స్ / లోకల్' },
    { id: 'presentations', labelEn: 'Presentations & Slides', labelTe: 'ప్రెజెంటేషన్స్ & స్లైడ్స్' },
    { id: 'audio_music', labelEn: 'Audio & Music', labelTe: 'ఆడియో & మ్యూజిక్' },
    { id: 'productivity', labelEn: 'Productivity & Hosting', labelTe: 'హోస్టింగ్ & గిట్‌హబ్' },
  ];

  const filteredTools = useMemo(() => {
    return verifiedTools.filter((tool) => {
      // Search filter
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.useCases.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

      // Pricing tier filter
      const matchesPricing = selectedPricing === 'all' || tool.pricingLabel === selectedPricing;

      // Open source toggle
      const matchesOpenSource = !onlyOpenSource || tool.openSourceStatus;

      // Beginner toggle
      const matchesBeginner = !onlyBeginner || tool.skillLevel === 'beginner' || tool.skillLevel === 'all';

      return matchesSearch && matchesCategory && matchesPricing && matchesOpenSource && matchesBeginner;
    });
  }, [searchQuery, selectedCategory, selectedPricing, onlyOpenSource, onlyBeginner]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setOnlyOpenSource(false);
    setOnlyBeginner(false);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* View Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'ధృవీకరించబడిన AI డైరెక్టరీ' : 'Verified AI Tools Explorer'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'విద్యార్థుల కోసం పారదర్శకమైన AI టూల్స్' : 'Transparent, Student-Verified AI Tools'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'నకిలీ ఉచిత క్లెయిమ్‌లు లేవు. ప్రతి టూల్ ఖచ్చితమైన ధర టైర్, ధృవీకరణ తేదీ మరియు అధికారిక లింకులను కలిగి ఉంటుంది.'
            : 'No fake "free forever" claims. Every tool is cataloged with accurate pricing tier, open-source status, official URLs, and student tutorials.'}
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'te'
                ? "టూల్ పేరు లేదా పని ద్వారా వెతకండి (ఉదా: Antigravity, Gamma, Slides, React)..."
                : "Search tools by name, use case, or feature (e.g., Antigravity, Gamma, Ollama, Slides)..."
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills & Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {language === 'te' ? cat.labelTe : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Pricing Tier & Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Pricing:</span>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 font-medium"
              >
                <option value="all">All Tiers</option>
                <option value="Open Source">Open Source</option>
                <option value="Free Tier">Free Tier Available</option>
                <option value="Free Trial">Free Trial</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={onlyOpenSource}
                onChange={(e) => setOnlyOpenSource(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>100% Open Source Only</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={onlyBeginner}
                onChange={(e) => setOnlyBeginner(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Beginner Friendly Only</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              Showing {filteredTools.length} of {verifiedTools.length} tools
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedPricing !== 'all' || onlyOpenSource || onlyBeginner) && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool: Tool) => {
            const isFavorited = favoriteTools.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => openToolDetail(tool)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.badge && (
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 capitalize">
                        {tool.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        tool.pricingLabel === 'Open Source'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tool.pricingLabel === 'Free Tier'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tool.pricingLabel}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteTool(tool.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFavorited
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isFavorited ? 'Saved in favorites' : 'Bookmark tool'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {language === 'te' && tool.summaryTe ? tool.summaryTe : tool.summary}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Top Use Case
                    </span>
                    <p className="text-xs text-slate-700 font-medium truncate">
                      • {tool.useCases[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Verified {tool.lastVerifiedAt}
                  </span>
                  <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    View Blueprint →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No tools matched your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Categories", or resetting the pricing filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
