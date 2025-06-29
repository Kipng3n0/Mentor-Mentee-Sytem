import Appointment from "../modelsSQL/Appointment.js";
import User from "../modelsSQL/User.js";
import { Op } from "sequelize";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { date, time, reason, receiverId } = req.body;

  try {
    const senderId = req.user.id;

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const newAppointment = await Appointment.create({
      date,
      time,
      reason,
      sender_id: senderId,
      receiver_id: receiverId,
      status: "Pending",
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
};

// Get appointments for the authenticated user
export const getAppointments = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.findAll({
      where: {
        [Op.or]: [{ sender_id: userId }, { receiver_id: userId }],
      },
      include: [
        { model: User, as: "SenderUser", attributes: ["username", "email"] },
        { model: User, as: "ReceiverUser", attributes: ["username", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};


// Request an appointment (mentee initiates)
export const requestAppointment = async (req, res) => {
  try {
    const { mentorId, date, time, reason } = req.body;
    const menteeId = req.user.id;

    if (!mentorId || !date || !time || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = await Appointment.create({
      sender_id: menteeId,
      receiver_id: mentorId,
      date,
      time,
      reason,
      status: "Pending",
    });

    res.status(201).json({ message: "Appointment request sent", appointment });
  } catch (error) {
    console.error("Error requesting appointment:", error);
    res.status(500).json({
      message: "Failed to request appointment",
      error: error.message,
    });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Authorization check
    if (
      ![appointment.sender_id, appointment.receiver_id].includes(req.user.id)
    ) {
      return res.status(403).json({
        message: "You are not authorized to cancel this appointment",
      });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error); // important
    res.status(500).json({
      message: "Failed to cancel appointment",
      error: error.message,
    });
  }
};


// Update appointment status (Accepted or Rejected)
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.receiver_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this appointment",
      });
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating appointment status",
      error: error.message,
    });
  }
};

// Get mentees assigned to a mentor
// Get mentees assigned to a mentor
export const getAssignedMentees = async (req, res) => {
  try {
    const mentorId = req.user.id;

    const mentor = await User.findByPk(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(403).json({ message: "Unauthorized or not a mentor" });
    }

    const mentees = await User.findAll({
      where: {
        mentorId: mentorId,
        role: "mentee",
      },
      attributes: ["id", "username", "email"],
    });

    res.status(200).json(mentees);
  } catch (error) {
    console.error("Error fetching assigned mentees:", error);
    res.status(500).json({
      message: "Error fetching assigned mentees",
      error: error.message,
    });
  }
};

// Get mentor assigned to a mentee
export const getAssignedMentor = async (req, res) => {
  try {
    const menteeId = req.user.id;

    const mentee = await User.findByPk(menteeId);
    if (!mentee || !mentee.mentorId) {
      return res
        .status(404)
        .json({ message: "Mentor not assigned or mentee not found" });
    }

    const mentor = await User.findByPk(mentee.mentorId, {
      attributes: ["id", "username", "email"],
    });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching assigned mentor",
      error: error.message,
    });
  }
};
