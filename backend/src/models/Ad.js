// backend/src/models/Ad.js
import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    profession: {
      type: String,
      required: true,
    },
    availableHours: {
      type: String,
      required: true,
    },
    pricing: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
