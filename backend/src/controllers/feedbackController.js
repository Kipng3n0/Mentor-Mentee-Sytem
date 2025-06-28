import User from "../modelsSQL/User.js";
import Feedback from "../modelsSQL/Feedback.js";

// Create feedback (mentee ➝ mentor)
export const createFeedback = async (req, res) => {
  try {
    const { text, rating } = req.body;

    if (!text || rating === undefined) {
      return res
        .status(400)
        .json({ message: "Feedback text and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    if (!req.user || req.user.role !== "mentee") {
      return res
        .status(403)
        .json({ message: "Access denied. Only mentees can submit feedback." });
    }

    const menteeId = req.user.id;

    // Get mentorId from JWT or fetch from DB if missing
    let mentorId = req.user.mentorId;
    if (!mentorId) {
      const mentee = await User.findByPk(menteeId);
      if (!mentee || !mentee.mentorId) {
        return res
          .status(400)
          .json({ message: "Mentee does not have an assigned mentor." });
      }
      mentorId = mentee.mentorId;
    }

    const feedback = await Feedback.create({
      text,
      rating,
      mentee: menteeId,
      mentor: mentorId,
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all feedback for the logged-in mentor
export const getFeedbacksForMentor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "mentor") {
      return res
        .status(403)
        .json({ message: "Access denied. Only mentors can view feedback." });
    }

    const mentorId = req.user.id;

    const feedbacks = await Feedback.findAll({
      where: { mentor: mentorId },
      include: [
        {
          model: User,
          as: "MenteeUser", // must match your association alias
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Feedback fetched successfully.",
      feedbacks,
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
