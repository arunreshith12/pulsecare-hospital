import React from "react";
import { useParams, Link } from "react-router-dom";
import { departmentData } from "./Departments";
import { Stethoscope, Bed, CheckCircle2, Calendar } from "lucide-react";

export default function DepartmentDetail() {
  const { deptId } = useParams();
  const department = departmentData[deptId || "cardiology"];

  if (!department) {
    return (
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500">Please select a valid department from the left menu.</p>
      </div>
    );
  }

  const Icon = department.icon;

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 rounded-xl">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{department.name}</h3>
          <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Head of Department: {department.head}</p>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{department.desc}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Bed className="text-cyan-600 w-5 h-5" />
          <span className="text-sm font-medium">Dedicated Beds: <strong>{department.beds}</strong></span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <Stethoscope className="text-cyan-600 w-5 h-5" />
          <span className="text-sm font-medium">Outpatient Consultations: Daily</span>
        </div>
      </div>

      <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Key Surgical & Diagnostic Procedures:</h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
        {department.procedures.map((p, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {p}
          </li>
        ))}
      </ul>

      <Link
        to={`/appointments?department=${encodeURIComponent(department.name)}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm"
      >
        <Calendar className="w-4 h-4" /> Book with this Department
      </Link>
    </div>
  );
}