import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackForm = ({ submitFeedback }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission loading
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to handle successful submission message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackText) {
      return alert("Please provide feedback.");
    }

    const formData = { text: feedbackText };

    try {
      setIsSubmitting(true);
      await submitFeedback(formData);
      setFeedbackSubmitted(true); // Show success message
      setFeedbackText(""); // Reset fields after successful submission
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4">
      <form className="space-y-4 bg-zinc-800 p-4 md:p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="feedback" className="block text-sm md:text-base font-medium text-white mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-700 text-white rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Share your thoughts about your mentor..."
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-purple-500 text-black hover:text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
