// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Download } from "lucide-react";

// // STREAMS
// const STREAMS = [
//   { id: "cse", name: "CSE" },
//   { id: "aiml", name: "AI/ML" },
//   { id: "ds", name: "Data Science" },
//   { id: "ece", name: "ECE" },
//   { id: "me", name: "Mechanical" },
//   { id: "it", name: "IT" },
// ];

// // REAL FILE LINKS (BASED ON YOUR GITHUB STRUCTURE)
// const DATA = {
//   cse: {
//     "1": {
//       notes: [
//         {
//           title: "C Programming – Handwritten Notes",
//           author: "Admin",
//           size: "1.8 MB",
//           date: "2024-04-10",
//           url: "/uploads/1st-year/cprog.pdf",
//         },
//         {
//           title: "Engineering Physics – Unit 1 & 2",
//           author: "Riddhi Sharma",
//           size: "1.2 MB",
//           date: "2024-04-15",
//           url: "/uploads/1st-year/physics_unit1.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "C Programming PYQ 2023",
//           author: "Admin",
//           size: "900 KB",
//           date: "2023-12-11",
//           url: "/uploads/1st-year/cprog_pyq.pdf",
//         },
//       ],
//     },
//   },

//   aiml: {
//     "1": {
//       notes: [
//         {
//           title: "AI Basics – Notes",
//           author: "Admin",
//           size: "2.1 MB",
//           date: "2024-03-22",
//           url: "/uploads/1st-year/aibasics.pdf",
//         },
//         {
//           title: "ML – Unit 1",
//           author: "Neha Singh",
//           size: "1.5 MB",
//           date: "2024-04-01",
//           url: "/uploads/1st-year/ml_unit1.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "AI PYQ 2023",
//           author: "Admin",
//           size: "780 KB",
//           date: "2023-12-05",
//           url: "/uploads/1st-year/ai_pyq_2023.pdf",
//         },
//       ],
//     },
//   },

//   ds: {
//     "1": {
//       notes: [
//         {
//           title: "Probability for DS",
//           author: "Ankit Verma",
//           size: "1.4 MB",
//           date: "2024-03-14",
//           url: "/uploads/1st-year/probability.pdf",
//         },
//         {
//           title: "Statistics for DS",
//           author: "Admin",
//           size: "2.0 MB",
//           date: "2024-02-28",
//           url: "/uploads/1st-year/statistics.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "DS PYQ 2022",
//           author: "Admin",
//           size: "650 KB",
//           date: "2022-12-10",
//           url: "/uploads/1st-year/ds_pyq_2022.pdf",
//         },
//       ],
//     },
//   },

//   ece: {
//     "1": {
//       notes: [
//         {
//           title: "Basic Electronics",
//           author: "Karan Ahuja",
//           size: "1.3 MB",
//           date: "2024-03-09",
//           url: "/uploads/1st-year/electronics.pdf",
//         },
//         {
//           title: "Circuit Theory – Unit 1",
//           author: "Admin",
//           size: "1.7 MB",
//           date: "2024-03-22",
//           url: "/uploads/1st-year/circuit_unit1.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "ECE PYQ 2021",
//           author: "Admin",
//           size: "700 KB",
//           date: "2021-12-03",
//           url: "/uploads/1st-year/ece_pyq_2021.pdf",
//         },
//       ],
//     },
//   },

//   me: {
//     "1": {
//       notes: [
//         {
//           title: "Engineering Mechanics",
//           author: "Admin",
//           size: "1.9 MB",
//           date: "2024-02-20",
//           url: "/uploads/1st-year/mechanics.pdf",
//         },
//         {
//           title: "Thermodynamics – Unit 1",
//           author: "Shivangi Rao",
//           size: "1.4 MB",
//           date: "2024-03-10",
//           url: "/uploads/1st-year/thermo_unit1.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "Mechanical PYQ 2023",
//           author: "Admin",
//           size: "750 KB",
//           date: "2023-12-08",
//           url: "/uploads/1st-year/me_pyq_2023.pdf",
//         },
//       ],
//     },
//   },

//   it: {
//     "1": {
//       notes: [
//         {
//           title: "Web Development Basics",
//           author: "Admin",
//           size: "2.2 MB",
//           date: "2024-02-28",
//           url: "/uploads/1st-year/webdev.pdf",
//         },
//         {
//           title: "Networking – Unit 1",
//           author: "Riddhi Sharma",
//           size: "1.1 MB",
//           date: "2024-03-14",
//           url: "/uploads/1st-year/network_unit1.pdf",
//         },
//       ],
//       pyq: [
//         {
//           title: "IT PYQ 2022",
//           author: "Admin",
//           size: "710 KB",
//           date: "2022-12-12",
//           url: "/uploads/1st-year/it_pyq_2022.pdf",
//         },
//       ],
//     },
//   },
// };

// export default function Library() {
//   const location = useLocation();
//   const q = new URLSearchParams(location.search);

//   const [stream, setStream] = useState(q.get("stream") || "cse");
//   const [year, setYear] = useState("1");
//   const [type, setType] = useState("notes");

//   const list = DATA[stream]?.[year]?.[type] || [];

//   return (
//     <div className="w-full flex flex-col gap-10">

//       {/* STREAM SELECTOR */}
//       <div className="flex flex-wrap justify-center gap-3 px-4">
//         {STREAMS.map((s) => (
//           <button
//             key={s.id}
//             onClick={() => setStream(s.id)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold border 
//               ${stream === s.id ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}
//           >
//             {s.name}
//           </button>
//         ))}
//       </div>

//       {/* YEAR SELECTOR */}
//       <div className="flex flex-wrap justify-center gap-3 px-4">
//         {["1", "2", "3", "4"].map((y) => (
//           <button
//             key={y}
//             onClick={() => setYear(y)}
//             className={`px-5 py-2 rounded-full text-sm font-semibold border 
//               ${year === y ? "bg-slate-900 text-white" : "bg-white text-slate-700 border-slate-300"}`}
//           >
//             {y} Year
//           </button>
//         ))}
//       </div>

//       {/* TYPE SELECTOR */}
//       <div className="flex flex-wrap justify-center gap-3 px-4">
//         <button
//           onClick={() => setType("notes")}
//           className={`px-5 py-2 rounded-full text-sm font-semibold border 
//             ${type === "notes" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}
//         >
//           Notes 📘
//         </button>

//         <button
//           onClick={() => setType("pyq")}
//           className={`px-5 py-2 rounded-full text-sm font-semibold border 
//             ${type === "pyq" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border-slate-300"}`}
//         >
//           PYQs 📚
//         </button>
//       </div>

//       {/* FILE CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-5xl mx-auto pb-20">
//         {list.map((item, i) => (
//           <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm hover:shadow-md">
//             <h2 className="font-bold text-lg">{item.title}</h2>

//             <div className="flex flex-wrap justify-between mt-2 text-xs text-slate-600">
//               <span>👤 {item.author}</span>
//               <span>{item.size}</span>
//               <span>📅 {item.date}</span>
//             </div>

//             {/* DOWNLOAD BUTTON */}
//             <a
//               href={item.url}
//               download
//               target="_blank"
//               className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl 
//                 text-center font-medium flex items-center justify-center gap-2 hover:bg-indigo-700"
//             >
//               <Download size={16} /> View / Download
//             </a>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }
