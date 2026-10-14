import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

// Pages
import Home from "./pages/Home";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <ThemeProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Nested Routing Implementation */}
                <Route path="/departments" element={<Departments />}>
                  <Route index element={<Navigate to="cardiology" replace />} />
                  <Route path=":deptId" element={<DepartmentDetail />} />
                </Route>

                <Route path="/doctors" element={<Doctors />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </BrowserRouter>
      </AppointmentProvider>
    </ThemeProvider>
  );
}