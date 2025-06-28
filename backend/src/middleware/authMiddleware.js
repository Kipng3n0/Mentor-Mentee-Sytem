import jwt from "jsonwebtoken";
import User from "../modelsSQL/User.js"; // Use the Sequelize model

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id); // Sequelize version

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: user.id, role: user.role }; // Use user.id, not _id
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};
