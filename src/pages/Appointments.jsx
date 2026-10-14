import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppointments } from "../context/AppointmentContext";
import { Calendar, Trash2, Edit3, Plus, X } from "lucide-react";

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useAppointments();

  // Form State
  const [formData, setFormData] = useState({
    patientName: "",
    department: searchParams.get("department") || "Cardiology",
    doctorName: searchParams.get("doctor") || "Dr. Elena Rostova",
    date: "",
    time: "09:00 AM"
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = "Patient name is required";
    if (!formData.date) errs.date = "Appointment date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingId) {
      dispatch({
        type: "UPDATE_APPOINTMENT",
        payload: { id: editingId, ...formData }
      });
      setEditingId(null);
    } else {
      dispatch({
        type: "ADD_APPOINTMENT",
        payload: {
          id: `APT-${Math.floor(100 + Math.random() * 900)}`,
          status: "Confirmed",
          ...formData
        }
      });
    }

    setFormData({
      patientName: "",
      department: "Cardiology",
      doctorName: "Dr. Elena Rostova",
      date: "",
      time: "09:00 AM"
    });
  };

  const handleEdit = (apt) => {
    setEditingId(apt.id);
    setFormData({
      patientName: apt.patientName,
      department: apt.department,
      doctorName: apt.doctorName,
      date: apt.date,
      time: apt.time
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Patient Appointment Management</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Demonstrates complete client-side <strong>CRUD</strong> operations using React <code>useReducer</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking / Editing Form (Create & Update) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-600" />
              {editingId ? "Edit Appointment" : "Schedule New Visit"}
            </h3>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ patientName: "", department: "Cardiology", doctorName: "Dr. Elena Rostova", date: "", time: "09:00 AM" });
                }}
                className="text-xs text-rose-500 flex items-center gap-1 font-semibold"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Patient Full Name</label>
              <input
                type="text"
                value={formData.patientName}
                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {errors.patientName && <p className="text-xs text-rose-500 mt-1">{errors.patientName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Cardiology" className="dark:bg-slate-800">Cardiology</option>
                <option value="Neurology" className="dark:bg-slate-800">Neurology</option>
                <option value="Orthopedics" className="dark:bg-slate-800">Orthopedics</option>
                <option value="Pediatrics" className="dark:bg-slate-800">Pediatrics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Doctor Name</label>
              <input
                type="text"
                value={formData.doctorName}
                onChange={e => setFormData({ ...formData, doctorName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Time Slot</label>
                <select
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="09:00 AM" className="dark:bg-slate-800">09:00 AM</option>
                  <option value="11:30 AM" className="dark:bg-slate-800">11:30 AM</option>
                  <option value="02:00 PM" className="dark:bg-slate-800">02:00 PM</option>
                  <option value="04:30 PM" className="dark:bg-slate-800">04:30 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-cyan-600/20"
            >
              {editingId ? "Update Appointment" : "Confirm Booking"}
            </button>
          </form>
        </div>

        {/* Appointment Records Table / List (Read & Delete) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Appointments ({state.appointments.length})</h3>

          {state.appointments.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500">No appointments scheduled.</p>
            </div>
          ) : (
            state.appointments.map(apt => (
              <div
                key={apt.id}
                className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-medium">
                      {apt.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {apt.department} • {apt.doctorName}
                  </p>
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                    📅 {apt.date || "Date Pending"} at ⏰ {apt.time}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleEdit(apt)}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => dispatch({ type: "DELETE_APPOINTMENT", payload: apt.id })}
                    className="p-2 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    title="Cancel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}