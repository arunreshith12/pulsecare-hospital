import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Calendar, Users, Award, ArrowRight } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Certified Specialists", value: "140+" },
    { label: "Emergency Beds", value: "350" },
    { label: "Annual Surgeries", value: "12,000+" },
    { label: "Patient Satisfaction", value: "99.4%" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white dark:from-slate-900 dark:to-slate-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300 mb-6">
            <ShieldCheck className="w-4 h-4" /> JCI Certified Super-Specialty Hospital
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Advanced Clinical Care, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
              Personalized for Every Patient
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Book rapid outpatient appointments, consult board-certified surgeons, and access complete EHR health records seamlessly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/appointments"
              className="px-6 py-3.5 rounded-xl font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/25 flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" /> Book an Appointment
            </Link>
            <Link
              to="/departments"
              className="px-6 py-3.5 rounded-xl font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              Explore Departments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">{s.value}</p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}