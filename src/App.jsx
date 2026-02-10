// src/App.jsx
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ReviewModal from "./components/ReviewModal";

// Modal (PDF + Chat)
import SplitView from "./components/SplitViewWrapper";

// Pages
import Home from "./pages/Home";
// ❌ import Library from "./pages/Library"; // not used anymore
import StudyMaterials from "./pages/StudyMaterials";

import Upload from "./pages/Upload";
import AdminDashboard from "./pages/AdminDashboard";
import Predictor from "./pages/Predictor";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";

// ⭐ NEW PAGES
import HallOfFame from "./pages/HallOfFame";
import Contribute from "./pages/Contribute";

export default function App() {
  const { user, selectedNote } = useAppContext();

  // ============= NOT LOGGED IN =============
  if (!user) {
    return <AuthPage />;
  }

  // ============= LOGGED-IN LAYOUT =============
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <NavBar />

      <main className="flex-1 w-full py-8 px-4 md:px-8">
        <Routes>

          {/* ---------- STUDENT ROUTES ---------- */}
          {user.role === "student" && (
    <>
      <Route path="/" element={<Home />} />

      {/* STUDY MATERIAL PAGE */}
      <Route path="/library" element={<StudyMaterials />} />
      <Route path="/studymaterials" element={<StudyMaterials />} />


      {/* OTHER ROUTES */}
      <Route path="/upload" element={<Upload />} />
      <Route path="/predictor" element={<Predictor />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />

      {/* EXTRA FEATURES */}
      <Route path="/hall-of-fame" element={<HallOfFame />} />
      <Route path="/contribute" element={<Contribute />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
)}


          {/* ---------- ADMIN ROUTES ---------- */}
          {user.role === "admin" && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          )}

        </Routes>
      </main>

      <Footer />

      {/* PDF + Chat View */}
      {selectedNote && <SplitView />}

      {/* Admin Review Modal */}
      <ReviewModal />
    </div>
  );
}
