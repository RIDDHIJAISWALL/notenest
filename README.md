🌐 NoteNest — Student Resource Hub

NoteNest is a modern student platform where college students can upload, share, and access study materials like Notes and PYQs in a structured way.
Built using React + Firebase + Cloudinary, it provides real-time updates, admin moderation, and a clean UI.

✨ Features
👨‍🎓 Student Side

Upload Notes & Previous Year Questions (PYQs)

Real-time profile stats (uploads & points)

Hall of Fame leaderboard

Grade Predictor

Course resources by Stream & Year

Secure Google Login

🛡️ Admin Dashboard

Review & approve uploads

Reject unwanted submissions

Auto reward points to users

Manage study materials

Syllabus Admin Panel

☁️ Backend Features

Firebase Authentication

Firestore Real-Time Database

Cloudinary PDF storage

Role-based access (Admin / Student)

🧰 Tech Stack

⚛️ React (Vite)

🎨 Tailwind CSS

🔥 Firebase (Auth + Firestore)

☁️ Cloudinary

🧭 React Router

🧩 Lucide Icons

STRUCTURE
src/
 ├── pages/
 │    ├── StudyMaterials.jsx
 │    ├── Profile.jsx
 │    ├── AdminDashboard.jsx
 │    ├── HallOfFame.jsx
 │    └── Contact.jsx
 ├── context/
 │    └── AppContext.jsx
 ├── utils/
 │    └── cloudinaryUpload.js
 └── firebase.js
