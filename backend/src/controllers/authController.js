import User from "../modelsSQL/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🎭 Role match
    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: `Role mismatch. You're registered as ${user.role}` });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      role: user.role,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error); 
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};


// Refresh access token
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const [updatedCount, updatedRows] = await User.update(updates, {
      where: { id: userId },
      returning: true,
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedRows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// Delete user account
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await User.destroy({
      where: { id: userId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting account",
      error: error.message,
    });
  }
};
