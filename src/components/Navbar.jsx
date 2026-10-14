import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Activity, Sun, Moon, Calendar, PhoneCall, Stethoscope } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const linkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium text-sm transition-all ${
      isActive
        ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-slate-800 font-semibold"
        : "text-slate-600 dark:text-slate-300 hover:text-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-600 text-white shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            Pulse<span className="text-cyan-600">Care</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkStyle}>Home</NavLink>
          <NavLink to="/departments" className={linkStyle}>Departments</NavLink>
          <NavLink to="/doctors" className={linkStyle}>Find Doctors</NavLink>
          <NavLink to="/appointments" className={linkStyle}>Appointments</NavLink>
          <NavLink to="/contact" className={linkStyle}>Emergency & Contact</NavLink>
          <NavLink to="/profile" className={linkStyle}>Patient EHR</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <Link
            to="/appointments"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-sm"
          >
            <Calendar className="w-4 h-4" /> Book Visit
          </Link>
        </div>
      </div>
    </header>
  );
}