import React, { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../api/authApi";
import Sidebar from "../components/Sidebar"; // If needed for layout

const Profile = () => {
  const decodedToken = JSON.parse(
    atob(localStorage.getItem("accessToken").split(".")[1])
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData({
      username: decodedToken.username || "",
      email: decodedToken.email || "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setMessage("Profile updated successfully.");
      setFormData({ username: "", email: "" }); // Clear fields after update
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser();
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Delete failed:", error);
      setMessage("Failed to delete account.");
    }
  };

  return (
    <div className="flex">
      <Sidebar role={decodedToken.role} />
      <div className="flex-grow bg-black min-h-screen flex items-center justify-center p-6">
        <div className="bg-zinc-800 text-white rounded-lg shadow-lg border-2 border-yellow-500 p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Update <span className="text-pink-400">Profile</span>
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-2 rounded bg-zinc-700 text-white"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded bg-zinc-700 text-white"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-black"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Delete
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-green-400">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
