import React from "react";
import Sidebar from "../../components/Sidebar";
import FeedbackForm from "../../components/feedback/FeedbackForm";
import { submitFeedback } from "../../api/feedbackApi"; // Import API function

const Feedback = () => {
  return (
    <div className="flex">
      <Sidebar role="mentee" />
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px]">
        <h1 className="text-[30px] font-bold font2 translate-y-[20px] ">Submit Feedback</h1>
        <p className="text-blue-600 translate-y-[40px]">
          Share your thoughts and experience with your mentor. Your feedback helps us improve the mentoring experience.
        </p>

        <FeedbackForm submitFeedback={submitFeedback} />
      </div>
    </div>
  );
};

export default Feedback;
