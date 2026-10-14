import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppointmentContext = createContext();

const initialState = {
  appointments: JSON.parse(localStorage.getItem("pulsecare_appointments")) || [
    {
      id: "APT-101",
      patientName: "Sarah Jenkins",
      department: "Cardiology",
      doctorName: "Dr. Elena Rostova",
      date: "2026-10-20",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      id: "APT-102",
      patientName: "James Wilson",
      department: "Neurology",
      doctorName: "Dr. Marcus Chen",
      date: "2026-10-22",
      time: "02:15 PM",
      status: "Pending"
    }
  ],
  toast: null
};

function appointmentReducer(state, action) {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [action.payload, ...state.appointments],
        toast: { type: "success", message: "Appointment booked successfully!" }
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map(apt =>
          apt.id === action.payload.id ? { ...apt, ...action.payload } : apt
        ),
        toast: { type: "info", message: "Appointment updated successfully!" }
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(apt => apt.id !== action.payload),
        toast: { type: "error", message: "Appointment cancelled." }
      };
    case "CLEAR_TOAST":
      return { ...state, toast: null };
    default:
      return state;
  }
}

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  useEffect(() => {
    localStorage.setItem("pulsecare_appointments", JSON.stringify(state.appointments));
  }, [state.appointments]);

  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toast]);

  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);