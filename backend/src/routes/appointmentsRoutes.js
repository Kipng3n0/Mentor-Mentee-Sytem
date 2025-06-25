import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  getAssignedMentees,
  getAssignedMentor,
  requestAppointment,
} from "../controllers/appointmentController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new appointment
router.post('/', authMiddleware, createAppointment);
router.post("/request", authMiddleware, requestAppointment);

// Get all appointments for the logged-in user
router.get('/', authMiddleware, getAppointments);

// Update appointment status (Accept/Reject)
router.patch('/:appointmentId', authMiddleware, updateAppointmentStatus);

// Get mentees assigned to a mentor
router.get('/assigned-mentees', authMiddleware, getAssignedMentees);

// Get mentor assigned to a mentee
router.get('/mentor', authMiddleware, getAssignedMentor);

export default router;
