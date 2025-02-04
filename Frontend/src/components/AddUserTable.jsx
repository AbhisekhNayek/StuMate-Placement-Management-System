import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/config";

function AddUserTable({
  users,
  loading,
  handleDeleteUser,
  formOpen,
  setFormOpen,
  data,
  handleDataChange,
  handleSubmit,
  userToAdd,
  handleApproveStudent,
}) {
  const [currentUser, setCurrentUser] = useState({
    name: "Not Found",
    email: "Not Found",
    profile: "Profile Img",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/user/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser({
          email: res.data.email,
          role: res.data.role,
        });
      })
      .catch((err) => console.log("Error fetching user details", err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      {loading ? (
        <div className="text-center text-green-500 text-lg">
          Loading users...
        </div>
      ) : (
        <table className="w-full max-w-5xl border-collapse border border-green-500 text-sm sm:text-base">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3 border border-green-500">SL No.</th>
              <th className="p-3 border border-green-500">Name</th>
              <th className="p-3 border border-green-500">Email</th>
              <th className="p-3 border border-green-500">Phone</th>
              <th className="p-3 border border-green-500">Joining Date</th>
              <th className="p-3 border border-green-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.email}
                  className="bg-black text-white border border-green-500 hover:bg-green-900"
                >
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/${currentUser.role}/user/${user._id}`}
                      className="text-green-400 hover:bg-green-900"
                    >
                      {user.first_name} {user.last_name}
                    </Link>
                  </td>
                  <td className="p-3 text-center">
                    <a
                      href={`mailto:${user.email}`}
                      className="text-green-400 hover:bg-green-900"
                    >
                      {user.email}
                    </a>
                  </td>
                  <td className="p-3 text-center">{user.number}</td>
                  <td className="p-3 text-center">
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-3 text-center flex justify-center space-x-4">
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    {userToAdd === "approve-student" && (
                      <button
                        onClick={() => handleApproveStudent(user.email)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {userToAdd !== "approve-student" && (
        <button
          className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold shadow-lg"
          onClick={() => {
            let path = "";

            if (userToAdd === "student") {
              path = "/add-student";
            } else if (userToAdd === "management") {
              path = "/add-management-admin";
            } else if (userToAdd === "tpo") {
              path = "/add-tpo-admin";
            }

            // Redirect to the respective path
            window.location.href = path;
          }}
        >
          <i className="fa-solid fa-user-plus mr-2"></i> Add {userToAdd}
        </button>
      )}
    </div>
  );
}

export default AddUserTable;
