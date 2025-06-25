import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments, updateAppointmentStatus } from '../../api/appointmentApi';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Get the current user's role (mentor/mentee)
  const userId = localStorage.getItem('userId'); // Get the current user's ID (mentor/mentee)

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    getAppointments();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleBack = () => {
    if (userRole === 'mentor') {
      navigate('/mentor/appointments');
    } else if (userRole === 'mentee') {
      navigate('/mentee/appointments');
    } else {
      navigate('/'); // Default fallback
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="p-6 max-w-md mx-auto border-2 border-yellow-500 translate-y-[100px] bg-zinc-900 rounded-3xl">
        <button
          onClick={handleBack}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
        >
          Back
        </button>
        <h2 className="text-2xl font-semibold mt-4">Your Appointments</h2>
        <div className="mt-4 max-h-80 overflow-y-auto">
          <ul className="space-y-4">
            {appointments.map((appointment) => {
              // Check if the current user is the receiver (mentor or mentee)
              const isReceiver = userRole === 'mentor' ? appointment.menteeId === userId : appointment.mentorId === userId;

              return (
                <li key={appointment._id} className="p-4 bg-zinc-700 rounded-lg">
                  <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                  {appointment.status === 'Pending' && isReceiver && (
                    <div className="space-x-4 mt-2">
                      <button
                        onClick={() => handleAction(appointment._id, 'Accepted')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(appointment._id, 'Rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
