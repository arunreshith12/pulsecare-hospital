import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useAppointments } from "../context/AppointmentContext";

export default function Toast() {
  const { state } = useAppointments();
  if (!state.toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-cyan-500" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 animate-slide-up">
      {icons[state.toast.type] || icons.info}
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
        {state.toast.message}
      </span>
    </div>
  );
}