import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/appLogo.svg";
import logout from "../assets/images/logout.png";
import {
  FaClipboardList,
  FaTrophy,
  FaUserAlt,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUsers,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-600 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static w-64 bg-zinc-800 h-screen transition-transform duration-300 ease-in-out z-40 flex flex-col justify-between p-4`}
      >
        {/* Logo and Title */}
        <div>
          <div className="flex items-center mb-10">
            <img src={logo} alt="App Logo" className="w-12 h-12 mr-3" />
            <h2 className="text-2xl font-bold text-purple-400">MENTOR LINK</h2>
          </div>
          
          {/* Navigation Links */}
          <ul className="space-y-6">
            {/* Dashboard */}
            <li>
              <Link
                to={`/${role}/dashboard`}
                className="flex items-center text-white p-2 rounded-lg hover:bg-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="text-xl mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Select Mentee (Mentor only) */}
            {role === "mentor" && (
              <li>
                <Link
                  to="/mentor/selectMentee"
                  className="flex items-center text-white p-2 rounded-lg hover:bg-green-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUsers className="text-xl mr-3" />
                  <span>Select Mentee</span>
                </Link>
              </li>
            )}

            {/* Your Mentee (Mentor only) */}
            {role === "mentor" && (
              <li>
                <Link
                  to="/mentor/yourMentee"
                  className="flex items-center text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaChalkboardTeacher className="text-xl mr-3" />
                  <span>Your Mentee</span>
                </Link>
              </li>
            )}

            {/* Appointments */}
            <li>
              <Link
                to={`/${role}/appointments`}
                className="flex items-center text-white p-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaClipboardList className="text-xl mr-3" />
                <span>Appointments</span>
              </Link>
            </li>

            {/* Achievements */}
            <li>
              <Link
                to={`/${role}/achievements`}
                className="flex items-center text-white p-2 rounded-lg hover:bg-pink-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaTrophy className="text-xl mr-3" />
                <span>Achievements</span>
              </Link>
            </li>

            {/* Feedback */}
            <li>
              <Link
                to={`/${role}/feedback`}
                className="flex items-center text-white p-2 rounded-lg hover:bg-teal-600 transition"
                onClick={() => setIsOpen(false)}
              >
                <FaUserAlt className="text-xl mr-3" />
                <span>Feedback</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition mt-auto sticky bottom-4"
        >
          <FaSignOutAlt className="text-xl mr-3" />
          <span className="text-base font-medium">Logout</span>
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
