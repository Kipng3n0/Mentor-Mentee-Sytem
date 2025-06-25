import React from "react";
import Sidebar from "../../components/Sidebar";
import Appointment from "../../components/Appointments/Appointment";

const MenteeAppointment = () => {
  return (
    <div className="flex">
      {/* Sidebar for mentee */}
      <Sidebar role="mentee" />
      
      {/* Main content area */}
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px] ">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold mb-6">Mentee Appointments</h1>
        
        {/* Appointment scheduling component */}
        <Appointment />
      </div>
    </div>
  );
};

export default MenteeAppointment;
