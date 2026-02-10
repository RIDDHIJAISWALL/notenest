import React, { useMemo, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import {
  ShieldAlert,
  Trash2,
  Download,
  BookOpen,
  Layers,
  User,
  Calendar,
} from "lucide-react";

import { deleteDoc, doc } from "firebase/firestore"; // ✅ necessary import
import { db } from "../firebase"; // ✅ necessary import

const YEAR_ORDER = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function AdminDashboard() {                        
  const {
  user,
  studyMaterials,
  deleteLibraryMaterial,
  allNotes,
  allUsers,
  pendingUploads,
  approveUpload,
  setPendingUploads,
} = useAppContext();


  const isAdmin = user?.role === "admin";

const flatMaterials = useMemo(() => {
  const rows = [];

  Object.keys(studyMaterials).forEach((stream) => {
    Object.keys(studyMaterials[stream] || {}).forEach((year) => {
      ["notes", "pyq"].forEach((type) => {   // ✅ FIXED ONLY THIS
        (studyMaterials[stream][year]?.[type] || []).forEach((item) => {
          rows.push({
            ...item,
            stream,
            year,
            type,
          });
        });
      });
    });
  });

  return rows;
}, [studyMaterials]);


  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-3xl shadow-lg border border-slate-200 p-10 text-center">
        <ShieldAlert className="mx-auto mb-4 text-red-500" size={40} />
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          Admin Access Only
        </h1>
        <p className="text-slate-500 text-sm">
          You must login with the admin credentials to view this dashboard.
        </p>
      </div>
    );
  }


const handleDelete = (stream, year, type, id, title) => {
  if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
    deleteLibraryMaterial(stream, year, type, id);
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 mt-6 pb-16">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="text-red-500" size={26} />
            <h1 className="text-3xl font-extrabold text-slate-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-slate-500 text-sm">
            Manage uploaded study materials, notes and previous year papers.
          </p>
        </div>

        <div className="flex gap-3">
          <StatsCard
            icon={BookOpen}
            label="Total Notes"
            value={
              flatMaterials.filter((m) => m.type === "notes").length.toString()
            }
          />
          <StatsCard
            icon={Layers}
            label="Total PYQs"
            value={
              flatMaterials.filter((m) => m.type === "pyq").length.toString()
            }
          />
          <StatsCard
            icon={User}
            label="Users"
            value={allUsers.length.toString()}
          />
        </div>
      </div>

      {/* ================= PENDING REVIEW QUEUE ================= */}
{pendingUploads.length > 0 && (
  <div className="mb-10 bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
    <div className="px-5 py-3 border-b border-slate-100">
      <h2 className="text-sm font-semibold text-slate-700">
        Pending Upload Requests ({pendingUploads.length})
      </h2>
    </div>

    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase">
        <tr>
          <th className="text-left py-3 px-4">Title</th>
          <th className="text-left py-3 px-4">Uploader</th>
          <th className="text-left py-3 px-4">Stream</th>
          <th className="text-left py-3 px-4">Year</th>
          <th className="text-right py-3 px-4">Actions</th>
        </tr>
      </thead>

      <tbody>
        {pendingUploads.map((m) => (
          <tr key={m.id} className="border-t border-slate-100">
            <td className="py-3 px-4 font-medium">{m.title}</td>
            <td className="py-3 px-4 text-xs">{m.uploadedBy}</td>
            <td className="py-3 px-4 text-xs">{m.stream}</td>
            <td className="py-3 px-4 text-xs">{m.year}</td>

            <td className="py-3 px-4 text-right flex justify-end gap-2">
              <button
                onClick={() => approveUpload(m)}
                className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs"
              >
                Approve
              </button>

              <button
  onClick={async () => {
    if (!window.confirm("Reject this upload?")) return;

    await deleteDoc(doc(db, "pending_notes", m.id));

    setPendingUploads(prev =>
      prev.filter(x => x.id !== m.id)
    );
  }}
  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs"
>
  Reject
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {/* Table of materials */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">
            Library Uploads ({flatMaterials.length})
          </h2>
          <span className="text-[11px] text-slate-400">
            Tip: click the download icon to open file.
          </span>
        </div>

        {flatMaterials.length === 0 ? (
          <p className="py-8 text-center text-slate-500 text-sm">
            No materials uploaded yet.
          </p>
        ) : (
          <div className="max-h-[480px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase">
                <tr>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Year</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Uploaded By</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Size</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flatMaterials.map((m) => (
                  <tr
                    key={`${m.id}-${m.year}-${m.type}`}
                    className="border-t border-slate-100 hover:bg-slate-50/60"
                  >
                    <td className="py-3 px-4 max-w-[220px]">
                      <div className="font-medium text-slate-900 truncate">
                        {m.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {m.year}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span
                        className={`px-2 py-1 rounded-full font-semibold ${
                          m.type === "notes"
                            ? "bg-indigo-50 text-indigo-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {m.type === "notes" ? "Notes" : "PYQ"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {m.uploadedBy || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} />
                        {m.date || "-"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">
                      {m.size || "-"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {m.url && m.url !== "#" && (
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50"
                            title="View / Download"
                          >
                            <Download size={16} />
                          </a>
                        )}
                        <button
  onClick={() =>
    handleDelete(m.stream, m.year, m.type, m.id, m.title)
  }
  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
  title="Delete permanently"
>
  <Trash2 size={16} />
</button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-xs text-slate-400">
        Tracking {allNotes.length} uploads in Trending Notes list.
      </div>

      <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          🧑‍🏫 Syllabus Admin Panel
        </h2>

        <SyllabusAdmin />
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
        <Icon className="text-indigo-600" size={18} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">
          {label}
        </div>
        <div className="text-sm font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}


// ================= SYLLABUS ADMIN COMPONENT =================

function SyllabusAdmin() {
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("aktu_syllabus")) || {};
  });

  const [year, setYear] = useState("1st Year");
  const [branch, setBranch] = useState("CSE");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [yt, setYt] = useState("");
  const [docs, setDocs] = useState("");

  useEffect(() => {
    localStorage.setItem("aktu_syllabus", JSON.stringify(data));
  }, [data]);

  const addSubject = () => {
    if (!subject) return alert("Enter subject name");

    const copy = { ...data };
    if (!copy[year]) copy[year] = { courses: {} };
    if (!copy[year].courses[branch])
      copy[year].courses[branch] = { subjects: [] };

    copy[year].courses[branch].subjects.push({
      name: subject,
      units: [],
    });

    setData(copy);
    setSubject("");
  };

  const addUnit = () => {
    if (!unit || !yt || !docs) return alert("Fill all fields");

    const copy = { ...data };
    const subjects =
      copy?.[year]?.courses?.[branch]?.subjects || [];

    if (!subjects.length) return alert("Add subject first");

    subjects[subjects.length - 1].units.push({
      title: unit,
      yt,
      docs,
    });

    setData(copy);
    setUnit("");
    setYt("");
    setDocs("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-50 border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Add Subject</h3>

        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year (1st Year, 2nd Year...)"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Branch (CSE, IT, AIML...)"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject name"
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={addSubject}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
      </div>

      <div className="bg-slate-50 border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Add Unit</h3>

        <input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit title"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={yt}
          onChange={(e) => setYt(e.target.value)}
          placeholder="YouTube link"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          value={docs}
          onChange={(e) => setDocs(e.target.value)}
          placeholder="Docs link"
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={addUnit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Unit
        </button>
      </div>
    </div>
  );
}
 