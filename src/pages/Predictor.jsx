// src/pages/Predictor.jsx
import React from "react";
import { Calculator, TrendingUp, Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const Predictor = () => {
  const {
    subjects,
    cgpaResult,
    handleAddSubject,
    handleRemoveSubject,
    handleSubjectChange,
    calculateCGPA,
  } = useAppContext();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center flex-wrap gap-6">
            <div>
              <h2 className="text-3xl font-extrabold flex items-center gap-3">
                <Calculator className="text-indigo-400" /> CGPA Calculator
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Add subjects from <strong>1st to 4th year</strong> with their
                internal and external marks. Internal can be out of{" "}
                <strong>30 or 50</strong>, external is out of{" "}
                <strong>70</strong>. We’ll compute your overall{" "}
                <span className="font-semibold text-indigo-200">CGPA (0–10)</span>.
              </p>
            </div>

            {cgpaResult !== null && (
              <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-center">
                <p className="text-xs text-indigo-300 uppercase tracking-widest font-bold mb-1">
                  Your CGPA
                </p>
                <p className="text-5xl font-black text-white">{cgpaResult}</p>
              </div>
            )}
          </div>

          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        {/* Table */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-12 gap-4 text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-4">
            <div className="col-span-4 md:col-span-4">Subject Name</div>
            <div className="col-span-2 md:col-span-2 text-center">Year</div>
            <div className="col-span-3 md:col-span-3 text-center">
              Internal Marks
              <div className="font-normal normal-case text-[10px] text-slate-400">
                (value & max: 30 / 50)
              </div>
            </div>
            <div className="col-span-2 md:col-span-2 text-center">
              External (70)
            </div>
            <div className="col-span-1 text-center" />
          </div>

          <div className="space-y-3">
            {subjects.map((sub, index) => (
              <div
                key={sub.id}
                className="grid grid-cols-12 gap-2 md:gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
              >
                {/* Subject name */}
                <div className="col-span-4 md:col-span-4">
                  <input
                    type="text"
                    placeholder={`Subject ${index + 1}`}
                    value={sub.name}
                    onChange={(e) =>
                      handleSubjectChange(sub.id, "name", e.target.value)
                    }
                    className="w-full bg-transparent font-semibold text-slate-700 placeholder-slate-400 outline-none px-2"
                  />
                </div>

                {/* Year select */}
                <div className="col-span-2 md:col-span-2">
                  <select
                    value={sub.year}
                    onChange={(e) =>
                      handleSubjectChange(sub.id, "year", e.target.value)
                    }
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Internal marks + max selector */}
                <div className="col-span-3 md:col-span-3 flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max={sub.internalMax}
                    placeholder="Marks"
                    value={sub.internal}
                    onChange={(e) =>
                      handleSubjectChange(sub.id, "internal", e.target.value)
                    }
                    className="w-1/2 text-center bg-white border border-slate-200 rounded-lg py-2 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
                  />
                  <select
                    value={sub.internalMax}
                    onChange={(e) =>
                      handleSubjectChange(
                        sub.id,
                        "internalMax",
                        Number(e.target.value)
                      )
                    }
                    className="w-1/2 bg-white border border-slate-200 rounded-lg py-2 px-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
                  >
                    <option value={30}>/ 30</option>
                    <option value={50}>/ 50</option>
                  </select>
                </div>

                {/* External */}
                <div className="col-span-2 md:col-span-2">
                  <input
                    type="number"
                    min="0"
                    max="70"
                    placeholder="0–70"
                    value={sub.external}
                    onChange={(e) =>
                      handleSubjectChange(sub.id, "external", e.target.value)
                    }
                    className="w-full text-center bg-white border border-slate-200 rounded-lg py-2 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
                  />
                </div>

                {/* Delete row */}
                <div className="col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleAddSubject}
              className="flex-1 py-3.5 border border-dashed border-slate-300 text-slate-500 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              + Add Subject (any year)
            </button>
            <button
              type="button"
              onClick={calculateCGPA}
              className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <TrendingUp size={20} /> Calculate CGPA
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Note: Each subject is treated with equal weight. Enter all subjects
            from all 4 years for an accurate overall CGPA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
