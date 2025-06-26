import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use .env variables for flexibility

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data; // Return success message or user data
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data; // Return tokens
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
// Function to update user details
export const updateUser = async (userData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/auth/me`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Update failed';
  }
};
// Function to delete the user account
export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Account deletion failed';
  }
};

