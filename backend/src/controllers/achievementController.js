import Achievement from "../modelsSQL/Achievement.js";
import User from "../modelsSQL/User.js";
import multer from "multer";
import path from "path";

// Setup multer
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload Achievement
// Upload Achievement
export const uploadAchievement = async (req, res) => {
  const { achievementText } = req.body;

  if (req.user.role !== "mentee") {
    return res.status(403).json({ message: "Only mentees can upload achievements" });
  }

  try {
    let fileData = null;
    let mimeType = null;

    if (req.file) {
      fileData = req.file.buffer;
      mimeType = req.file.mimetype;
    }

    const newAchievement = await Achievement.create({
      mentee_id: req.user.id, // Use mentee_id here
      achievementText,
      fileData,
      mimeType,
    });

    res.status(201).json({
      message: "Achievement uploaded successfully",
      achievement: newAchievement,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload achievement", error: error.message });
  }
};


// View self achievements
export const viewSelfAchievements = async (req, res) => {
  if (req.user.role !== "mentee") {
    return res
      .status(403)
      .json({ message: "Only mentees can view their own achievements" });
  }

  try {
    const achievements = await Achievement.findAll({
      where: { mentee: req.user.id },
      include: [{ model: User, as: "menteeUser", attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ achievements });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch achievements", error: error.message });
  }
};

// View assigned mentees' achievements// View assigned mentees' achievements
// View assigned mentees' achievements
export const viewMenteesAchievements = async (req, res) => {
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Only mentors can view mentees achievements" });
  }

  try {
    const achievements = await Achievement.findAll({
      include: [
        {
          model: User,
          as: "menteeUser",
          attributes: ["username", "mentorId"],
          where: {
            mentorId: req.user.id,
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ achievements });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mentees achievements",
      error: error.message,
    });
  }
};


// Download achievement file
export const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const achievement = await Achievement.findByPk(fileId);

    if (!achievement || !achievement.fileData) {
      return res.status(404).json({ message: "File not found" });
    }

    res.setHeader("Content-Type", achievement.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${achievement.id}${path.extname(
        achievement.mimeType
      )}"`
    );

    res.send(achievement.fileData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to download file", error: error.message });
  }
};
