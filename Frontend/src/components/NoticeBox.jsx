import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function NoticeBox() {
  const [loading, setLoading] = useState(true);
  const [noticesData, setNoticesData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // Fetch the current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/detail`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setCurrentUser({ role: response.data.role });
      } catch (error) {
        console.log("Error fetching user details => ", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch notices only after the user role is available
  useEffect(() => {
    if (currentUser?.role) {
      fetchNotices();
    }
  }, [currentUser?.role]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/management/get-all-notices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      let filteredNotices = [];
      if (currentUser?.role === 'management_admin') {
        filteredNotices = response.data.filter(notice => notice.sender_role === 'tpo_admin');
      } else if (currentUser?.role === 'tpo_admin') {
        filteredNotices = response.data.filter(notice => notice.receiver_role === 'tpo_admin');
      } else if (currentUser?.role === 'student') {
        filteredNotices = response.data.filter(notice => notice.receiver_role === 'student');
      }

      setNoticesData(filteredNotices);
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
        <h3 className="text-2xl font-semibold text-green-500/80">Notice</h3>
          <span>
            {
              currentUser?.role === 'student' && (
                <Link to='/student/all-notice' className='no-underline text-green-500 hover:text-green-700'>
                  View All
                </Link>
              )
            }
            {
              currentUser?.role === 'tpo_admin' && (
                <Link to='/tpo/all-notice' className='no-underline text-green-500 hover:text-green-700'>
                  View All
                </Link>
              )
            }
            {
              currentUser?.role === 'management_admin' && (
                <Link to='/management/all-notice' className='no-underline text-green-500 hover:text-green-700'>
                  View All
                </Link>
              )
            }
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-green-500/80" />
          </div>
        ) : (
          <div className="relative h-80 overflow-hidden pl-4 pr-4">
            <div className="absolute bottom-0 w-full h-full animate-scrollUp">
              {noticesData?.length > 0 ? (
                noticesData.map((notice, index) => (
                  <div key={index} className="py-2 h-fit">
                    <Link
                      className='text-green-500 hover:text-green-700'
                      to={
                        currentUser?.role === 'student'
                          ? `/student/notice/${notice?._id}`
                          : currentUser?.role === 'tpo_admin'
                            ? `/tpo/notice/${notice?._id}`
                            : currentUser?.role === 'management_admin'
                              ? `/management/notice/${notice?._id}`
                              : ''
                      }
                      target="_blank"
                    >
                      {notice?.title}
                      {/* Show the badge if the notice is within 2 days */}
                      {(new Date() - new Date(notice?.createdAt)) / (1000 * 60 * 60 * 24) <= 2 && (
                        <Badge className="mx-2" bg="primary">New</Badge>
                      )}
                    </Link>
                    <span className='no-underline mx-1 text-gray-400'>
                      {new Date(notice?.createdAt).toLocaleDateString('en-IN') + " " + new Date(notice?.createdAt).toLocaleTimeString('en-IN')}
                    </span>
                  </div>
                ))
              ) : (
                <div className='text-center text-green-400'>No notices found!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoticeBox;
