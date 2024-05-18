import React, { useEffect, useState } from 'react';
import { Appwrite } from 'appwrite';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load environment variables
        const endpoint = process.env.VITE_APPWRITE_URL;
        const projectID = process.env.VITE_APPWRITE_PROJECT_ID;
        const apiKey = process.env.VITE_APPWRITE_API_KEY;

        // Initialize Appwrite client
        const client = new Appwrite();

        client
            .setEndpoint(endpoint)
            .setProject(projectID)
            .setKey(apiKey);

        // Fetch user data
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await client.account.get();
                setUserData(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();

    }, []);
    console.log(userData);  
    

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900">User Dashboard</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        {loading ? (
                            <p className="px-4 py-2 text-gray-600">Loading...</p>
                        ) : (
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{userData?.name}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{userData?.email}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Registration date</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        {userData?.registration_date}
                                    </dd>
                                </div>
                                {/* Add more user data fields as needed */}
                            </dl>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
