import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config/config';

function NotificationBox() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser({ role: response.data.role });
      } catch (error) {
        console.log('Error fetching user details => ', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [currentUser?.role]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tpo/jobs`);
      setJobs(response.data.data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)).slice(0, 10));
    } catch (error) {
      console.log('Error while fetching notices => ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="container max-w-2xl p-6 sm:p-8 bg-black rounded-lg shadow-lg border border-green-500/20">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-green-500/80">Notifications</h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-green-500/80" />
          </div>
        ) : (
          <div className="relative h-80 overflow-hidden pl-4">
            <div className="absolute bottom-0 w-full h-full animate-scrollUp">
              {jobs?.length > 0 ? (
                jobs.map((job, index) => (
                  <div key={index} className="py-2 h-fit">
                    <Link
                      className="text-green-500 hover:text-green-700"
                      to={`/student/job/${job?._id}`}
                      target="_blank"
                    >
                      {job?.jobTitle}
                      {(new Date() - new Date(job?.postedAt)) / (1000 * 60 * 60 * 24) <= 2 && (
                        <Badge className="mx-2 bg-green-600 text-white">New</Badge>
                      )}
                    </Link>
                    <span className="no-underline mx-1 text-gray-400">
                      {new Date(job?.postedAt).toLocaleDateString('en-IN') + ' ' + new Date(job?.postedAt).toLocaleTimeString('en-IN')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-green-400">No notifications found!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationBox;
