import mongoose from "mongoose";

// Feedback Schema
const feedbackSchema = new mongoose.Schema(
  {
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: [true, "Mentee ID is required"],
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: [true, "Mentor ID is required"],
    },
    text: {
      type: String,
      required: [true, "Feedback text is required"],
      maxlength: [1000, "Feedback text cannot exceed 1000 characters"],
      
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Index for optimized sorting by creation date
    },
  },
  { timestamps: true }
);

// Create Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
