import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { HeartPulse, Brain, Bone, Baby, Shield } from "lucide-react";

export const departmentData = {
  cardiology: {
    name: "Cardiology & Vascular",
    icon: HeartPulse,
    head: "Dr. Elena Rostova, MD, FACC",
    desc: "Comprehensive diagnostic catheterization, angioplasty, electrophysiology, and open-heart surgical therapies.",
    beds: 42,
    procedures: ["Coronary Angiography", "Echocardiogram", "Pacemaker Implantation"]
  },
  neurology: {
    name: "Neurology & Brain Sciences",
    icon: Brain,
    head: "Dr. Marcus Chen, MD, PhD",
    desc: "Advanced acute ischemic stroke therapies, epilepsy mapping, neuromuscular diagnostic clinic, and brain tumor resections.",
    beds: 35,
    procedures: ["EEG & Brain Mapping", "Stroke Interventions", "Spine Decompression"]
  },
  orthopedics: {
    name: "Orthopedics & Joint Care",
    icon: Bone,
    head: "Dr. Rachel Adams, MS Ortho",
    desc: "Minimally invasive arthroscopic repairs, robotic total knee/hip replacements, and sports injury rehabilitation.",
    beds: 50,
    procedures: ["Robotic Knee Replacement", "ACL Reconstruction", "Rotator Cuff Repair"]
  },
  pediatrics: {
    name: "Pediatrics & Neonatal Care",
    icon: Baby,
    head: "Dr. Aisha Patel, MD",
    desc: "Level IV Neonatal Intensive Care Unit (NICU), pediatric cardiology, and comprehensive infant wellness clinics.",
    beds: 28,
    procedures: ["Neonatal ICU Care", "Pediatric Vaccination", "Childhood Asthma Management"]
  }
};

export default function Departments() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Clinical Departments</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Select a department to view specialized facilities, doctors, and treatments (Nested Sub-routes).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Department Nav List */}
        <div className="space-y-2">
          {Object.entries(departmentData).map(([slug, data]) => {
            const Icon = data.icon;
            return (
              <NavLink
                key={slug}
                to={`/departments/${slug}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3.5 rounded-xl border text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-600 border-cyan-600 text-white shadow-md"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-cyan-400"
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{data.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Nested Content Outlet */}
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}