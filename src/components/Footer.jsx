import React from "react";
import { Activity, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Activity className="text-cyan-400" /> PulseCare Health
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Leading hospital care, digital scheduling, certified practitioners, and 24/7 critical trauma center.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Emergency Care</h4>
          <p className="text-xs flex items-center gap-2 text-rose-400 font-medium">
            <ShieldAlert className="w-4 h-4" /> Hotline: +1 (800) 911-PULSE
          </p>
          <p className="text-xs mt-2">Trauma Center Open 24/7/365</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1.5 text-xs">
            <li>Cardiology & Cath Labs</li>
            <li>Neurological ICU</li>
            <li>Pediatric Outpatient</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Accreditation</h4>
          <p className="text-xs">JCI & NABH Accredited Medical Center.</p>
          <p className="text-[11px] mt-4 text-slate-500">
            © {new Date().getFullYear()} PulseCare Inc. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}