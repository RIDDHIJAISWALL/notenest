import React, { useState } from "react";
import { BookOpen, ExternalLink, Youtube } from "lucide-react";

// =================== FULL AKTU COURSE STRUCTURE ===================

const AKTU_COURSES = {
  "1st Year": {
    courses: {
      Common: {
        subjects: [
          {
            name: "Programming for Problem Solving (C)",
            units: [
              { title: "Unit 1: Fundamentals of C", yt: "https://www.youtube.com/playlist?list=PL49mRA0Y_C8vQV1h4YVtGUQGu4BQY6hrv", docs: "https://www.geeksforgeeks.org/c-language-set-1-introduction/" },
              { title: "Unit 2: Control Statements", yt: "https://www.youtube.com/playlist?list=PL49mRA0Y_C8vQV1h4YVtGUQGu4BQY6hrv", docs: "https://www.geeksforgeeks.org/decision-making-c-c-else-nested-else/" },
              { title: "Unit 3: Arrays & Strings", yt: "https://www.youtube.com/playlist?list=PL49mRA0Y_C8vQV1h4YVtGUQGu4BQY6hrv", docs: "https://www.geeksforgeeks.org/arrays-in-c-cpp/" },
              { title: "Unit 4: Functions & Pointers", yt: "https://www.youtube.com/playlist?list=PL49mRA0Y_C8vQV1h4YVtGUQGu4BQY6hrv", docs: "https://www.geeksforgeeks.org/functions-in-c/" },
              { title: "Unit 5: Structures & File Handling", yt: "https://www.youtube.com/playlist?list=PL49mRA0Y_C8vQV1h4YVtGUQGu4BQY6hrv", docs: "https://www.geeksforgeeks.org/structures-c/" },
            ],
          },
        ],
      },
    },
  },

  "2nd Year": {
     courses: {
      "CSE , AIML , IT and DATA SCIENCE": {
        subjects: [
          {
            name: "Data Structures",
            units: [
              { title: "Unit 1: Arrays & Recursion", yt: "https://www.youtube.com/watch?v=RBSGKlAvoiM", docs: "https://www.geeksforgeeks.org/data-structures/" },
              { title: "Unit 2: Stack & Queue", yt: "https://www.youtube.com/watch?v=GYptUgnIM_I", docs: "https://www.geeksforgeeks.org/stack-data-structure/" },
              { title: "Unit 3: Linked List", yt: "https://www.youtube.com/watch?v=njTh_OwMljA", docs: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
              { title: "Unit 4: Trees", yt: "https://www.youtube.com/watch?v=oSWTXtMglKE", docs: "https://www.geeksforgeeks.org/tree-data-structure/" },
              { title: "Unit 5: Graphs", yt: "https://www.youtube.com/watch?v=pcKY4hjDrxk", docs: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            ],
          },
        ],
      },


      
      ECE: {
        subjects: [
          {
            name: "Analog Electronics",
            units: [
              { title: "Unit 1: Diodes", yt: "https://www.youtube.com/watch?v=9G3G1cXb0Xw", docs: "https://www.geeksforgeeks.org/diodes/" },
              { title: "Unit 2: Transistors", yt: "https://www.youtube.com/watch?v=E1w9XJj5D6k", docs: "https://www.geeksforgeeks.org/transistor/" },
              { title: "Unit 3: Amplifiers", yt: "https://www.youtube.com/watch?v=9_cXQWz5B6g", docs: "https://www.geeksforgeeks.org/amplifiers/" },
              { title: "Unit 4: Oscillators", yt: "https://www.youtube.com/watch?v=czjWg4bPp6s", docs: "https://www.geeksforgeeks.org/oscillators/" },
              { title: "Unit 5: Power Amplifiers", yt: "https://www.youtube.com/watch?v=9K0g4pYpKJ4", docs: "https://www.geeksforgeeks.org/power-amplifier/" },
            ],
          },
        ],
      },

      ME: {
        subjects: [
          {
            name: "Thermodynamics",
            units: [
              { title: "Unit 1: Basics", yt: "https://www.youtube.com/watch?v=V1eY3z5bX5o", docs: "https://www.geeksforgeeks.org/thermodynamics/" },
              { title: "Unit 2: First Law", yt: "https://www.youtube.com/watch?v=3U6j8kz5b1o", docs: "https://www.geeksforgeeks.org/first-law-of-thermodynamics/" },
              { title: "Unit 3: Second Law", yt: "https://www.youtube.com/watch?v=Z4bX5z5bX5o", docs: "https://www.geeksforgeeks.org/second-law-of-thermodynamics/" },
              { title: "Unit 4: Entropy", yt: "https://www.youtube.com/watch?v=Y5bX5z5bX5o", docs: "https://www.geeksforgeeks.org/entropy-in-thermodynamics/" },
              { title: "Unit 5: Cycles", yt: "https://www.youtube.com/watch?v=9rX0fXyZP7M", docs: "https://www.geeksforgeeks.org/refrigeration-cycle/" },
            ],
          },
        ],
      },
    },
  },

  "3rd Year": {
    courses: {
      CSE: {
        subjects: [
          {
            name: "Operating System",
            units: [
              { title: "Unit 1: Introduction", yt: "https://www.youtube.com/watch?v=RozoeWzT7IM", docs: "https://www.geeksforgeeks.org/operating-systems/" },
              { title: "Unit 2: Process", yt: "https://www.youtube.com/watch?v=Yf9j9kGzLxI", docs: "https://www.geeksforgeeks.org/process-management/" },
              { title: "Unit 3: Memory", yt: "https://www.youtube.com/watch?v=YkO5e7kzjP4", docs: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" },
              { title: "Unit 4: File System", yt: "https://www.youtube.com/watch?v=1s7bZ3g0GXY", docs: "https://www.geeksforgeeks.org/file-system-operating-system/" },
              { title: "Unit 5: I/O", yt: "https://www.youtube.com/watch?v=9v5WZ6xY2kE", docs: "https://www.geeksforgeeks.org/io-management-in-os/" },
            ],
          },
        ],
      },

      IT: {
        subjects: [
          {
            name: "Data Structures",
            units: [
              { title: "Unit 1: Arrays & Recursion", yt: "https://www.youtube.com/watch?v=RBSGKlAvoiM", docs: "https://www.geeksforgeeks.org/data-structures/" },
              { title: "Unit 2: Stack & Queue", yt: "https://www.youtube.com/watch?v=GYptUgnIM_I", docs: "https://www.geeksforgeeks.org/stack-data-structure/" },
              { title: "Unit 3: Linked List", yt: "https://www.youtube.com/watch?v=njTh_OwMljA", docs: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
              { title: "Unit 4: Trees", yt: "https://www.youtube.com/watch?v=oSWTXtMglKE", docs: "https://www.geeksforgeeks.org/tree-data-structure/" },
              { title: "Unit 5: Graphs", yt: "https://www.youtube.com/watch?v=pcKY4hjDrxk", docs: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            ],
          },
        ],
      },

      DS: {
        subjects: [
          {
            name: "Data Structures",
            units: [
              { title: "Unit 1: Arrays & Recursion", yt: "https://www.youtube.com/watch?v=RBSGKlAvoiM", docs: "https://www.geeksforgeeks.org/data-structures/" },
              { title: "Unit 2: Stack & Queue", yt: "https://www.youtube.com/watch?v=GYptUgnIM_I", docs: "https://www.geeksforgeeks.org/stack-data-structure/" },
              { title: "Unit 3: Linked List", yt: "https://www.youtube.com/watch?v=njTh_OwMljA", docs: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
              { title: "Unit 4: Trees", yt: "https://www.youtube.com/watch?v=oSWTXtMglKE", docs: "https://www.geeksforgeeks.org/tree-data-structure/" },
              { title: "Unit 5: Graphs", yt: "https://www.youtube.com/watch?v=pcKY4hjDrxk", docs: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            ],
          },
        ],
      },

      ECE: {
        subjects: [
          {
            name: "Digital Signal Processing",
            units: [
              { title: "Unit 1: Signals", yt: "https://www.youtube.com/watch?v=2iU9Sx0pYb8", docs: "https://www.geeksforgeeks.org/signals-and-systems/" },
              { title: "Unit 2: LTI Systems", yt: "https://www.youtube.com/watch?v=z0lC5HcR9tw", docs: "https://www.geeksforgeeks.org/lti-system/" },
              { title: "Unit 3: Fourier", yt: "https://www.youtube.com/watch?v=spUNpyF58BY", docs: "https://www.geeksforgeeks.org/fourier-transform/" },
              { title: "Unit 4: Z Transform", yt: "https://www.youtube.com/watch?v=K5d6j2g8KfA", docs: "https://www.geeksforgeeks.org/z-transform/" },
              { title: "Unit 5: DFT", yt: "https://www.youtube.com/watch?v=mkGsMWi_j4Q", docs: "https://www.geeksforgeeks.org/discrete-fourier-transform/" },
            ],
          },
        ],
      },

      ME: {
        subjects: [
          {
            name: "Heat Transfer",
            units: [
              { title: "Unit 1: Conduction", yt: "https://www.youtube.com/watch?v=9h8pG5zF8l0", docs: "https://www.geeksforgeeks.org/heat-conduction/" },
              { title: "Unit 2: Convection", yt: "https://www.youtube.com/watch?v=7u7A2S0xXKs", docs: "https://www.geeksforgeeks.org/convection-heat-transfer/" },
              { title: "Unit 3: Radiation", yt: "https://www.youtube.com/watch?v=4y7z8M5xA7A", docs: "https://www.geeksforgeeks.org/radiation-heat-transfer/" },
              { title: "Unit 4: Heat Exchanger", yt: "https://www.youtube.com/watch?v=5MZ9X7p7l0k", docs: "https://www.geeksforgeeks.org/heat-exchanger/" },
              { title: "Unit 5: Applications", yt: "https://www.youtube.com/watch?v=Kx4E2t7n5xM", docs: "https://www.geeksforgeeks.org/heat-transfer-applications/" },
            ],
          },
        ],
      },

      AIML: {
        subjects: [
          {
            name: "Structural Analysis",
            units: [
              { title: "Unit 1: Determinate Structures", yt: "https://www.youtube.com/watch?v=1K6PpH6tF3s", docs: "https://www.geeksforgeeks.org/structural-analysis/" },
              { title: "Unit 2: Indeterminate", yt: "https://www.youtube.com/watch?v=6b6r4m0m3yQ", docs: "https://www.geeksforgeeks.org/indeterminate-structures/" },
              { title: "Unit 3: Energy Method", yt: "https://www.youtube.com/watch?v=3ZKp1FQ7D1A", docs: "https://www.geeksforgeeks.org/energy-method/" },
              { title: "Unit 4: Influence Lines", yt: "https://www.youtube.com/watch?v=5s9M8GkP6bM", docs: "https://www.geeksforgeeks.org/influence-line-diagrams/" },
              { title: "Unit 5: Moving Loads", yt: "https://www.youtube.com/watch?v=2x5s9X7P8mM", docs: "https://www.geeksforgeeks.org/moving-loads/" },
            ],
          },
        ],
      },
    },
  },

  "4th Year": {
    courses: {
      CSE: {
        subjects: [
          {
            name: "Machine Learning",
            units: [
              { title: "Unit 1: Intro", yt: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", docs: "https://www.geeksforgeeks.org/machine-learning/" },
              { title: "Unit 2: Regression", yt: "https://www.youtube.com/watch?v=E5RjzSK0fvY", docs: "https://www.geeksforgeeks.org/regression-in-machine-learning/" },
              { title: "Unit 3: Classification", yt: "https://www.youtube.com/watch?v=7eh4d6sabA0", docs: "https://www.geeksforgeeks.org/classification-algorithms/" },
              { title: "Unit 4: Clustering", yt: "https://www.youtube.com/watch?v=4b5d3muPQmA", docs: "https://www.geeksforgeeks.org/clustering-in-machine-learning/" },
              { title: "Unit 5: Neural Networks", yt: "https://www.youtube.com/watch?v=aircAruvnKk", docs: "https://www.geeksforgeeks.org/neural-networks-a-beginners-guide/" },
            ],
          },
        ],
      },
IT: {
        subjects: [
          {
            name: "Data Structures",
            units: [
              { title: "Unit 1: Arrays & Recursion", yt: "https://www.youtube.com/watch?v=RBSGKlAvoiM", docs: "https://www.geeksforgeeks.org/data-structures/" },
              { title: "Unit 2: Stack & Queue", yt: "https://www.youtube.com/watch?v=GYptUgnIM_I", docs: "https://www.geeksforgeeks.org/stack-data-structure/" },
              { title: "Unit 3: Linked List", yt: "https://www.youtube.com/watch?v=njTh_OwMljA", docs: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
              { title: "Unit 4: Trees", yt: "https://www.youtube.com/watch?v=oSWTXtMglKE", docs: "https://www.geeksforgeeks.org/tree-data-structure/" },
              { title: "Unit 5: Graphs", yt: "https://www.youtube.com/watch?v=pcKY4hjDrxk", docs: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            ],
          },
        ],
      },

      DS: {
        subjects: [
          {
            name: "Data Structures",
            units: [
              { title: "Unit 1: Arrays & Recursion", yt: "https://www.youtube.com/watch?v=RBSGKlAvoiM", docs: "https://www.geeksforgeeks.org/data-structures/" },
              { title: "Unit 2: Stack & Queue", yt: "https://www.youtube.com/watch?v=GYptUgnIM_I", docs: "https://www.geeksforgeeks.org/stack-data-structure/" },
              { title: "Unit 3: Linked List", yt: "https://www.youtube.com/watch?v=njTh_OwMljA", docs: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
              { title: "Unit 4: Trees", yt: "https://www.youtube.com/watch?v=oSWTXtMglKE", docs: "https://www.geeksforgeeks.org/tree-data-structure/" },
              { title: "Unit 5: Graphs", yt: "https://www.youtube.com/watch?v=pcKY4hjDrxk", docs: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            ],
          },
        ],
      },

      ECE: {
        subjects: [
          {
            name: "Analog Electronics",
            units: [
              { title: "Unit 1: Diodes", yt: "https://www.youtube.com/watch?v=9G3G1cXb0Xw", docs: "https://www.geeksforgeeks.org/diodes/" },
              { title: "Unit 2: Transistors", yt: "https://www.youtube.com/watch?v=E1w9XJj5D6k", docs: "https://www.geeksforgeeks.org/transistor/" },
              { title: "Unit 3: Amplifiers", yt: "https://www.youtube.com/watch?v=9_cXQWz5B6g", docs: "https://www.geeksforgeeks.org/amplifiers/" },
              { title: "Unit 4: Oscillators", yt: "https://www.youtube.com/watch?v=czjWg4bPp6s", docs: "https://www.geeksforgeeks.org/oscillators/" },
              { title: "Unit 5: Power Amplifiers", yt: "https://www.youtube.com/watch?v=9K0g4pYpKJ4", docs: "https://www.geeksforgeeks.org/power-amplifier/" },
            ],
          },
        ],
      },

      ME: {
        subjects: [
          {
            name: "Thermodynamics",
            units: [
              { title: "Unit 1: Basics", yt: "https://www.youtube.com/watch?v=V1eY3z5bX5o", docs: "https://www.geeksforgeeks.org/thermodynamics/" },
              { title: "Unit 2: First Law", yt: "https://www.youtube.com/watch?v=3U6j8kz5b1o", docs: "https://www.geeksforgeeks.org/first-law-of-thermodynamics/" },
              { title: "Unit 3: Second Law", yt: "https://www.youtube.com/watch?v=Z4bX5z5bX5o", docs: "https://www.geeksforgeeks.org/second-law-of-thermodynamics/" },
              { title: "Unit 4: Entropy", yt: "https://www.youtube.com/watch?v=Y5bX5z5bX5o", docs: "https://www.geeksforgeeks.org/entropy-in-thermodynamics/" },
              { title: "Unit 5: Cycles", yt: "https://www.youtube.com/watch?v=9rX0fXyZP7M", docs: "https://www.geeksforgeeks.org/refrigeration-cycle/" },
            ],
          },
        ],
      },

      AIML: {
        subjects: [
          {
            name: "Strength of Materials",
            units: [
              { title: "Unit 1: Stress & Strain", yt: "https://www.youtube.com/watch?v=6M6Wk7P8S1M", docs: "https://www.geeksforgeeks.org/stress-and-strain/" },
              { title: "Unit 2: Bending", yt: "https://www.youtube.com/watch?v=AxY7m7p8cA8", docs: "https://www.geeksforgeeks.org/bending-stress/" },
              { title: "Unit 3: Torsion", yt: "https://www.youtube.com/watch?v=2dWQfF8C68o", docs: "https://www.geeksforgeeks.org/torsion/" },
              { title: "Unit 4: Deflection", yt: "https://www.youtube.com/watch?v=7h4Z7k6g9RM", docs: "https://www.geeksforgeeks.org/beam-deflection/" },
              { title: "Unit 5: Columns", yt: "https://www.youtube.com/watch?v=0Dk1z0vC9qA", docs: "https://www.geeksforgeeks.org/columns/" },
            ],
          },
        ],
      },
      
    },
  },
};

// =================== COMPONENT ===================

export default function Courses() {
  const [year, setYear] = useState("1st Year");
  const [course, setCourse] = useState("Common");

  const years = Object.keys(AKTU_COURSES);
  const courses = Object.keys(AKTU_COURSES[year].courses);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-xl text-white">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <BookOpen size={38} /> AKTU Courses Hub
        </h1>
        <p className="text-white/80 mt-2">
          Full AKTU Syllabus + Unit-wise Best Videos & Docs
        </p>
      </div>

      {/* Year Selector */}
      <div className="flex justify-center gap-4 mt-10 flex-wrap">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => {
              setYear(y);
              setCourse(Object.keys(AKTU_COURSES[y].courses)[0]);
            }}
            className={`px-6 py-2 rounded-xl font-semibold ${
              year === y ? "bg-indigo-600 text-white" : "bg-white border"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Course Selector */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {courses.map((c) => (
          <button
            key={c}
            onClick={() => setCourse(c)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold ${
              course === c ? "bg-purple-600 text-white" : "bg-white border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Subjects */}
      <div className="mt-12 space-y-10">
        {AKTU_COURSES[year].courses[course].subjects.map((sub, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6">{sub.name}</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sub.units.map((u, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 hover:shadow transition"
                >
                  <h3 className="font-semibold">{u.title}</h3>

                  <div className="flex gap-3 mt-4">
                    <a
                      href={u.yt}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <Youtube size={18} /> Video
                    </a>

                    <a
                      href={u.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-slate-800 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} /> Docs
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
