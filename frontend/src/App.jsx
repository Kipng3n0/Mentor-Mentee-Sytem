import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/PrivateRoute";

import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import MenteeAppointment from "./pages/mentee/MenteeAppointment";
import Achievement from "./pages/mentee/Achievement";
import Feedback from "./pages/mentee/Feedback";

import MentorDashboard from "./pages/mentor/MentorDashboard";
import YourMentee from "./pages/mentor/YourMentee";
import SelectMentee from "./pages/mentor/SelectMentee";
import MentorAppointment from "./pages/mentor/MentorAppointment";
import MenteesAchievement from "./pages/mentor/MenteesAchievement";
import ViewFeedback from "./pages/mentor/ViewFeedback";
import ViewAppointment from "./components/Appointments/ViewAppointment";
import ViewAchievements from "./components/Achievements/ViewAchievements";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------ Mentor Routes ------------------- */}
        <Route
          path="/mentor/dashboard"
          element={
            <PrivateRoute role="mentor">
              <MentorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/selectMentee"
          element={
            <PrivateRoute role="mentor">
              <SelectMentee />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/yourMentee"
          element={
            <PrivateRoute role="mentor">
              <YourMentee />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/appointments"
          element={
            <PrivateRoute role="mentor">
              <MentorAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/achievements"
          element={
            <PrivateRoute role="mentor">
              <MenteesAchievement />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/view-appointments"
          element={
            <PrivateRoute role="mentor">
              <ViewAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentor/feedback"
          element={
            <PrivateRoute role="mentor">
              <ViewFeedback />
            </PrivateRoute>
          }
        />

        {/* ------------------- Mentee Routes ------------------- */}
        <Route
          path="/mentee/dashboard"
          element={
            <PrivateRoute role="mentee">
              <MenteeDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentee/appointments"
          element={
            <PrivateRoute role="mentee">
              <MenteeAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentee/achievements"
          element={
            <PrivateRoute role="mentee">
              <Achievement />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentee/view-appointments"
          element={
            <PrivateRoute role="mentee">
              <ViewAppointment />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentee/view-achievements"
          element={
            <PrivateRoute role="mentee">
              <ViewAchievements />
            </PrivateRoute>
          }
        />

        <Route
          path="/mentee/feedback"
          element={
            <PrivateRoute role="mentee">
              <Feedback />
            </PrivateRoute>
          }
        />

        {/* ---------------- Default Route ---------------- */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10">HARE KRISHNA (frontend)</div>
          }
        />
      </Routes>
    </div>
    
  );
};

export default App;
