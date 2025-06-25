import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar"; // Add this line

const SearchAds = () => {
  const [ads, setAds] = useState([]);
  const [filtered, setFiltered] = useState("");
    const [message, setMessage] = useState("");
    const [appointmentDetails, setAppointmentDetails] = useState([]);


    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/ads/public`)
        .then((res) => {
          setAds(res.data);
          setAppointmentDetails(
            res.data.map(() => ({ date: "", time: "", reason: "" }))
          );
        })
        .catch((err) => console.error(err));
    }, []);
      
  const handleAppointment = async (mentorId, index) => {
    const { date, time, reason } = appointmentDetails[index];
    const token = localStorage.getItem("accessToken");
    

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/appointments/request`,
        { mentorId, date, time, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Appointment request sent successfully!");
    } catch (error) {
      setMessage("Failed to request appointment");
    }
  };
  const handleInputChange = (index, field, value) => {
    const updated = [...appointmentDetails];
    updated[index][field] = value;
    setAppointmentDetails(updated);
  };
  

  const filteredAds = ads.filter(
    (ad) =>
          ad.profession.toLowerCase().includes(filtered.toLowerCase()) ||
          ad.location.toLowerCase().includes(filtered.toLowerCase())||
          ad.availableHours.toLowerCase().includes(filtered.toLowerCase()) ||
          ad.postedBy?.username?.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar role="mentee" /> {/* Sidebar stays */}
      <div className="flex-grow p-6 bg-zinc-800 text-white min-h-screen border-l-4 border-purple-600 rounded-l-[50px]">
        <h2 className="text-2xl font-bold mb-4">Search Tutor Ads</h2>
        <input
          type="text"
          placeholder="Search by Profession/Location/Time"
          className="w-full px-3 py-2 mb-6 bg-zinc-600 rounded"
          value={filtered}
          onChange={(e) => setFiltered(e.target.value)}
        />
        {message && <p className="text-green-400">{message}</p>}
        <div className="space-y-4">
          {filteredAds.map((ad, index) => (
            <div key={ad._id} className="border p-4 bg-zinc-700 rounded">
              <p>
                <strong>Profession:</strong> {ad.profession}
              </p>
              <p>
                <strong>Hours:</strong> {ad.availableHours}
              </p>
              <p>
                <strong>Price:</strong> $ {ad.pricing}
              </p>
              <p>
                <strong>Location:</strong> {ad.location}
              </p>
              <p>
                <strong>Posted by:</strong> {ad.postedBy?.username || "Unknown"}{" "}
                ({ad.postedBy?.email || "No email"})
              </p>

              {/* Appointment Inputs */}
              <div className="mt-4 space-y-2">
                <input
                  type="date"
                  value={appointmentDetails[index]?.date || ""}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded bg-zinc-600"
                  required
                />
                <input
                  type="time"
                  value={appointmentDetails[index]?.time || ""}
                  onChange={(e) =>
                    handleInputChange(index, "time", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded bg-zinc-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Reason"
                  value={appointmentDetails[index]?.reason || ""}
                  onChange={(e) =>
                    handleInputChange(index, "reason", e.target.value)
                  }
                  className="w-full px-2 py-1 rounded bg-zinc-600"
                  required
                />
              </div>

              <button
                onClick={() => handleAppointment(ad.postedBy._id, index)}
                className="mt-3 bg-purple-500 px-3 py-1 rounded text-black hover:text-white"
              >
                Request Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAds;
