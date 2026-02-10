// src/pages/Profile.jsx
import React from "react";
import { Mail, Trash2, LogOut, FileText } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Profile = () => {
  const { user, handleLogout } = useAppContext();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-1">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600">
            {user.name.charAt(0)}
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                user.role === "admin"
                  ? "bg-red-50 text-red-700 border-red-100"
                  : "bg-indigo-50 text-indigo-700 border-indigo-100"
              }`}
            >
              {user.role === "admin" ? "Administrator" : "Student"}
            </span>
          </div>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mb-4">
            <Mail size={16} /> {user.email}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <StatPill label="Uploads" value="12" />
            <StatPill label="Reputation" value="850" />
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          My Recent Uploads
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Dummy data – could be wired to actual uploads later */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">
                  Engineering Physics Unit 1
                </h4>
                <p className="text-xs text-slate-500">
                  Uploaded 2 days ago • Verified
                </p>
              </div>
            </div>
            <button className="text-slate-300 group-hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatPill = ({ label, value }) => (
  <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
    <p className="text-xs text-slate-400 font-bold uppercase">{label}</p>
    <p className="text-xl font-black text-slate-800">{value}</p>
  </div>
);

export default Profile;
