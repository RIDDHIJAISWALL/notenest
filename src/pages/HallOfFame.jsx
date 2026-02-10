// src/pages/HallOfFame.jsx
import React, { useEffect, useState } from "react";
import { Trophy, Medal, Star } from "lucide-react";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function HallOfFame() {
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    // 🔥 REAL TIME LISTENER
    const q = query(
      collection(db, "users"),     // your firestore collection
      orderBy("points", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let rank = 1;

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        rank: rank++,
        name: doc.data().name,
        score: doc.data().points || 0,
        uploads: doc.data().uploads || 0,
        avatar:
          doc.data().avatar ||
          `https://ui-avatars.com/api/?name=${doc.data().name}&background=4f46e5&color=fff`,
        badge:
          doc.data().points >= 150
            ? "Champion"
            : doc.data().points >= 120
            ? "Master"
            : doc.data().points >= 100
            ? "Expert"
            : "Contributor",
      }));

      // ⭐ ADD 3 EXAMPLE STUDENTS (fallback/demo)
      const demoStudents = [
        {
          id: "demo1",
          rank: data.length + 1,
          name: "Demo Student",
          score: 90,
          uploads: 2,
          avatar:
            "https://ui-avatars.com/api/?name=Demo+Student&background=a5b4fc&color=fff",
          badge: "Contributor",
        },
        {
          id: "demo2",
          rank: data.length + 2,
          name: "Example User",
          score: 80,
          uploads: 1,
          avatar:
            "https://ui-avatars.com/api/?name=Example+User&background=c7d2fe&color=000",
          badge: "Rising Star",
        },
        {
          id: "demo3",
          rank: data.length + 3,
          name: "NoteNest Hero",
          score: 70,
          uploads: 1,
          avatar:
            "https://ui-avatars.com/api/?name=NoteNest+Hero&background=e0e7ff&color=000",
          badge: "Helper",
        },
      ];

      setTopStudents([...data, ...demoStudents]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Trophy size={60} className="text-yellow-500 drop-shadow-lg" />
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Hall of <span className="text-indigo-600">Fame</span>
        </h1>

        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Celebrating top contributors who made NoteNest better for everyone ✨
        </p>
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-2 gap-6">
        {topStudents.map((student) => (
          <div
            key={student.id}
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md border border-slate-200 hover:shadow-lg transition"
          >
            {/* Rank Badge */}
            <div className="flex flex-col items-center">
              {student.rank === 1 ? (
                <Medal size={34} className="text-yellow-500" />
              ) : student.rank === 2 ? (
                <Medal size={34} className="text-gray-400" />
              ) : student.rank === 3 ? (
                <Medal size={34} className="text-amber-700" />
              ) : (
                <Star size={30} className="text-indigo-400" />
              )}
              <p className="font-bold text-sm mt-1">#{student.rank}</p>
            </div>

            {/* Avatar */}
            <img
              src={student.avatar}
              alt={student.name}
              className="w-14 h-14 rounded-full border border-slate-200 shadow-sm"
            />

            {/* Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                {student.name}
              </h3>
              <p className="text-slate-500 text-sm">{student.badge}</p>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-indigo-600 font-semibold">
                  ⭐ {student.score} pts
                </span>
                <span className="text-slate-500">
                  📚 {student.uploads} uploads
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Message */}
      <p className="text-center mt-10 text-slate-500 text-sm">
        Want to be featured? Start uploading notes and collecting points!
      </p>
    </div>
  );
}
