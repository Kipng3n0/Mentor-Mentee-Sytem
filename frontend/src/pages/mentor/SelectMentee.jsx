import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchUnselectedMentees, addMentee } from "../../api/selectMenteeApi";

const SelectMentee = () => {
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const unselectedMentees = await fetchUnselectedMentees();
        setMentees(unselectedMentees);
        setFilteredMentees(unselectedMentees); // Show all mentees by default
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch unselected mentees");
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  const handleSelectMentee = async (menteeId) => {
    try {
      const mentorId = "mentorId"; // Adjust accordingly
      const response = await addMentee(mentorId, menteeId);
      if (response) {
        setMentees((prev) => prev.filter((mentee) => mentee._id !== menteeId));
        setFilteredMentees((prev) =>
          prev.filter((mentee) => mentee._id !== menteeId)
        );
      }
    } catch (err) {
      setError("Failed to select mentee");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = mentees.filter((mentee) =>
      mentee.username.toLowerCase().includes(value)
    );
    setFilteredMentees(filtered);
  };

  return (
    <div className="flex">
      <Sidebar role="mentor" />
      <div className="flex-grow p-6 text-white bg-black border-l-4 border-purple-700 rounded-l-[50px] h-screen overflow-y-auto">
        <h1 className="text-[30px] font2 translate-y-[20px] font-bold mb-4">Select Mentees</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search mentees by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full mt-[20px] p-2 mb-6 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="text-center text-gray-400 mb-6">
          <span className="text-red-500">Note:</span> Only mentees without an assigned mentor will appear in search results.
        </div>

        {loading ? (
          <div>Loading mentees...</div>
        ) : error ? (
          <div>{error}</div>
        ) : filteredMentees.length === 0 ? (
          <div>No mentees found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentees.map((mentee) => (
              <div
                key={mentee._id}
                className="bg-zinc-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <h2 className="text-lg font-semibold mb-2">{mentee.username}</h2>
                <button
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
                  onClick={() => handleSelectMentee(mentee._id)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMentee;
