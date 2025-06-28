import cron from "node-cron";
import { Op } from "sequelize";
import Appointment from "../modelsSQL/Appointment.js";
import User from "../modelsSQL/User.js";
import { sendEmail } from "./emailService.js";


const sendReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const endOfTomorrow = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);

    const appointments = await Appointment.findAll({
      where: {
        date: {
          [Op.gte]: tomorrow,
          [Op.lt]: endOfTomorrow,
        },
        status: "Accepted",
      },
      include: [
        { model: User, as: "SenderUser", attributes: ["email", "username"] },
        { model: User, as: "ReceiverUser", attributes: ["email", "username"] },
      ],
    });

    console.log(`Found ${appointments.length} appointments for tomorrow`);

    for (const appointment of appointments) {
      try {
        const formattedDate = new Date(appointment.date).toLocaleDateString(
          "en-US",
          {
            dateStyle: "full",
          }
        );

        const senderSubject = `Reminder: Appointment with ${appointment.ReceiverUser.username}`;
        const senderText = `
Hello ${appointment.SenderUser.username},

This is a reminder that you have an appointment scheduled for:
Date: ${formattedDate}
Time: ${appointment.time}
With: ${appointment.ReceiverUser.username}
Reason: ${appointment.reason}

Please make sure to be on time.

Best regards,
Your Appointment System
        `.trim();

        const receiverSubject = `Reminder: Appointment with ${appointment.SenderUser.username}`;
        const receiverText = `
Hello ${appointment.ReceiverUser.username},

This is a reminder that you have an appointment scheduled for:
Date: ${formattedDate}
Time: ${appointment.time}
With: ${appointment.SenderUser.username}
Reason: ${appointment.reason}

Please make sure to be on time.

Best regards,
Your Appointment System
        `.trim();

        await Promise.all([
          sendEmail(appointment.SenderUser.email, senderSubject, senderText),
          sendEmail(
            appointment.ReceiverUser.email,
            receiverSubject,
            receiverText
          ),
        ]);

        console.log(
          `Reminder sent successfully for appointment ID ${appointment.id}`
        );
      } catch (error) {
        console.error(
          `Error sending reminder for appointment ID ${appointment.id}:`,
          error
        );
      }
    }

    console.log("Reminder sending process completed");
  } catch (error) {
    console.error("Error in reminder scheduler:", error);
  }
};

// Run every day at 12 AM UTC
cron.schedule("0 0 * * *", sendReminders, {
  timezone: "UTC",
});

export { sendReminders };
