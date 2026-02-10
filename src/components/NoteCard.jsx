// src/components/NoteCard.jsx
import React from 'react';
import { FileText, User, ThumbsUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NoteCard = ({ note }) => {
  const { setSelectedNote } = useAppContext();

  return (
    <div
      onClick={() => setSelectedNote(note)}
      className="bg-white group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 rounded-2xl overflow-hidden relative shadow-sm"
    >
      <div className="p-6">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
          <FileText size={24} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
          {note.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {note.summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {note.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md font-medium border border-slate-100 uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <User size={14} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">{note.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
            <ThumbsUp size={12} /> {note.upvotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
