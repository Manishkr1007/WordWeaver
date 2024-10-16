import React, { useEffect, useState } from "react";
import appwriteservice from "../appwrite/config";
import { useParams } from "react-router-dom";





const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  console.log("UserDashboard");
  const { userId } = useParams();

  useEffect(() => {
    appwriteservice.fetchUserData(userId).then((userData) => {
      if (userData) {
        setUserData(userData);
      }
    });
  }, [userId]);
 

  console.log(userData)
  

  return (
    <div>
    <h1>User Profile</h1>
    {userData && (
      <div>
        <p><strong>ID:</strong> {userData.$id}</p>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        {/* Add more user fields as needed */}
      </div>
    )}
  </div>
  );
};

export default UserDashboard;
