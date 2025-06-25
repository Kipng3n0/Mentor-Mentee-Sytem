import React, { useEffect, useState } from "react";
import { fetchFeedbacksForMentor } from "../../api/feedbackApi.js";

const FeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedbacksForMentor();
        console.log(data);
        // Ensure data is an array before setting it to feedbacks
        setFeedbacks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900 shadow-lg rounded-3xl overflow-hidden">
      <div className="p-4 border-b text-white">
        <h2 className="text-2xl font-bold text-center">Feedback Received</h2>
      </div>

      {/* Scrollable content */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="p-4 border border-purple-500 rounded-xl shadow-sm bg-zinc-700 hover:bg-zinc-800 transition"
            >
              <p className="font-semibold text-white mb-1">
                Mentee: {feedback.mentee?.username || "Anonymous"}
              </p>
              <p className="text-blue-500">
                <span className="font-semibold">Feedback:</span> {feedback.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;
