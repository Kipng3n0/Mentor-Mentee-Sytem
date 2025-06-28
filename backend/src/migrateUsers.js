// migrateUsers.js
/*import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import MySQLUser from "./modelsSQL/User.js";
import sequelize from "./db/mysql.js";

dotenv.config({ path: "../.env" });

await sequelize.sync(); // Ensure MySQL table exists
await mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB

const users = await User.find();

let success = 0;
let skipped = 0;

for (const user of users) {
  const exists = await MySQLUser.findOne({ where: { email: user.email } });

  if (exists) {
    console.warn(` Skipped: ${user.username} (already exists)`);
    skipped++;
    continue;
  }

  try {
    await MySQLUser.create({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      mentorId: null, // Will handle mentor mapping later
      assignedMentees: null,
      mongo_id: user._id.toString(),
    });
    console.log(`Migrated: ${user.username}`);
    success++;
  } catch (err) {
    console.error(`Failed: ${user.username}`, err.message);
  }
}

console.log(
  `\n Migration complete: ${success} migrated, ${skipped} skipped.`
);
process.exit();*/
