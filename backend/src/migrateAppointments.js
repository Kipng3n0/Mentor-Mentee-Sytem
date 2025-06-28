/*import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import AppointmentSQL from "./modelsSQL/Appointment.js";
import AppointmentMongo from "./models/Appointment.js";

import "./db/mysql.js";

async function migrateAppointments() {
  await mongoose.connect(process.env.MONGODB_URI);
  const appointments = await AppointmentMongo.find();

  let success = 0;
  let skipped = 0;

  for (const appt of appointments) {
    const exists = await AppointmentSQL.findOne({
      where: { mongo_id: appt._id.toString() },
    });
    if (exists) {
      console.warn(`Skipped appointment: ${appt.reason} (already exists)`);
      skipped++;
      continue;
    }

    try {
      await AppointmentSQL.create({
        mongo_id: appt._id.toString(),
        date: appt.date,
        time: appt.time,
        reason: appt.reason,
        status: appt.status,
        sender: appt.sender?.toString(),
        receiver: appt.receiver?.toString(),
        createdAt: appt.createdAt,
        updatedAt: appt.updatedAt,
      });
      console.log(`Migrated appointment: ${appt.reason}`);
      success++;
    } catch (err) {
      console.error(` Failed to migrate (${appt.reason}):`, err.message);
    }
  }

  console.log(
    `\n Appointments Migration Done: ${success} migrated, ${skipped} skipped.`
  );
  process.exit();
}

migrateAppointments().catch((err) => {
  console.error(" Migration script failed:", err);
  process.exit(1);
});
*/