import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import s1 from "../../assets/images/s1.jpeg";
import s2 from "../../assets/images/s2.jpeg";
import s3 from "../../assets/images/s3.jpeg";
import s4 from "../../assets/images/s4.webp";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Confirm password field
    role: "mentee", // Default role
  });
  const [message, setMessage] = useState(""); // Feedback message
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel index

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  // Handle input change for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Send POST request to register API
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      setMessage(response.data.message);

      // Redirect to login page on success
      if (response.data.success) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Carousel auto-slide effect
  const images = [s1, s2, s3, s4];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-zinc-700 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[900px] border-2 bg-zinc-800 border-purple-500 relative overflow-hidden flex flex-col md:flex-row rounded-3xl">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-purple-500">
            Welcome to <span className="text-white">MentorLink</span>
          </h1>

          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            {/* Feedback Message */}
            {message && (
              <p
                className={`mb-4 text-center ${
                  message.toLowerCase().includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Register / Sign Up</h2>

            {/* Username Field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 bg-zinc-700 text-white py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg px-3 bg-zinc-700 text-white py-2 border focus:outline-none focus:ring-2 focus:ring-[#ff01ea]"
              >
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-purple-500 hover:text-white py-2 text-black hover:bg-purple-600 transition duration-200 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {/* Link to Login Page */}
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-red-500 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Carousel Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-[400px] rounded-3xl h-[400px] overflow-hidden relative">
            <div
              className="flex w-full h-full transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
