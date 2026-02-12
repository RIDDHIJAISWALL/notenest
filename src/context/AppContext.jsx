import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc ,
  increment, updateDoc 
} from "firebase/firestore";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { query, where } from "firebase/firestore";




import { uploadToCloudinary } from "../utils/cloudinaryUpload";


import { googleLoginPopup } from "../firebase";


/* -----------------------------------------------------------
   COURSE DATA
----------------------------------------------------------- */
export const COURSE_DATA = {
  "1st Year": [
    {
      subject: "C Programming",
      description: "Foundation of programming concepts.",
      topics: [
        {
          name: "Variables & Data Types",
          w3: "https://www.w3schools.com/c/c_variables.php",
          yt: "https://www.youtube.com/results?search_query=c+programming+variables",
        },
        {
          name: "Arrays & Strings",
          w3: "https://www.w3schools.com/c/c_arrays.php",
          yt: "https://www.youtube.com/results?search_query=c+programming+arrays",
        },
        {
          name: "Pointers",
          w3: "https://www.w3schools.com/c/c_pointers.php",
          yt: "https://www.youtube.com/results?search_query=c+programming+pointers",
        },
      ],
    },
  ],
  "2nd Year": [
    {
      subject: "Data Structures",
      description: "Core DSA concepts and implementations.",
      topics: [
        {
          name: "Linked Lists",
          w3: "https://www.w3schools.com/dsa/dsa_data_linkedlists.php",
          yt: "https://www.youtube.com/results?search_query=linked+lists+data+structure",
        },
        {
          name: "Stacks & Queues",
          w3: "https://www.w3schools.com/dsa/dsa_data_stacks.php",
          yt: "https://www.youtube.com/results?search_query=stacks+and+queues",
        },
        {
          name: "Trees & Graphs",
          w3: "https://www.w3schools.com/dsa/dsa_data_trees.php",
          yt: "https://www.youtube.com/results?search_query=trees+and+graphs+dsa",
        },
      ],
    },
  ],
  "3rd Year": [
    {
      subject: "Database Management",
      description: "SQL, NoSQL, transactions & normalization.",
      topics: [
        {
          name: "SQL Syntax",
          w3: "https://www.w3schools.com/sql/",
          yt: "https://www.youtube.com/results?search_query=sql+tutorial",
        },
        {
          name: "Normalization",
          w3: "#",
          yt: "https://www.youtube.com/results?search_query=dbms+normalization",
        },
      ],
    },
  ],
  "4th Year": [
    {
      subject: "Artificial Intelligence",
      description: "Intro to ML, neural networks & AI applications.",
      topics: [
        {
          name: "Neural Networks",
          w3: "#",
          yt: "https://www.youtube.com/results?search_query=neural+networks+explained",
        },
        {
          name: "Machine Learning",
          w3: "https://www.w3schools.com/python/python_ml_getting_started.asp",
          yt: "https://www.youtube.com/results?search_query=machine+learning+basics",
        },
      ],
    },
  ],
};

/* -----------------------------------------------------------
   STREAMS
----------------------------------------------------------- */
export const STREAMS = [
  { id: "CSE", name: "Computer Science (CSE)" },
  { id: "IT", name: "Information Technology" },
  { id: "AI/ML", name: "AI & Machine Learning" },
  { id: "Data Science", name: "Data Science" },
  { id: "ECE", name: "Electronics (ECE)" },
  { id: "Mechanical", name: "Mechanical Engineering" },
];

/* -----------------------------------------------------------
   TRENDING NOTES
----------------------------------------------------------- */
const INITIAL_NOTES = [
  {
    id: 1,
    title: "Advanced DBMS - Unit 3 (Normalization)",
    author: "Ankit Sharma",
    email: "ankit@bbd.ac.in",
    upvotes: 142,
    summary: "Covers 1NF, 2NF, 3NF and BCNF.",
    tags: ["Exam Favorite", "Handwritten"],
    date: "2025-05-12",
    status: "Verified",
    stream: "CSE",
    year: "3rd Year",
  },
  {
    id: 2,
    title: "Operating System - Deadlocks Simplified",
    author: "Priya Verma",
    email: "priya@bbd.ac.in",
    upvotes: 89,
    summary: "Deadlock avoidance & Banker’s Algorithm.",
    tags: ["Concept Heavy"],
    date: "2025-05-10",
    status: "Pending",
    stream: "CSE",
    year: "3rd Year",
  },
];

