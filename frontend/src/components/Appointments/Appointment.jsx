import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitAppointment } from "../../api/appointmentApi";
import axios from "axios";

const Appointment = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    mentee: "",
    mentor: "",
  });
  const [assignedMentees, setAssignedMentees] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const accessToken = localStorage.getItem("accessToken");

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (e) {
      return null;
    }
  };

  const userId = accessToken ? parseJwt(accessToken)?.id : null;

  useEffect(() => {
    if (userRole === "mentor" && userId) {
      axios
        .get(
          `${import.meta.env.VITE_API_BASE_URL}/appointments/assigned-mentees`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          const mentees = Array.isArray(response.data) ? response.data : [];
          setAssignedMentees(mentees);
        })
        .catch((error) => {
          console.error("Error fetching mentees:", error);
          setAssignedMentees([]);
        });
    } else if (userRole === "mentee" && userId) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/appointments/mentor`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) =>
          setFormData((prev) => ({ ...prev, mentor: response.data._id }))
        )
        .catch((error) => console.error("Error fetching mentor:", error));
    }
  }, [userRole, userId, accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userRole === "mentor") {
        if (!formData.mentee) {
          setStatusMessage("Please select a mentee.");
          return;
        }
        // Handle "Select All Mentees" logic
        if (formData.mentee === "all") {
          const appointments = assignedMentees.map((mentee) => ({
            ...formData,
            mentee: mentee._id,
          }));
          await Promise.all(
            appointments.map((appointment) => submitAppointment(appointment))
          );
          setStatusMessage(
            "Appointments successfully submitted for all mentees!"
          );
        } else {
          await submitAppointment(formData);
          setStatusMessage("Appointment successfully submitted!");
        }
      } else {
        await submitAppointment(formData);
        setStatusMessage("Appointment successfully submitted!");
      }
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleViewAppointments = () => {
    navigate(
      userRole === "mentor"
        ? "/mentor/view-appointments"
        : "/mentee/view-appointments"
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto translate-y-6 border-2 border-yellow-500 bg-zinc-700 rounded-3xl">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Schedule <span className="text-pink-500">an</span> Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 bg-zinc-500 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border bg-zinc-500 rounded-lg"
            required
          />
        </div>
        {userRole === "mentor" && (
          <div>
            <label className="block text-white">Select Mentee</label>
            <select
              name="mentee"
              value={formData.mentee}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
              required
            >
              <option value="">Select a mentee</option>
              <option value="all">All Mentees</option>
              {assignedMentees.map((mentee) => (
                <option key={mentee._id} value={mentee._id}>
                  {mentee.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={handleViewAppointments}
            className="bg-yellow-500 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            View Appointments
          </button>
          <button
            type="submit"
            className="bg-purple-500 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>
      {statusMessage && <p className="mt-4 text-blue-400">{statusMessage}</p>}
    </div>
  );
};

export default Appointment;
