import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

const UserDashboard = () => {
    const userData = useSelector((state) => state.auth.userData); // Correctly access userData
    const [loading, setLoading] = useState(false); // Set loading to false since we're not fetching

    useEffect(() => {
        if (userData) {
            setLoading(false); // Set loading to false once userData is available
        } else {
            setLoading(true); // Optionally, you can set this to true if userData is not available
        }
    }, [userData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {userData ? (
                <div>
                    <p><strong>ID:</strong> {userData._id}</p>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    {/* Add more user fields as needed */}
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default UserDashboard;
