import React, { useState, useEffect } from "react";
import {
  fetchAppointments,
  cancelAppointment,
  updateAppointmentStatus,
} from "../../api/appointmentApi";
import Sidebar from "../../components/Sidebar";

const MenteeDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("accessToken");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time for accurate date-only comparison

        const upcomingAppointments = data
          .filter((appointment) => {
            const apptDate = new Date(appointment.date);
            apptDate.setHours(0, 0, 0, 0);
            return apptDate >= today;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by soonest

        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    getAppointments();
  }, []);

  const getRelativeDate = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diff = date.getTime() - today.getTime();

    if (diff === 0) return "Today";
    if (diff === 86400000) return "Tomorrow";
    return date.toLocaleDateString();
  };

  const handleAction = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };
  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
      );
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-auto">
        <Sidebar role="mentee" />
      </div>
      <div className="flex-1 p-4 md:p-8 text-white bg-black border-t-4 md:border-t-0 md:border-l-4 border-purple-700 md:rounded-l-[50px] overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font2 font-bold mb-4">
          ............Good Things Come from Good Things
        </h1>
        <h1 className="text-2xl md:text-3xl font2 font-bold mb-4">
          Welcome, <span className="text-pink-400">Mentee!</span>
        </h1>
        <div className="p-4 md:p-6 rounded-3xl shadow-md mb-6 bg-black">
          <h2 className="text-xl md:text-2xl font2 font-semibold mb-4">
            Upcoming Appointments
          </h2>

          {appointments.length === 0 ? (
            <p className="text-blue-700">No upcoming appointments available.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 bg-zinc-700 rounded-3xl border border-yellow-500"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>
                      <strong>Date:</strong> {getRelativeDate(appointment.date)}
                    </p>
                    <p>
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <p>
                      <strong>Mentor:</strong>{" "}
                      {appointment.sender_id !== userId
                        ? appointment.SenderUser?.email || "No email"
                        : "N/A"}
                    </p>

                    <p>
                      <strong>Reason:</strong> {appointment.reason}
                    </p>
                    <p>
                      <strong>Status:</strong> {appointment.status}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    {appointment.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleAction(appointment.id, "Accepted")
                          }
                          className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAction(appointment.id, "Rejected")
                          }
                          className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {appointment.status === "Accepted" && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="w-full md:w-auto bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
