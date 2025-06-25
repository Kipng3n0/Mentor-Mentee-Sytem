import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdForm = () => {
  const [formData, setFormData] = useState({
    profession: "",
    availableHours: "",
    pricing: "",
    location: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ads/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatusMessage("Ad created successfully!");
      setFormData({
        profession: "",
        availableHours: "",
        pricing: "",
        location: "",
      });
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Error creating ad");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto translate-y-6 border-2 border-yellow-500 bg-zinc-700 rounded-3xl">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Create <span className="text-pink-500">Tutor</span> Ad
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white">Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white">Available Hours</label>
          <input
            type="text"
            name="availableHours"
            value={formData.availableHours}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white">Pricing (Ksh)</label>
          <input
            type="number"
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-white">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/mentor/view-ads")}
            className="bg-yellow-500 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            View Ads
          </button>
          <button
            type="submit"
            className="bg-purple-500 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Submit
          </button>
        </div>
      </form>
      {statusMessage && <p className="mt-4 text-blue-400">{statusMessage}</p>}
    </div>
  );
};

export default AdForm;
