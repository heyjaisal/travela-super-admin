import React, { useState, useEffect } from "react";
import axios from "axios";

function Allusers() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const userResp = await axios.get("http://localhost:5000/api/get-user");
        setUsers(Array.isArray(userResp.data) ? userResp.data : []);

        const hostResp = await axios.get("http://localhost:5000/api/get-user");
        setHosts(Array.isArray(hostResp.data) ? hostResp.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUsers([]);
        setHosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl pl-3.5 pt-2 font-bold font-sans">All Users</h1>
        <input
          type="text"
          placeholder="Search"
          className="py-2 my-2 mr-3 px-4 rounded-lg text-center border border-gray-300 w-48"
        />
      </div>

      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`py-2 px-4 text-lg font-poppins border-b-4 ${
            activeTab === "users"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("hosts")}
          className={`py-2 px-4 text-lg font-poppins border-b-4 ${
            activeTab === "hosts"
              ? "border-purple-600 text-purple-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Hosts
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <p className="text-center text-gray-500 font-medium">Loading...</p>
      ) : activeTab === "users" ? (
        users.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <p className="text-lg font-bold text-gray-500 text-center">
                You don't have any users yet
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
              >
                <img
                src={"/images/no-profile-picture.jpg"
                }
                alt="User Profile"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />

                <h3 className="text-lg font-semibold text-center">
                  {user.name}
                </h3>
                <p className="text-gray-500 text-sm text-center">{user.country}</p>
                <p className="text-gray-500 text-sm text-center">
                  {user.email}
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : hosts.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <p className="text-lg font-bold text-gray-500 text-center">
              You don't have any hosts yet
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hosts.map((host) => (
            <div
              key={host._id}
              className="p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
            >
              <img
                src={"/images/no-profile-picture.jpg"
                }
                alt="User Profile"
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />

              <h3 className="text-lg font-semibold text-center">{host.name}</h3>
              <p className="text-gray-500 text-sm text-center">{host.country}</p>
              <p className="text-gray-500 text-sm text-center">{host.email}</p>
              <div className="flex justify-center gap-2 mt-4">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Allusers;
