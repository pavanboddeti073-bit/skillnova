import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Search,
  Download,
  Copy,
  Check,
  BookOpen,
  Bot,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/useApp';

export const NotesBookmarksView: React.FC = () => {
  const {
    notes,
    saveNote,
    deleteNote,
    bookmarks,
    toggleBookmark,
    showToast,
    language
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'bookmarks'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Note Modal State
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | undefined>(undefined);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  const filteredNotes = notes.filter(n => {
    const matchesSearch =
      searchQuery === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || (n.tags && n.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleOpenNewNote = () => {
    setEditNoteId(undefined);
    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
    setIsEditingNote(true);
  };

  const handleOpenEditNote = (note: any) => {
    setEditNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags ? note.tags.join(', ') : '');
    setIsEditingNote(true);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) {
      showToast('Title and content are required.');
      return;
    }
    const tagsArray = noteTags.split(',').map(t => t.trim()).filter(Boolean);
    saveNote(noteTitle.trim(), noteContent.trim(), tagsArray, editNoteId);
    setIsEditingNote(false);
  };

  const handleCopyNote = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllNotes = () => {
    const markdownContent = notes
      .map(n => `# ${n.title}\n*Created: ${new Date(n.createdAt).toLocaleDateString()}* | *Tags: ${n.tags.join(', ')}*\n\n${n.content}\n\n---\n`)
      .join('\n');
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillNova_Mega14_Study_Notes_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('All notes exported as Markdown! 📄');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'స్టడీ హబ్' : 'Personal Study Hub'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Notes & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Keep your learning takeaways, code snippets, bookmarked answers, and revision checklists organized.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === 'notes' && (
            <>
              <button
                onClick={handleExportAllNotes}
                disabled={notes.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export (.md)</span>
              </button>

              <button
                onClick={handleOpenNewNote}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Note</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sub Tabs: Notes vs Bookmarks */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'notes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Notes ({notes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'bookmarks'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmarks ({bookmarks.length})</span>
        </button>
      </div>

      {/* NOTES TAB CONTENT */}
      {activeSubTab === 'notes' && (
        <div className="space-y-6">
          
          {/* Search & Tag Filter */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword or concept..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedTag === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes Cards Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map(note => (
                <div
                  key={note.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleCopyNote(note.id, `${note.title}\n\n${note.content}`)}
                          className="p-1 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                          title="Copy Note Text"
                        >
                          {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleOpenEditNote(note)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
                          title="Edit Note"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap line-clamp-5 leading-relaxed font-sans">
                      {note.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between text-[11px] text-slate-400 mt-3">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <FileText className="w-10 h-10 mx-auto text-slate-400" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">No notes found</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Capture technical concepts, code snippets, or prompt patterns by clicking "New Note".
              </p>
            </div>
          )}

        </div>
      )}

      {/* BOOKMARKS TAB CONTENT */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map(bm => (
                <div
                  key={bm.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      {bm.itemType === 'course' && <BookOpen className="w-4 h-4" />}
                      {bm.itemType === 'tutor_answer' && <Bot className="w-4 h-4" />}
                      {bm.itemType === 'tool' && <Wrench className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {bm.itemType.replace('_', ' ')}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {bm.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(bm.itemType, bm.itemId, bm.title)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-slate-400" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">No bookmarks saved yet</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Bookmark courses, lessons, and answers in the AI Tutor by clicking the bookmark icon.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit / New Note Modal */}
      {isEditingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editNoteId ? 'Edit Study Note' : 'Create New Study Note'}
              </h3>
              <button
                onClick={() => setIsEditingNote(false)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  placeholder="e.g. React 19 useMemo Rule"
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={e => setNoteTags(e.target.value)}
                  placeholder="React, TypeScript, Placement"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Note Content (Markdown supported)
                </label>
                <textarea
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  placeholder="Write your study notes, code examples, or formulas..."
                  rows={6}
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 resize-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingNote(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