const INITIAL_USERS = [
  { id: 1, name: "Ankit Sharma", email: "ankit@bbd.ac.in", role: "student" },
  { id: 2, name: "Priya Verma", email: "priya@bbd.ac.in", role: "student" },
];

/* -----------------------------------------------------------
   FIXED STUDY MATERIAL (notes + pyq)
----------------------------------------------------------- */
const DEMO_STUDY_MATERIALS = {
  CSE: {
    "1st Year": {
      notes: [
        { id: 1, title: "C Programming Basics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 2, title: "Engineering Mathematics – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 3, title: "C Programming – PYQ (2023)", url: "#", uploadedBy: "Admin" },
        { id: 4, title: "Maths – PYQ (2022)", url: "#", uploadedBy: "Admin" },
      ],
    },
    "2nd Year": {
      notes: [
        { id: 5, title: "DSA – Notes", url: "#", uploadedBy: "Admin" },
        { id: 6, title: "Java OOP – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 7, title: "DSA – PYQ (2023)", url: "#", uploadedBy: "Admin" },
        { id: 8, title: "Java – PYQ (2022)", url: "#", uploadedBy: "Admin" },
      ],
    },
    "3rd Year": {
      notes: [
        { id: 9, title: "Operating Systems – Notes", url: "#", uploadedBy: "Admin" },
        { id: 10, title: "DBMS – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 11, title: "OS – PYQ (2023)", url: "#", uploadedBy: "Admin" },
        { id: 12, title: "DBMS – PYQ (2022)", url: "#", uploadedBy: "Admin" },
      ],
    },
    "4th Year": {
      notes: [
        { id: 13, title: "Machine Learning – Notes", url: "#", uploadedBy: "Admin" },
        { id: 14, title: "Compiler Design – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 15, title: "ML – PYQ (2023)", url: "#", uploadedBy: "Admin" },
        { id: 16, title: "Compiler – PYQ (2022)", url: "#", uploadedBy: "Admin" },
      ],
    },
  },

  /* ---------------- AI/ML ---------------- */
  "AI/ML": {
    "1st Year": {
      notes: [
        { id: 101, title: "Python Basics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 102, title: "Maths for AI – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 103, title: "Python – PYQ (2023)", url: "#", uploadedBy: "Admin" },
        { id: 104, title: "Maths – PYQ (2022)", url: "#", uploadedBy: "Admin" },
      ],
    },
    "2nd Year": {
      notes: [
        { id: 105, title: "Neural Networks – Notes", url: "#", uploadedBy: "Admin" },
        { id: 106, title: "Probability – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 107, title: "NN – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 108, title: "Probability – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "3rd Year": {
      notes: [
        { id: 109, title: "Deep Learning – Notes", url: "#", uploadedBy: "Admin" },
        { id: 110, title: "Reinforcement Learning – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 111, title: "DL – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 112, title: "RL – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "4th Year": {
      notes: [
        { id: 113, title: "NLP – Notes", url: "#", uploadedBy: "Admin" },
        { id: 114, title: "AI Ethics – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 115, title: "NLP – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 116, title: "AI Ethics – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },
  },

  /* ---------------- DATA SCIENCE ---------------- */
  "Data Science": {
    "1st Year": {
      notes: [
        { id: 201, title: "Intro to Data – Notes", url: "#", uploadedBy: "Admin" },
        { id: 202, title: "Python for DS – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 203, title: "Data – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 204, title: "Python – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "2nd Year": {
      notes: [
        { id: 205, title: "Statistics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 206, title: "SQL – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 207, title: "Statistics – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 208, title: "SQL – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "3rd Year": {
      notes: [
        { id: 209, title: "Machine Learning – Notes", url: "#", uploadedBy: "Admin" },
        { id: 210, title: "Data Mining – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 211, title: "ML – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 212, title: "Data Mining – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "4th Year": {
      notes: [
        { id: 213, title: "Big Data – Notes", url: "#", uploadedBy: "Admin" },
        { id: 214, title: "Cloud Computing – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 215, title: "Big Data – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 216, title: "Cloud – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },
  },

  /* ---------------- ECE ---------------- */
  ECE: {
    "1st Year": {
      notes: [
        { id: 301, title: "Basic Electronics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 302, title: "Maths 1 – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 303, title: "Electronics – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 304, title: "Maths – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "2nd Year": {
      notes: [
        { id: 305, title: "Signals – Notes", url: "#", uploadedBy: "Admin" },
        { id: 306, title: "Digital Logic – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 307, title: "Signals – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 308, title: "Digital Logic – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "3rd Year": {
      notes: [
        { id: 309, title: "Communication Systems – Notes", url: "#", uploadedBy: "Admin" },
        { id: 310, title: "Microprocessors – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 311, title: "Comm Systems – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 312, title: "Microprocessor – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "4th Year": {
      notes: [
        { id: 313, title: "VLSI Design – Notes", url: "#", uploadedBy: "Admin" },
        { id: 314, title: "Embedded Systems – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 315, title: "VLSI – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 316, title: "Embedded – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },
  },

  /* ---------------- MECHANICAL ---------------- */
  Mechanical: {
    "1st Year": {
      notes: [
        { id: 401, title: "Engineering Graphics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 402, title: "Mechanics – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 403, title: "Graphics – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 404, title: "Mechanics – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "2nd Year": {
      notes: [
        { id: 405, title: "Thermodynamics – Notes", url: "#", uploadedBy: "Admin" },
        { id: 406, title: "Fluid Mechanics – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 407, title: "Thermo – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 408, title: "Fluid – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "3rd Year": {
      notes: [
        { id: 409, title: "Heat Transfer – Notes", url: "#", uploadedBy: "Admin" },
        { id: 410, title: "Machine Design – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 411, title: "Heat Transfer – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 412, title: "Machine Design – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },

    "4th Year": {
      notes: [
        { id: 413, title: "Automobile Engineering – Notes", url: "#", uploadedBy: "Admin" },
        { id: 414, title: "Robotics – Notes", url: "#", uploadedBy: "Admin" },
      ],
      pyq: [
        { id: 415, title: "Auto – PYQ 2023", url: "#", uploadedBy: "Admin" },
        { id: 416, title: "Robotics – PYQ 2022", url: "#", uploadedBy: "Admin" },
      ],
    },
  },

  /* ---------------- IT ---------------- */
  IT: {
    "1st Year": {
      notes: [
        { id: 501, title: "IT Fundamentals – Notes" },
        { id: 502, title: "Computer Basics – Notes" },
      ],
      pyq: [
        { id: 503, title: "IT Basics – PYQ 2023" },
        { id: 504, title: "Maths – PYQ 2022" },
      ],
    },

    "2nd Year": {
      notes: [
        { id: 505, title: "Web Development – Notes" },
        { id: 506, title: "DSA for IT – Notes" },
      ],
      pyq: [
        { id: 507, title: "Web Dev – PYQ 2023" },
        { id: 508, title: "DSA – PYQ 2022" },
      ],
    },

    "3rd Year": {
      notes: [
        { id: 509, title: "Cloud Computing – Notes" },
        { id: 510, title: "Cyber Security – Notes" },
      ],
      pyq: [
        { id: 511, title: "Cloud – PYQ 2023" },
        { id: 512, title: "Cyber – PYQ 2022" },
      ],
    },

    "4th Year": {
      notes: [
        { id: 513, title: "Software Engineering – Notes" },
        { id: 514, title: "AI for IT – Notes" },
      ],
      pyq: [
        { id: 515, title: "Software Engg – PYQ 2023" },
        { id: 516, title: "AI – PYQ 2022" },
      ],
    },
  },
};

/* -----------------------------------------------------------
   GITHUB CONFIG
----------------------------------------------------------- */
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || "main";

const AppContext = createContext(null);
export const useAppContext = () => useContext(AppContext);

/* -----------------------------------------------------------
   HELPERS
----------------------------------------------------------- */
const yearToFolder = (year) => {
  switch (year) {
    case "1st Year":
      return "1st-year";
    case "2nd Year":
      return "2nd-year";
    case "3rd Year":
      return "3rd-year";
    case "4th Year":
      return "4th-year";
    default:
      return "others";
  }
};

const formatBytes = (bytes) => {
  if (!bytes || isNaN(bytes)) return "";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = String(result).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/* -----------------------------------------------------------
   PROVIDER
----------------------------------------------------------- */
export const AppProvider = ({ children }) => {
  /* ---------------- AUTH ---------------- */
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("student");
  const [authError, setAuthError] = useState("");

  /* ---------------- MAIN DATA ---------------- */
  const [allNotes, setAllNotes] = useState(INITIAL_NOTES);
  const [allUsers, setAllUsers] = useState(INITIAL_USERS);

  const [selectedNote, setSelectedNote] = useState(null);
  const [reviewNote, setReviewNote] = useState(null);
  const [pendingUploads, setPendingUploads] = useState([]);


  /* ---------------- LIBRARY FILTERS ---------------- */
  const [selectedStream, setSelectedStream] = useState("CSE");
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [resourceType, setResourceType] = useState("notes");
  const [resourceSearch, setResourceSearch] = useState("");
  

 const [studyMaterials, setStudyMaterials] = useState({});



  

  /*--------------------------this is only for me like it will show the locally stored pdf on this device only ..not on others ------------------------
  
  const [studyMaterials, setStudyMaterials] = useState(() => {
  const saved = localStorage.getItem("notenest_materials");
  return saved ? JSON.parse(saved) : DEMO_STUDY_MATERIALS;
});

   useEffect(() => {
  localStorage.setItem("notenest_materials", JSON.stringify(studyMaterials));
}, [studyMaterials]);

  
  
  */




  

// 🔥 STEP 3: Load approved study materials from Firestore
useEffect(() => {
  const fetchStudyMaterials = async () => {
    const snap = await getDocs(collection(db, "study_materials"));
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));

    const structured = {};

    data.forEach(item => {
      if (!structured[item.stream]) structured[item.stream] = {};
      if (!structured[item.stream][item.year]) {
        structured[item.stream][item.year] = { notes: [], pyq: [] };
      }

      const type = item.type === "pyq" ? "pyq" : "notes";
      structured[item.stream][item.year][type].push(item);
    });

    setStudyMaterials(structured);
  };

  fetchStudyMaterials();
}, []);


  useEffect(() => {
  const fetchPendingUploads = async () => {
    const snap = await getDocs(collection(db, "pending_notes"));
    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
    setPendingUploads(data);
  };

  fetchPendingUploads();
}, []);






  /* ---------------- CHAT AI ---------------- */
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything about this note." },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  /* ---------------- CGPA CALCULATOR ---------------- */
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "",
      year: "1st Year",
      internal: "",
      internalMax: 30,
      external: "",
    },
  ]);
  const [cgpaResult, setCgpaResult] = useState(null);

  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        year: "1st Year",
        internal: "",
        internalMax: 30,
        external: "",
      },
    ]);
  };


 const deleteStudyMaterial = async (docId) => {
  try {
    await deleteDoc(doc(db, "study_materials", docId));

    setStudyMaterials((prev) => {
      const updated = structuredClone(prev);

      Object.keys(updated).forEach((stream) => {
        Object.keys(updated[stream]).forEach((year) => {
          ["notes", "pyq"].forEach((type) => {
            updated[stream][year][type] =
              updated[stream][year][type]?.filter(
                (item) => item.id !== docId
              ) || [];
          });
        });
      });

      return updated;
    });

    alert("Deleted successfully 🗑️");
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};


  const handleRemoveSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubjectChange = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const calculateCGPA = () => {
    let totalGP = 0;
    let count = 0;

    subjects.forEach((sub) => {
      const internal = parseFloat(sub.internal);
      const external = parseFloat(sub.external);
      const internalMax = parseFloat(sub.internalMax) || 30;

      if (isNaN(internal) && isNaN(external)) return;

      const normInternal = ((internal || 0) / internalMax) * 30;
      const ext = Math.min(Math.max(external || 0), 70);
      const total = normInternal + ext;

      let gp = 0;
      if (total >= 90) gp = 10;
      else if (total >= 80) gp = 9;
      else if (total >= 70) gp = 8;
      else if (total >= 60) gp = 7;
      else if (total >= 50) gp = 6;
      else if (total >= 40) gp = 5;

      totalGP += gp;
      count++;
    });

    setCgpaResult(count ? (totalGP / count).toFixed(2) : "0.00");
  };

  /* -----------------------------------------------------------
     GITHUB UPLOAD / DELETE
  ----------------------------------------------------------- */
  const canUseGithub =
    GITHUB_TOKEN && GITHUB_USERNAME && GITHUB_REPO ? true : false;

  const uploadFileToGithub = async (file, year) => {
    if (!canUseGithub) {
      return { url: "#", path: null, sha: null };
    }

    const folder = yearToFolder(year);
    const safeName = file.name.replace(/\s+/g, "_");
    const path = `uploads/${folder}/${Date.now()}_${safeName}`;
    const content = await fileToBase64(file);

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${encodeURIComponent(
        path
      )}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Add file ${file.name}`,
          content,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!res.ok) {
      console.error("GitHub upload failed", await res.text());
      throw new Error("GitHub upload error");
    }

    const data = await res.json();
    return {
      url:
        data.content?.download_url ||
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`,
      path: data.content?.path || path,
      sha: data.content?.sha || null,
    };
  };

  const deleteFileFromGithub = async (path, sha) => {
    if (!canUseGithub || !path || !sha) return;

    await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${encodeURIComponent(
        path
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Delete file ${path}`,
          sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );
  };

  /* -----------------------------------------------------------
     ADD OR DELETE LIBRARY MATERIAL
  ----------------------------------------------------------- */
 const addLibraryMaterial = async ({ stream, year, type, title, file }) => {
  if (!user) {
    alert("Please login to upload.");
    return;
  }

  try {
    let fileUrl = null;

    // 🔥 Upload to Cloudinary
    if (file) {
      const uploaded = await uploadToCloudinary(file);
      fileUrl = uploaded.url;
    }

    // 🔥 Save to Firestore (PERMANENT)
    await addDoc(collection(db, "pending_notes"), {
      title,
      stream,
      year,
      type,
      url: fileUrl,
      uploadedBy: user.name,
      createdAt: new Date(),
    });

    alert("Upload sent for admin review ✅");
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed.");
  }
};

      // setStudyMaterials((prev) => ({
      //   ...prev,
      //   [stream]: {
      //     ...prev[stream],
      //     [year]: {
      //       ...prev[stream][year],
      //       [type]: [newItem, ...(prev[stream][year]?.[type] || [])],
      //     },
      //   },
      // }));

      // alert("Upload successful! 🎉");

      

  const deleteLibraryMaterial = async (stream, year, type, id) => {
    setStudyMaterials((prev) => {
      const items = prev[stream]?.[year]?.[type] || [];
      const item = items.find((x) => x.id === id);

      if (item?.source === "github") {
        deleteFileFromGithub(item.path, item.sha);
      }

      return {
        ...prev,
        [stream]: {
          ...prev[stream],
          [year]: {
            ...prev[stream][year],
            [type]: items.filter((x) => x.id !== id),
          },
        },
      };
    });
  };

/*-----------------------              addLibraryMaterial()                  ---------------------------*/
const approveUpload = async (file) => {
  try {
    if (!file.url || file.url === "#") {
      alert("File URL missing. Please re-upload.");
      return;
    }

    const docRef = await addDoc(collection(db, "study_materials"), {
      title: file.title || file.fileName,
      stream: file.stream,
      year: file.year,
      type: file.type || "notes",
      url: file.url,
      uploadedBy: file.author || file.uploadedBy || "Student",
      createdAt: new Date(),
    });

    const newItem = {
      id: docRef.id,
      title: file.title || file.fileName,
      url: file.url,
      uploadedBy: file.author || "Student",
    };

    setStudyMaterials(prev => ({
      ...prev,
      [file.stream]: {
        ...prev[file.stream],
        [file.year]: {
          ...prev[file.stream]?.[file.year],
          notes: [
            newItem,
            ...(prev[file.stream]?.[file.year]?.notes || []),
          ],
        },
      },
    }));

    await deleteDoc(doc(db, "pending_notes", file.id));
    setPendingUploads(prev => prev.filter(p => p.id !== file.id));

    // 🔥🔥🔥 ADD THIS BLOCK HERE
    if (file.userId) {
      await updateDoc(doc(db, "users", file.userId), {
        points: increment(10),
        uploads: increment(1),
      });
    }

    alert("Approved & published ✅");
  } catch (err) {
    console.error("Approve failed:", err);
    alert("Approval failed");
  }
};

  /* -----------------------------------------------------------
     AUTH
  ----------------------------------------------------------- */
  const handleGoogleLogin = async () => {
    try {
      setAuthError("");
      const result = await googleLoginPopup();
      const g = result.user;

      const newUser = {
        id: Date.now(),
        name: g.displayName,
        email: g.email,
        role: "student",
        photo: g.photoURL,
      };

        setUser(newUser);
      localStorage.setItem("notenest_user", JSON.stringify(newUser));
      localStorage.setItem("login_time", Date.now());


      setAllUsers((prev) =>
        prev.some((u) => u.email === newUser.email) ? prev : [...prev, newUser]
      );
    } catch (err) {
      console.error(err);
      setAuthError("Google login failed.");
    }
  };
// --------------------------------
  const handleAuth = async (e) => {
  e.preventDefault();
  setAuthError("");

  const fd = new FormData(e.target);
  const email = fd.get("email");
  const password = fd.get("password");

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const loggedUser = result.user;

    // 🔥 get role from Firestore (SECURE)
    const q = query(collection(db, "users"), where("email", "==", loggedUser.email));
    const snap = await getDocs(q);

    let role = "student";

    if (!snap.empty) {
      role = snap.docs[0].data().role || "student";
    }

    const newUser = {
      id: loggedUser.uid,
      name: loggedUser.displayName || "User",
      email: loggedUser.email,
      role,
    };

    setUser(newUser);
    localStorage.setItem("notenest_user", JSON.stringify(newUser));
    localStorage.setItem("login_time", Date.now());

  } catch (err) {
    setAuthError("Invalid login credentials");
  }
};



  /* -----------------------------------------------------------
     AUTO LOGIN
  ----------------------------------------------------------- */
  useEffect(() => {
  const saved = localStorage.getItem("notenest_user");
  const loginTime = localStorage.getItem("login_time");

  if (saved && loginTime) {
    const diff = Date.now() - Number(loginTime);

    // ⏱ 3 HOURS = 10800000 milliseconds
    if (diff < 10800000) {
      setUser(JSON.parse(saved)); // still logged in
    } else {
      // ❌ logout after 3 hours
      localStorage.removeItem("notenest_user");
      localStorage.removeItem("login_time");
    }
  }
}, []);


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("notenest_user");
  };

  /* -----------------------------------------------------------
     NOTE UPLOAD (old)
  ----------------------------------------------------------- */
  const handleUploadSubmit = async (e, uploadedFile, externalLink) => {
  e.preventDefault();
  if (!user) return;

  const fd = new FormData(e.target);

  const note = {
    title: fd.get("title"),
    summary: fd.get("description"),
    author: user.name,
    email: user.email,
    stream: fd.get("stream"),
    year: fd.get("year"),
    tags: ["New"],
    status: "Pending",
    upvotes: 0,
    date: new Date().toISOString().split("T")[0],
    fileName: uploadedFile?.name || null,
    externalLink: externalLink || null,
  };
  


  await addDoc(collection(db, "pending_notes"), note);

  alert("Upload sent for admin review ✅");
};


    

  

  /* -----------------------------------------------------------
   ADMIN VERIFY → PUBLISH TO LIBRARY
----------------------------------------------------------- */
const handleVerifyNote = async (id) => {
  setAllNotes((prev) =>
    prev.map((n) =>
      n.id === id ? { ...n, status: "Verified" } : n
    )
  );

  const note = allNotes.find((n) => n.id === id);
  if (!note) return;

  // If file exists → publish to library
  if (note.fileName) {
    await addLibraryMaterial({
      stream: note.stream,
      year: note.year,
      type: "notes",
      title: note.title,
      file: null,   // already uploaded
    });
  }

  alert("Approved & Published to Library");
};

  /* -----------------------------------------------------------
     CHATBOT
  ----------------------------------------------------------- */
  const handleSend = () => {
    if (!inputMsg.trim()) return;

    const msg = { sender: "user", text: inputMsg };
    setChatMessages((prev) => [...prev, msg]);
    setInputMsg("");

    setTimeout(
      () =>
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Got it! Let me help…" },
        ]),
      600
    );
  };

  /* -----------------------------------------------------------
     CONTEXT VALUE
  ----------------------------------------------------------- */
  const value = {
    user,
    authMode,
    authError,
    allNotes,
    allUsers,
    selectedNote,
    reviewNote,
    selectedStream,
    selectedYear,
    resourceType,
    resourceSearch,
    studyMaterials,
    chatMessages,
    inputMsg,
    subjects,
    cgpaResult,


    pendingUploads,
    setPendingUploads,
    approveUpload,



    deleteStudyMaterial,

    setAuthMode,
    setSelectedNote,
    setReviewNote,
    setSelectedStream,
    setSelectedYear,
    setResourceType,
    setResourceSearch,
    setInputMsg,

    addLibraryMaterial,
    deleteLibraryMaterial,

    handleGoogleLogin,
    handleAuth,
    handleLogout,
    handleUploadSubmit,
    handleVerifyNote,


    handleSend,
    handleAddSubject,
    handleRemoveSubject,
    handleSubjectChange,
    calculateCGPA,
   
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};