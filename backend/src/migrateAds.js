/*import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import AdSQL from "./modelsSQL/Ad.js";
import AdMongo from "./models/Ad.js";

import "./db/mysql.js";

async function migrateAds() {
  await mongoose.connect(process.env.MONGODB_URI);
  const ads = await AdMongo.find();

  let success = 0;
  let skipped = 0;

  for (const ad of ads) {
    const exists = await AdSQL.findOne({
      where: { mongo_id: ad._id.toString() },
    });
    if (exists) {
      console.warn(`Skipped ad: ${ad.profession} (already exists)`);
      skipped++;
      continue;
    }

    try {
      await AdSQL.create({
        mongo_id: ad._id.toString(),
        profession: ad.profession,
        availableHours: ad.availableHours,
        pricing: ad.pricing,
        location: ad.location,
        postedBy: ad.postedBy?.toString(),
        createdAt: ad.createdAt,
        updatedAt: ad.updatedAt,
      });
      console.log(`Migrated ad: ${ad.profession}`);
      success++;
    } catch (err) {
      console.error(`Failed to migrate ad (${ad.profession}):`, err.message);
    }
  }

  console.log(
    `\nAds migration complete: ${success} migrated, ${skipped} skipped.`
  );
  process.exit();
}

migrateAds().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
*/