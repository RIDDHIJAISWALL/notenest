// src/components/ReviewModal.jsx
import React from 'react';
import { X, FileText, Trash2, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ReviewModal = () => {
  const {
    reviewNote,
    setReviewNote,
    handleDeleteNote,
    handleVerifyNote,
    addLibraryMaterial,
  } = useAppContext();

  if (!reviewNote) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{reviewNote.title}</h3>
            <p className="text-sm text-slate-500">Uploaded by: {reviewNote.author}</p>
          </div>
          <button
            onClick={() => setReviewNote(null)}
            className="p-2 hover:bg-slate-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 bg-slate-100 p-8 overflow-y-auto">
          <div className="bg-white shadow-lg w-full h-[400px] rounded-lg p-8 flex flex-col items-center justify-center border border-slate-200">
            <FileText size={64} className="text-slate-300 mb-4" />
            <p className="text-slate-400 font-medium">Document Preview</p>
            <p className="text-slate-500 text-sm mt-2 text-center max-w-md">
              {reviewNote.summary}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button
            onClick={() => handleDeleteNote(reviewNote.id)}
            className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <Trash2 size={18} /> Reject & Delete
          </button>

          <button
            onClick={() => {
              handleVerifyNote(reviewNote.id);

              addLibraryMaterial({
                stream: reviewNote.stream,
                year: reviewNote.year,
                type: "notes",
                title: reviewNote.title,
                file: null,
              });

              setReviewNote(null);
            }}
            className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-200"
          >
            <CheckCircle size={18} /> Verify & Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
