import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteservice from "../appwrite/config";
import Profilepic from "../assets/profile.png"; // Profile picture import

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await appwriteservice.fetchUserData(userId);
        if (response) {
          setUserData(response);
          setFormData({ name: response.name });
        } else {
          setError("No user data found.");
        }
      } catch (err) {
        console.log("Error fetching user data: ", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await appwriteservice.updateUserName(formData.name);
        
        // Fetch updated user data after the update
        const updatedUserData = await appwriteservice.fetchUserData(userId);
        setUserData(updatedUserData);
        setIsEditing(false);
    } catch (err) {
        console.log("Error updating user data: ", err);
        setError("Failed to update user data.");
    }
};

  return (
    <div className="w-full h-[80vh] bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          User Profile
        </h1>
        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {userData && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-4">
              <img
                src={Profilepic}
                className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
                alt="Profile"
              />
            </div>
            <div className="space-y-4 text-left w-full max-w-md flex items-center justify-center">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4 ">
                  <div className="">
                    <label className="block text-gray-700">
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
                      />
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <button
                    type="submit"
                      className="mt-4 bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
                    >
                      Edit Name
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="text-gray-700">
                    <strong className="font-semibold">ID:</strong>{" "}
                    {userData.$id}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-semibold">Name:</strong>{" "}
                    {userData.name}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-semibold">Email:</strong>{" "}
                    {userData.email}
                  </p>
                  <button
                    onClick={handleEditToggle}
                    className="mt-4 bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
                  >
                    Edit Name
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
