// src/pages/Contact.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Contact = () => {
  // 🔥 FORM STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        firstName,
        lastName,
        email,
        message,
        createdAt: new Date(),
      });

      alert("Message Sent! We will get back to you shortly.");

      // reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 py-10">
      {/* LEFT SIDE */}
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-500">
            Have a question, suggestion, or just want to say hi? We'd love to
            hear from you.
          </p>
        </div>

        <div className="space-y-6">
          <InfoCard icon={<Mail size={24} />} title="Email Us" text="riddhi9892jaiswal@gmail.com" bg="bg-blue-50" color="text-blue-600" />
          <InfoCard icon={<Phone size={24} />} title="Call Us" text="+91 ******" bg="bg-green-50" color="text-green-600" />
          <InfoCard icon={<MapPin size={24} />} title="Visit Us" text="BBD University Campus, Lucknow" bg="bg-orange-50" color="text-orange-600" />
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <InputGroup label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            <InputGroup label="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
          </div>

          <InputGroup
            label="Email Address"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2">
            Send Message <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, text, bg, color }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
    <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-900">{title}</p>
      <p className="text-slate-500">{text}</p>
    </div>
  </div>
);

const InputGroup = ({ label, type = "text", value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default Contact;
