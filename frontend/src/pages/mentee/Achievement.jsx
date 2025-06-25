// Achievement.js
import React from "react";
import Sidebar from "../../components/Sidebar"; // Adjust path as per your file structure
import AddAchievement from "../../components/Achievements/AddAchievement"; // Import AddAchievement component

const Achievement = () => {
  return (
    <div className="flex">
      {/* Sidebar for mentee */}
      <Sidebar role="mentee" />
      
      {/* Main content area */}
      <div className="flex-grow p-6 pl-4 flex justify-center text-white bg-black border-l-4 border-purple-700 rounded-l-[50px]">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-[30px] translate-y-[20px] font2 font-bold mb-6">Achievements</h1>
        
          {/* Add Achievement Component */}
          <AddAchievement />
        </div>
      </div>
    </div>
  );
};

export default Achievement;
