// migrateFeedbacks.js
/*import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import FeedbackSQL from "./modelsSQL/Feedback.js";
import FeedbackMongo from "./models/Feedback.js";

import "./db/mysql.js";

async function migrateFeedbacks() {
  await mongoose.connect(process.env.MONGODB_URI);
  const feedbacks = await FeedbackMongo.find();

  let success = 0;
  let skipped = 0;

  for (const fb of feedbacks) {
    const exists = await FeedbackSQL.findOne({
      where: { mongo_id: fb._id.toString() },
    });

    if (exists) {
      console.warn(
        `Skipped feedback from mentee ${fb.mentee} (already exists)`
      );
      skipped++;
      continue;
    }

    try {
      await FeedbackSQL.create({
        mongo_id: fb._id.toString(),
        mentee: fb.mentee?.toString(),
        mentor: fb.mentor?.toString(),
        text: fb.text,
        rating: fb.rating,
        createdAt: fb.createdAt,
        updatedAt: fb.updatedAt,
      });
      console.log(`Migrated feedback from mentee ${fb.mentee}`);
      success++;
    } catch (err) {
      console.error(
        `Failed to migrate feedback from mentee ${fb.mentee}:`,
        err.message
      );
    }
  }

  console.log(`\nMigration complete: ${success} migrated, ${skipped} skipped.`);
  process.exit();
}

migrateFeedbacks().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
*/