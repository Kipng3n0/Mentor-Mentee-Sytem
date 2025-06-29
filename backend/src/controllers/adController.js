import Ad from "../modelsSQL/Ad.js";
import User from "../modelsSQL/User.js";

// POST /ads - Create a new ad
export const createAd = async (req, res) => {
  const { profession, availableHours, pricing, location } = req.body;
  const mentorId = req.user.id;

  try {
    const newAd = await Ad.create({
      posted_by_id: mentorId, //match model field name
      profession,
      availableHours,
      pricing,
      location,
    });

    res.status(201).json({ message: "Ad created successfully", ad: newAd });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create ad",
      error: error.message,
    });
  }
};

// GET /ads/my - Get ads by logged-in mentor
export const getMyAds = async (req, res) => {
  try {
    const ads = await Ad.findAll({
      where: { posted_by_id: req.user.id }, // match model field name
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ads",
      error: error.message,
    });
  }
};

// GET /ads - Get all ads with mentor info
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.findAll({
      include: [
        {
          model: User,
          as: "PostedByUser",
          attributes: ["id", "username", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ads",
      error: error.message,
    });
  }
};
