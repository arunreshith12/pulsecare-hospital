import React, { useState, useEffect } from "react";
import { User, Activity, FileText, Heart, Shield, RefreshCw } from "lucide-react";

export default function Profile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demonstrate REST API Integration using public JSONPlaceholder
  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Patient Electronic Health Record (EHR)</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Synchronized with remote patient identity API service.</p>
        </div>
        <button
          onClick={fetchPatientData}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Reload Record
        </button>
      </div>

      {loading || !patient ? (
        <div className="p-16 text-center text-slate-500">Loading patient identity records...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
            <div className="w-20 h-20 bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
              {patient.name.charAt(0)}
            </div>
            <h3 className="text-lg font-bold">{patient.name}</h3>
            <p className="text-xs text-slate-500">{patient.email}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-left text-xs space-y-2">
              <p><strong>Phone:</strong> {patient.phone}</p>
              <p><strong>City:</strong> {patient.address.city}</p>
              <p><strong>Insurance ID:</strong> INS-899420-US</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-500" /> Blood Pressure</p>
                <p className="text-xl font-bold mt-2">120/80 <span className="text-xs font-normal text-slate-400">mmHg</span></p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-500" /> Heart Rate</p>
                <p className="text-xl font-bold mt-2">72 <span className="text-xs font-normal text-slate-400">bpm</span></p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-500" /> Blood Group</p>
                <p className="text-xl font-bold mt-2">O <span className="text-xs font-normal text-slate-400">Positive</span></p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-600" /> Recent Lab Diagnoses
              </h4>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 flex justify-between">
                  <span>Comprehensive Metabolic Panel (CMP)</span>
                  <strong className="text-emerald-500">Normal</strong>
                </li>
                <li className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 flex justify-between">
                  <span>Lipid Panel & Cholesterol</span>
                  <strong className="text-cyan-600">Review Required</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}