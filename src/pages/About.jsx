// src/pages/About.jsx
import React from "react";
import { BookOpen, Search, Trophy } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Smart Library",
      desc: "Access thousands of curated notes organized by year and subject.",
    },
    {
      icon: <Search size={32} />,
      title: "Smart Organization",
      desc: "Instantly find the exact document you need with our advanced tagging and search.",
    },
    {
      icon: <Trophy size={32} />,
      title: "Gamified Learning",
      desc: "Earn recognition for your contributions and climb the leaderboard.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-16 py-10">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          Empowering{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Student Success
          </span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          NoteNest is an intelligent ecosystem designed to bridge the gap
          between academic resources and student results. We believe in the
          power of shared knowledge.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
