import React from "react";
import Sidebar from "../../components/Sidebar";
import Appointment from "../../components/Appointments/Appointment"; // Import the Appointment component

const MentorAppointment = () => {
  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px]">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold">Mentor Appointments</h1>
        <div>
          <Appointment /> {/* Include the Appointment component here */}
        </div>
      </div>
    </div>
  );
};

export default MentorAppointment;
