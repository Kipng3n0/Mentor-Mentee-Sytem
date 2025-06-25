import Ad from "../models/Ad.js";

// POST /ads - Create a new ad
export const createAd = async (req, res) => {
  const { profession, availableHours, pricing, location } = req.body;
  const mentorId = req.user.id;

  try {
    const newAd = new Ad({
      postedBy: mentorId, // Use correct field name from schema
      profession,
      availableHours,
      pricing,
      location,
    });

    await newAd.save();
    res.status(201).json({ message: "Ad created successfully", ad: newAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create ad", error: error.message });
  }
};  

// GET /ads/my - Get ads by logged-in mentor
export const getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ postedBy: req.user.id }); // Match schema
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ads", error: error.message });
  }
};
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("postedBy", "username email");
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ads", error: error.message });
  }
};
  
  
