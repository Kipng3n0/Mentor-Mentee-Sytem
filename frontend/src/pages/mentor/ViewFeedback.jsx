// ViewFeedback.jsx
import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackView from "../../components/feedback/FeedbackView"; // Adjust the path based on your directory structure

const ViewFeedback = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for navigation */}
      <Sidebar role="mentor" />

      {/* Main content area */}
      <div className="flex-grow flex flex-col p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px]">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold mb-[50px]
        ..
        ">View Feedback</h1>

        {/* FeedbackView Component in a scrollable container */}
        <div className="flex-grow">
          <FeedbackView />
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
