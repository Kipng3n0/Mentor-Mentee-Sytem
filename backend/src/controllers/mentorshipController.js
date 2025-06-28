import jwt from "jsonwebtoken";
import User from "../modelsSQL/User.js";

// Fetch all unassigned mentees
export const getAvailableMentees = async (req, res) => {
  try {
    const unassignedMentees = await User.findAll({
      where: {
        role: "mentee",
        mentorId: null,
      },
      attributes: ["id", "username", "email"],
    });

    if (unassignedMentees.length === 0) {
      return res.status(404).json({ message: "No unassigned mentees found." });
    }

    res.status(200).json({ mentees: unassignedMentees });
  } catch (error) {
    console.error("Error fetching unassigned mentees:", error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

// Fetch all mentees assigned to a mentor
export const getMenteesForMentor = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const mentorId = decodedToken.id;

    const mentor = await User.findByPk(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res
        .status(403)
        .json({ message: "Mentor not found or unauthorized." });
    }

    const mentees = await User.findAll({
      where: {
        role: "mentee",
        mentorId,
      },
      attributes: ["id", "username", "email"],
    });

    if (mentees.length === 0) {
      return res
        .status(404)
        .json({ message: "No mentees found for this mentor." });
    }

    res.status(200).json(mentees);
  } catch (error) {
    console.error("Error fetching mentees for mentor:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch mentees.", error: error.message });
  }
};

// Assign a mentee to a mentor
export const assignMenteeToMentor = async (req, res) => {
  const { menteeId } = req.body;
  const mentorId = req.user.id;

  console.log("Received menteeId:", menteeId);
  console.log("Authenticated mentorId:", mentorId);

  // Continue with your checks...

  try {
    const mentor = await User.findByPk(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res
        .status(403)
        .json({ message: "Only mentors can assign mentees." });
    }

    const mentee = await User.findByPk(menteeId);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(400).json({ message: "Invalid mentee." });
    }

    if (mentee.mentorId) {
      return res.status(400).json({ message: "Mentee already assigned." });
    }

    mentee.mentorId = mentorId;
    await mentee.save();

    res.status(200).json({ message: "Mentee assigned successfully.", mentee });
  } catch (error) {
    console.error("Error assigning mentee:", error);
    res
      .status(500)
      .json({ message: "Failed to assign mentee.", error: error.message });
  }
};

// Unassign a mentee from a mentor
export const unassignMenteeFromMentor = async (req, res) => {
  const { menteeId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const mentorId = decoded.id;

    const mentor = await User.findByPk(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    const mentee = await User.findByPk(menteeId);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ message: "Mentee not found." });
    }

    if (mentee.mentorId !== mentorId) {
      return res
        .status(400)
        .json({ message: "Mentee not assigned to this mentor." });
    }

    mentee.mentorId = null;
    await mentee.save();

    res.status(200).json({ message: "Mentee unassigned successfully." });
  } catch (error) {
    console.error("Error unassigning mentee:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    res
      .status(500)
      .json({ message: "Failed to unassign mentee.", error: error.message });
  }
};
