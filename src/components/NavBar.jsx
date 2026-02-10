// src/components/NavBar.jsx
import React, { useState } from "react";
import {
  Feather,
  Home,
  BookOpen,
  GraduationCap,
  Calculator,
  LayoutGrid,
  Trophy,
  Upload,
  Info,
  Mail,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, handleLogout } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // ⭐ FIXED ROUTES (changed /studymaterials → /library)
  let primaryNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/library", label: "Study Materials", icon: BookOpen },
    { path: "/courses", label: "Courses", icon: GraduationCap },
    { path: "/predictor", label: "Predictor", icon: Calculator },
  ];

  if (user?.role === "admin") {
    primaryNavItems = [
      { path: "/admin", label: "Dashboard", icon: LayoutGrid },
      { path: "/library", label: "Library View", icon: BookOpen },
    ];
  }

  const secondaryNavItems = [
    { path: "/hall-of-fame", label: "Hall of Fame", icon: Trophy },
    { path: "/contribute", label: "Contribute", icon: Upload },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="w-full flex justify-between items-center h-16 px-4">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => go(user?.role === "admin" ? "/admin" : "/")}
        >
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
            <Feather className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Note<span className="text-indigo-600">Nest</span>
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-2">
          {primaryNavItems.map((item, i) => (
            <button
              key={i}
              onClick={() => go(item.path)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* PROFILE */}
          {user && (
            <button
              onClick={() => go("/profile")}
              className="hidden md:flex items-center gap-3 pl-2 pr-4 py-1 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-slate-100"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  user.role === "admin" ? "bg-red-500" : "bg-indigo-600"
                }`}
              >
                {user.name?.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold">{user.name.split(" ")[0]}</p>
                <p className="text-[10px] text-slate-500">
                  {user.role === "admin" ? "Admin" : "Student"}
                </p>
              </div>
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* MOBILE MENU */}
          {isMenuOpen && (
            <div className="absolute right-4 top-16 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2">

              <div className="lg:hidden">
                <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase">Main</p>

                {primaryNavItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => go(item.path)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100"
                  >
                    <item.icon size={16} /> {item.label}
                  </button>
                ))}

                <hr className="my-2 border-slate-200" />
              </div>

              <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase">More</p>

              {secondaryNavItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => go(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100"
                >
                  <item.icon size={16} /> {item.label}
                </button>
              ))}

              <hr className="my-2 border-slate-200" />

              <button
                onClick={() => {
                  handleLogout();
                  go("/");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;









































//  
