import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState<{ email?: string; name?: string; phone?: string; address?: string } | null>(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUserData(JSON.parse(userDetails));
    }
  }, []);

  const firstTwoLetters = userData?.email ? userData.email.slice(0, 2).toUpperCase() : "U";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <div className="bg-gray-900 text-white h-20 w-20 rounded-full flex items-center justify-center text-2xl font-semibold">
            {firstTwoLetters}
          </div>
          <h2 className="mt-3 text-lg font-semibold">{userData?.email || "Guest User"}</h2>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="text-gray-400">Email:</span>
            <span className="font-medium">{userData?.email || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="text-gray-400">Phone:</span>
            <span className="font-medium">{userData?.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Address:</span>
            <span className="font-medium">{userData?.address || "N/A"}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
       
          <button
            className=" border text-white py-2 px-4 rounded-md transition"
            onClick={() => {
              localStorage.removeItem("userDetails");
              window.location.href = '/';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
