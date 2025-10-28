// "https://randomuser.me/api/?results=8"

import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch random users
  const fetchUsers = () => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=12")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg font-semibold text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Random Users
      </h2>

      {/* Generate New Users Button */}
      <div className="text-center mb-10">
        <button
          onClick={fetchUsers}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          🔄 Generate New Users
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-md hover:shadow-2xl rounded-2xl p-6 text-center transition transform hover:-translate-y-1"
          >
            <img
              src={user.picture.large}
              alt={user.name.first}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-blue-100"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {user.name.first} {user.name.last}
            </h3>
            <p className="text-gray-500 text-sm mb-2">
              ID: {user.login.uuid.slice(0, 8)}
            </p>
            <p className="text-blue-600 font-medium">{randomProfession()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function for random professions
function randomProfession() {
  const professions = [
    "Software Engineer",
    "UI/UX Designer",
    "Data Analyst",
    "Web Developer",
    "Marketing Specialist",
    "Photographer",
    "Content Creator",
    "Product Manager",
    "AI Researcher",
    "Mobile Developer",
  ];
  return professions[Math.floor(Math.random() * professions.length)];
}
