import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  
  

  const streams = [
    { name: "CSE", icon: "💻", desc: "Core CS, DSA & Development" },
    { name: "AI/ML", icon: "🤖", desc: "AI, ML, Neural Nets" },
    { name: "Data Science", icon: "📊", desc: "Data, Analytics & ML" },
    { name: "ECE", icon: "🔌", desc: "Circuits & Electronics" },
    { name: "Mechanical", icon: "⚙️", desc: "Machines & Design" },
    { name: "IT", icon: "📡", desc: "Software & Systems" },
  ];

  return (
    <div className="w-full color">

      <div className="text-center py-20">
        <h1 className="text-5xl font-extrabold">
          Welcome to Note<span className="text-indigo-600">Nest</span>
        </h1>

        <p className="text-slate-500 mt-4 text-lg max-w-3xl mx-auto">
          A smart platform to access high-quality study notes, previous year
          papers, CGPA tools, and community-driven academic resources.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/studymaterials")}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Explore Library
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"
          >
            Upload Notes
          </button>
        </div>
      </div>

      <div className="px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Streams
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {streams.map((s) => (
            <div
              key={s.name}
              onClick={() =>
                navigate("/studymaterials", { state: { stream: s.name } })
              }
              className="cursor-pointer bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition border"
            >
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{s.name}</h3>
              <p className="text-slate-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
