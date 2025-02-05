import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function StudentDetail() {
  const { studentId } = useParams(); 
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="text-lg">No student data found.</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="container max-w-2xl p-6 sm:p-8 bg-black rounded-lg shadow-lg border border-green-500/20">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">{studentData.name}</h1>
        <p className="text-green-500/80 text-center mb-6">Student Details</p>

        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <p className="block text-sm font-medium text-green-500/80">Email</p>
            <p className="mt-1 text-white">{studentData.email}</p>
          </div>

          {/* Phone Field */}
          <div>
            <p className="block text-sm font-medium text-green-500/80">Phone</p>
            <p className="mt-1 text-white">{studentData.phone}</p>
          </div>

          {/* Render more student data as needed */}
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;
