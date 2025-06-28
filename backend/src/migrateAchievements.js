/*import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import AchievementSQL from "./modelsSQL/Achievement.js";
import AchievementMongo from "./models/Achievement.js";
import "./db/mysql.js";

async function migrateAchievements() {
  await mongoose.connect(process.env.MONGODB_URI);
  const achievements = await AchievementMongo.find();

  let success = 0;
  let skipped = 0;

  for (const ach of achievements) {
    const exists = await AchievementSQL.findOne({
      where: { mongo_id: ach._id.toString() },
    });

    if (exists) {
      console.warn(
        `Skipped: ${ach.achievementText.slice(0, 30)}... (already exists)`
      );
      skipped++;
      continue;
    }

    try {
      await AchievementSQL.create({
        mongo_id: ach._id.toString(),
        mentee: ach.mentee?.toString(),
        achievementText: ach.achievementText,
        fileData: ach.fileData,
        mimeType: ach.mimeType,
        createdAt: ach.createdAt,
        updatedAt: ach.updatedAt,
      });
      console.log(`Migrated: ${ach.achievementText.slice(0, 30)}...`);
      success++;
    } catch (err) {
      console.error(
        `Failed: ${ach.achievementText.slice(0, 30)}...`,
        err.message
      );
    }
  }

  console.log(`\nMigration complete: ${success} migrated, ${skipped} skipped.`);
  process.exit();
}

migrateAchievements().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});*/
