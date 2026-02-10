// src/components/SplitViewWrapper.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  FileText,
  Download,
  X,
  Sparkles,
  Send,
} from "lucide-react";

export default function SplitViewWrapper() {
  const {
    selectedNote,
    setSelectedNote,
    chatMessages,
    inputMsg,
    setInputMsg,
    handleSend,
  } = useAppContext();

  if (!selectedNote) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6">
      <div className="bg-white w-full h-full max-w-[1400px] rounded-3xl shadow-2xl flex overflow-hidden border border-white/10">
        
        {/* ---------- LEFT PDF PREVIEW ---------- */}
        <div className="w-1/2 md:w-2/3 bg-slate-100 border-r flex flex-col relative">
          <div className="h-16 bg-white border-b flex items-center justify-between px-6 z-10 shadow-sm">
            <h2 className="font-bold text-slate-800 truncate text-lg flex items-center gap-2">
              <FileText className="text-red-500" size={20} />
              {selectedNote.title}
            </h2>
            <div className="flex gap-3">
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 shadow">
                <Download size={16} /> Download PDF
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
            <div className="bg-white shadow-2xl w-full max-w-3xl h-[800px] rounded-lg p-10 border">
              <div className="text-center text-slate-500">
                PDF preview placeholder
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT CHAT ---------- */}
        <div className="w-1/2 md:w-1/3 flex flex-col bg-white">
          <div className="h-16 border-b flex items-center px-6 bg-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 leading-tight">NoteNest Bot</h3>
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none text-slate-700"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-white">
            <div className="relative">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask NoteNest about this document..."
                className="w-full bg-slate-100 border-none outline-none text-sm pl-5 pr-14 py-4 rounded-2xl"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
