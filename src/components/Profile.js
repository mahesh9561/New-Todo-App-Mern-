import React, { useEffect, useState } from 'react';
import useDecodeJWT from '../Hooks/useJwtToken'; // Import your custom hook
import axios from 'axios';

function Profile() {
  const { decodedToken, decodeToken, error } = useDecodeJWT();
  const [id, setId] = useState('');
  const [userProfile, setUserProfile] = useState(null); // User profile data
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Toggle form visibility
  const [formData, setFormData] = useState({}); // Form state for updating profile

  useEffect(() => {
    const getToken = () => localStorage.getItem('token');
    const token = getToken();
    if (token) {
      decodeToken(token);
    } else {
      console.log('No token found', error);
    }
  }, []);

  useEffect(() => {
    if (decodedToken && decodedToken.userId) {
      setId(decodedToken.userId);
      console.log('Decoded Token User ID:', decodedToken.userId);
    }
  }, [decodedToken]);

  useEffect(() => {
    if (id) {
      fetchApi(id);
    }
  }, [id]); // Fetch API only when 'id' changes

  const fetchApi = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8005/api/auth/usersProfile/${userId}`);
      setUserProfile(response.data.data); // Assuming `data` contains profile details
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setFormData(userProfile); // Prepopulate form with existing data
    setIsEditing(true); // Show the form
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8005/api/auth/updateUser/${id}`, formData);
      console.log('Update Response:', response.data);
      alert('Profile updated successfully!');
      setIsEditing(false); // Hide the form after successful update
      fetchApi(id); // Refetch the updated profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">No user profile found or token expired.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {isEditing ? (
        // Update Form
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile || ''}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country || ''}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      ) : (
        // Display Profile Details
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">{userProfile.name}</h3>
            <p className="text-gray-600">Email: {userProfile.email}</p>
            <p className="text-gray-600">Mobile: {userProfile.mobile}</p>
            <p className="text-gray-600">Country: {userProfile.country}</p>
            <button
              className="text-black px-4 py-2 my-2 border rounded-md bg-yellow-400"
              onClick={handleEditClick}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
