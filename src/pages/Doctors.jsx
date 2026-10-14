import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Stethoscope, Star, Calendar, Loader2 } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

const DOCTORS_LIST = [
  { id: 1, name: "Dr. Elena Rostova", dept: "Cardiology", exp: "14 yrs", rating: 4.9, days: "Mon - Fri" },
  { id: 2, name: "Dr. Marcus Chen", dept: "Neurology", exp: "11 yrs", rating: 4.8, days: "Mon, Wed, Fri" },
  { id: 3, name: "Dr. Rachel Adams", dept: "Orthopedics", exp: "16 yrs", rating: 4.9, days: "Tue - Sat" },
  { id: 4, name: "Dr. Aisha Patel", dept: "Pediatrics", exp: "9 yrs", rating: 4.7, days: "Mon - Thu" },
  { id: 5, name: "Dr. Nathan Cole", dept: "Cardiology", exp: "8 yrs", rating: 4.6, days: "Wed - Sun" },
  { id: 6, name: "Dr. Sarah Al-Mansoor", dept: "Neurology", exp: "12 yrs", rating: 4.9, days: "Tue - Fri" }
];

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [specialty, setSpecialty] = useState(searchParams.get("dept") || "All");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Sync state to query parameters
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.query = debouncedSearch;
    if (specialty !== "All") params.dept = specialty;
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, specialty, setSearchParams]);

  // Simulate remote API search loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, [debouncedSearch, specialty]);

  const filteredDoctors = DOCTORS_LIST.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesDept = specialty === "All" || doc.dept === specialty;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Medical Specialists Directory</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Search consultants by name or filter by department specialty using URL search params.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search doctor name..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <select
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="All">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {/* List Rendering */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-cyan-600">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500">No doctors match your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doc => (
            <div
              key={doc.id}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-3 bg-cyan-50 dark:bg-slate-900 text-cyan-600 rounded-xl">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {doc.rating}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{doc.name}</h3>
                <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-2">{doc.dept}</p>
                <p className="text-xs text-slate-500 mb-1">Clinical Experience: {doc.exp}</p>
                <p className="text-xs text-slate-500">Available: {doc.days}</p>
              </div>

              <Link
                to={`/appointments?doctor=${encodeURIComponent(doc.name)}&department=${encodeURIComponent(doc.dept)}`}
                className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-cyan-600 hover:text-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-center text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Consultation
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}