import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import s1 from "../../assets/images/s1.jpeg";
import s2 from "../../assets/images/s2.jpeg";
import s3 from "../../assets/images/s3.jpeg";
import s4 from "../../assets/images/s4.webp";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("mentee"); // Default role
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [currentIndex, setCurrentIndex] = useState(0); // Current slide index

  const navigate = useNavigate();

  // API Base URL (use environment variable or default to localhost)
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const images = [s1, s2, s3, s4];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, role: userRole };

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);

      const { accessToken, refreshToken, role } = response.data;

      if (role !== userRole) {
        setMessage(`Invalid role. You are logged in as ${role}`);
        return;
      }

      // Save tokens and role to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      // Redirect based on role
      navigate(`/${role}/dashboard`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Image Carousel: Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-700 text-white flex flex-col items-center justify-center p-4">
      <div
        className="w-full max-w-[900px] border-2 bg-zinc-800 border-purple-500 relative overflow-hidden flex flex-col md:flex-row rounded-3xl"
        id="loginBg"
      >
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-purple-500">
            Welcome to <span className="text-white">MentorLink</span>
          </h1>

          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Login</h2>

            {/* Show error/success message */}
            {message && (
              <p
                className={`mb-4 ${
                  message.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

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
                placeholder="Enter your email"
                className="w-full px-3 mb-[15px] bg-zinc-700 text-white py-2 border rounded-lg focus:ring focus:ring-[#ff01ea]"
                required
              />
            </div>

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
                placeholder="Enter your password"
                className="w-full px-3 py-2 border mb-[15px] bg-zinc-700 text-white rounded-lg focus:ring focus:ring-[#ff01ea]"
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span>Role:</span>
              <div>
                <button
                  type="button"
                  onClick={() => setUserRole("mentee")}
                  className={`px-3 py-1 ${
                    userRole === "mentee"
                      ? "bg-[#27deeb] text-black"
                      : "bg-gray-200 text-zinc-500"
                  } rounded-full`}
                >
                  Mentee
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("mentor")}
                  className={`px-3 py-1 ml-2 ${
                    userRole === "mentor"
                      ? "bg-[#c01db5] text-black"
                      : "bg-gray-200 text-zinc-500"
                  } rounded-full`}
                >
                  Mentor
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-[15px] bg-purple-500 text-black hover:text-white py-2 rounded-2xl hover:bg-purple-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Link to Register Page */}
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-red-500 hover:underline"
              >
                Register here
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

export default Login;
