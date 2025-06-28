// modelsSQL/associations.js
import User from "./User.js";
import Achievement from "./Achievement.js";
import Appointment from "./Appointment.js";
import Feedback from "./Feedback.js";
import Ad from "./Ad.js";

/**
 * 1. ACHIEVEMENT (Each mentee can have many achievements)
 * Foreign Key: mentee_id → users.id
 */
User.hasMany(Achievement, {
  foreignKey: "mentee_id",
  as: "Achievements",
});
Achievement.belongsTo(User, {
  foreignKey: "mentee_id",
  as: "MenteeUser",
});

/**
 * 2. APPOINTMENT (sender and receiver are both users)
 * Foreign Keys: sender_id, receiver_id → users.id
 */
User.hasMany(Appointment, {
  foreignKey: "sender_id",
  as: "SentAppointments",
});
User.hasMany(Appointment, {
  foreignKey: "receiver_id",
  as: "ReceivedAppointments",
});
Appointment.belongsTo(User, {
  foreignKey: "sender_id",
  as: "SenderUser",
});
Appointment.belongsTo(User, {
  foreignKey: "receiver_id",
  as: "ReceiverUser",
});

/**
 * 3. FEEDBACK (both mentor and mentee are users)
 * Foreign Keys: mentor_id, mentee_id → users.id
 */
User.hasMany(Feedback, {
  foreignKey: "mentor_id",
  as: "ReceivedFeedbacks",
});
User.hasMany(Feedback, {
  foreignKey: "mentee_id",
  as: "GivenFeedbacks",
});
Feedback.belongsTo(User, {
  foreignKey: "mentor_id",
  as: "MentorUser",
});
Feedback.belongsTo(User, {
  foreignKey: "mentee_id",
  as: "MenteeUser",
});

/**
 * 4. AD (posted_by_id → users.id)
 */
// User-Ad relationship (MySQL)
User.hasMany(Ad, { foreignKey: "posted_by_id" });
Ad.belongsTo(User, { foreignKey: "posted_by_id", as: "PostedByUser" });


/**
 * 5. MENTOR-MENTEE RELATIONSHIP (Self-referencing)
 * mentor_id → users.id
 */
User.belongsTo(User, {
  as: "Mentor",
  foreignKey: "mentor_id",
});
User.hasMany(User, {
  as: "AssignedMentees",
  foreignKey: "mentor_id",
});

/**
 * Export models with associations initialized
 */
export { User, Achievement, Appointment, Feedback, Ad };
