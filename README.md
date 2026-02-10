# 🌐 NoteNest — Student Resource Hub

<p align="center">
  <b>Upload • Share • Learn • Grow 🚀</b><br/>
  A modern student platform for sharing Notes & PYQs with real-time updates.
</p>

---

## ✨ Overview

**NoteNest** is a modern student platform where college students can upload, share, and access study materials like Notes and PYQs in a structured way.

Built using **React + Firebase + Cloudinary**, it provides:

✅ Real-time updates  
✅ Admin moderation system  
✅ Secure Google Authentication  
✅ Clean modern UI  

---

## 🚀 Live Features

### 👨‍🎓 Student Side

- 📚 Upload Notes & Previous Year Questions
- ⭐ Real-time profile stats (Uploads & Points)
- 🏆 Hall of Fame Leaderboard
- 🎯 Grade Predictor
- 🧭 Stream & Year based study materials
- 🔐 Secure Google Login

---

### 🛡️ Admin Dashboard

- ✅ Review & approve uploads
- ❌ Reject unwanted submissions
- 🪙 Auto reward points to contributors
- 📂 Manage study materials
- 🧑‍🏫 Syllabus Admin Panel

---

## ☁️ Backend & Integrations

- 🔥 Firebase Authentication
- 📡 Firestore Real-Time Database
- ☁️ Cloudinary PDF Storage
- 🧠 Role-based Access Control

---

## 🧰 Tech Stack

| Frontend | Backend | Storage |
|---|---|---|
| React (Vite) | Firebase Auth | Cloudinary |
| Tailwind CSS | Firestore DB |  |
| React Router |  |  |
| Lucide Icons |  |  |

---

## 📁 Project Structure

src/
├── pages/
│ ├── StudyMaterials.jsx
│ ├── Profile.jsx
│ ├── AdminDashboard.jsx
│ ├── HallOfFame.jsx
│ └── Contact.jsx
├── context/
│ └── AppContext.jsx
├── utils/
│ └── cloudinaryUpload.js
└── firebase.js
