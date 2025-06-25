import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const CreateAd = () => {
  const [formData, setFormData] = useState({
    profession: "",
    availableHours: "",
    pricing: "",
    location: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ads`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatusMessage("Ad posted successfully!");
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
    <div className="flex">
      {/* Sidebar visible always */}
      <Sidebar role="mentor" />

      {/* Main content area */}
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-yellow-500 rounded-l-[50px]">
        <h1 className="text-[30px] font-bold translate-y-4 mb-6">
          Create Tutor Ad
        </h1>

        <div className="p-6 max-w-md mx-auto border-2 border-yellow-500 bg-zinc-700 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white">Profession</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-white">Available Hours</label>
              <input
                type="text"
                name="availableHours"
                value={formData.availableHours}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-white">Pricing ($/hour)</label>
              <input
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-white">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-zinc-500 border rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-500 text-black hover:text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Submit
              </button>
            </div>
          </form>
          {statusMessage && (
            <p className="mt-4 text-blue-400 text-center">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
