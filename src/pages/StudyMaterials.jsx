import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { BookOpen, FileText, Layers, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function StudyMaterials() {
  const {
    selectedStream,
    setSelectedStream,
    selectedYear,
    setSelectedYear,
    resourceType,
    setResourceType,
    studyMaterials,
    resourceSearch,
    setResourceSearch,
    user,
  } = useAppContext();

  const location = useLocation();

  // 🔥 AUTO SELECT STREAM WHEN COMING FROM HOME PAGE
  useEffect(() => {
    if (location.state?.stream) {
      setSelectedStream(location.state.stream);
    }
  }, [location.state, setSelectedStream]);

  const streams = ["CSE", "AI/ML", "Data Science", "ECE", "Mechanical", "IT"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const materials =
    studyMaterials[selectedStream]?.[selectedYear] || {
      notes: [],
      pyq: [],
    };

  const list = (materials[resourceType] || []).filter((item) =>
    item.title.toLowerCase().includes(resourceSearch.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-b-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          <BookOpen size={38} /> Study Materials
        </h1>

        <p className="text-white/80 mt-2">
          Browse notes, PYQs, and resources for every stream & year.
        </p>

        {/* SEARCH */}
        <div className="relative mt-6 max-w-xl">
          <Search size={20} className="absolute left-5 top-3.5 text-white/60" />
          <input
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30"
            placeholder="Search materials..."
            value={resourceSearch}
            onChange={(e) => setResourceSearch(e.target.value)}
          />
        </div>
      </div>

      {/* STREAM SELECTOR */}
      <div className="flex justify-center gap-3 mt-10 flex-wrap">
        {streams.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStream(st)}
            className={`px-5 py-2 rounded-xl font-semibold ${
              selectedStream === st
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border border-slate-300"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* YEAR SELECTOR */}
      <div className="flex justify-center gap-4 mt-6">
        {years.map((yr) => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            className={`px-6 py-2 rounded-xl font-semibold ${
              selectedYear === yr
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border border-slate-300"
            }`}
          >
            {yr}
          </button>
        ))}
      </div>

      {/* NOTES / PYQS */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setResourceType("notes")}
          className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
            resourceType === "notes"
              ? "bg-indigo-600 text-white shadow"
              : "bg-white border border-slate-300"
          }`}
        >
          <FileText size={18} /> Notes
        </button>

        <button
          onClick={() => setResourceType("pyq")}
          className={`px-6 py-2 rounded-xl flex items-center gap-2 ${
            resourceType === "pyq"
              ? "bg-indigo-600 text-white shadow"
              : "bg-white border border-slate-300"
          }`}
        >
          <Layers size={18} /> PYQs
        </button>
      </div>

      {/* MATERIAL GRID */}
      <div className="px-6 mt-10 pb-16">
        {list.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">
            No materials found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((item) => {
              // 🔥 ONLY FIX: convert image URL → raw URL for PDFs
              const fixedUrl = item.url?.replace(
                "/image/upload/",
                "/raw/upload/"
              );

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition"
                >
                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <div className="mt-5 flex gap-3">
                    <a
                      href={fixedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black flex items-center justify-center gap-2"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
