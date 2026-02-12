// src/pages/AuthPage.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const {
    authMode,
    setAuthMode,
    authError,
    handleAuth,         // admin login
    handleGoogleLogin,  // google login
  } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl border border-slate-200 rounded-3xl w-full max-w-md p-8 relative">

        {/* Header */}
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-8">
          Welcome to <span className="text-indigo-600">NoteNest</span>
        </h2>

        {/* Toggle Buttons */}
        <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMode("student")}
            className={`py-2 font-semibold rounded-lg transition-all ${
              authMode === "student"
                ? "bg-white shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setAuthMode("admin")}
            className={`py-2 font-semibold rounded-lg transition-all ${
              authMode === "admin"
                ? "bg-white shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Error Message */}
        {authError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
            <AlertCircle size={16} />
            {authError}
          </div>
        )}

        {/* ---------------- STUDENT LOGIN (GOOGLE) ---------------- */}
        {authMode === "student" && (
          <>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl py-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">
              Use your verified Google account to log in securely.
            </p>
          </>
        )}

        {/* ---------------- ADMIN LOGIN (FORM) ---------------- */}
        {authMode === "admin" && (
          <form onSubmit={handleAuth} className="space-y-4 mt-2">

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="xyz@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl 
                             focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl 
                             focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 
                         transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              Login as Admin <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
