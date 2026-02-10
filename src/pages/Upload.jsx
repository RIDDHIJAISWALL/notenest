// src/pages/Upload.jsx
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  UploadCloud,
  FileText,
  Calendar,
  User,
  BookOpen,
  Layers,
} from "lucide-react";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const TYPES = [
  { id: "notes", label: "Notes" },
  { id: "pyq", label: "PYQs" },
];

export default function Upload() {
  const { user, addLibraryMaterial, handleUploadSubmit } = useAppContext();

  const [year, setYear] = useState("1st Year");
  const [type, setType] = useState("notes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stream, setStream] = useState("CSE");
  const [file, setFile] = useState(null);
  const [externalLink, setExternalLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-3xl shadow-lg border border-slate-200 p-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Please login to upload notes
        </h1>
        <p className="text-slate-500">
          Use the Google login on the home page to access upload features.
        </p>
      </div>
    );
  }

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file && !externalLink) {
    alert("Please attach a file or provide an external link.");
    return;
  }

  try {
    setIsSubmitting(true);

    if (file) {
      await addLibraryMaterial({
        stream,
        year,
        type,
        title,
        file,
      });
    }

    alert("Upload sent for admin review ✅");
  } catch (err) {
    console.error(err);
    alert("Something went wrong while uploading.");
  } finally {
    setIsSubmitting(false);
    setTitle("");
    setDescription("");
    setExternalLink("");
    setFile(null);
    (document.getElementById("upload-file-input") || {}).value = "";
  }
};


  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="mt-6 mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
          <UploadCloud className="text-indigo-600" size={34} />
          Upload Resources
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl">
          Help your juniors by sharing your notes. You earn points for every
          approved upload. PDF / PPT / DOCX are recommended.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 mb-16">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <FileText size={16} className="mr-2 text-indigo-500" />
                Title of Document
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Data Structures Unit 1"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <BookOpen size={16} className="mr-2 text-indigo-500" />
                Stream
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                name="stream"
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AI/ML">AI & ML</option>
                <option value="Mechanical">Mechanical</option>

                <option value="ECE">ECE</option>
               
              </select>
            </div>

            <div>
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <Calendar size={16} className="mr-2 text-indigo-500" />
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                name="year"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <Layers size={16} className="mr-2 text-indigo-500" />
                Category
              </label>
              <div className="flex gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`flex-1 px-3 py-2 rounded-xl border text-sm font-semibold transition ${
                      type === t.id
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              <FileText size={16} className="mr-2 text-indigo-500" />
              Description / Summary
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              rows={4}
              placeholder="Briefly describe what this note covers..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm resize-none"
            />
          </div>

          {/* File & Link */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <UploadCloud size={16} className="mr-2 text-indigo-500" />
                Upload File (PDF, DOCX, PPT)
              </label>

              <label
                htmlFor="upload-file-input"
                className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40 cursor-pointer transition"
              >
                <UploadCloud className="text-indigo-500 mb-2" size={32} />
                <span className="text-sm font-medium text-slate-700">
                  {file ? file.name : "Click to browse or drop file here"}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Max ~10 MB • PDF / PPT / DOCX
                </span>
                <input
                  id="upload-file-input"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="hidden"
                  onChange={onFileChange}
                />
              </label>
            </div>

            <div>
              <label className="flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                <User size={16} className="mr-2 text-indigo-500" />
                Optional External Link (Drive / OneDrive)
              </label>
              <input
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Uploading..." : "Submit for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
