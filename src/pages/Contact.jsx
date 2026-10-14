import React, { useState, useRef } from "react";
import { Phone, Mail, MapPin, Send, AlertTriangle } from "lucide-react";

export default function Contact() {
  const nameRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,14}$/;

    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!emailRegex.test(formData.email)) errs.email = "Please enter a valid email address";
    if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) errs.phone = "Enter a valid 10-14 digit telephone number";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      nameRef.current?.focus(); // Focus input using useRef
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Emergency Support & Inquiries</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Demonstrating <code>useRef</code> input focus and RegEx client-side form validation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold mb-2">
              <AlertTriangle className="w-5 h-5" /> Urgent Emergency
            </div>
            <p className="text-xs text-rose-600 dark:text-rose-300 mb-3">
              For acute cardiac arrests, trauma, or severe injury, contact ambulance dispatch immediately.
            </p>
            <p className="text-xl font-extrabold text-rose-600">+1 (800) 911-PULSE</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-cyan-600 w-5 h-5" />
              <span>contact@pulsecarehospital.org</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-cyan-600 w-5 h-5" />
              <span>742 Evergreen Medical Blvd, Health City</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
              <h3 className="text-xl font-bold">Message Dispatched!</h3>
              <p className="text-sm text-slate-500">Our patient coordinator will call you back within 15 minutes.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-700 rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Your Full Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1234567890"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Inquiry / Medical Query</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="State your symptoms or question..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Dispatch Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}