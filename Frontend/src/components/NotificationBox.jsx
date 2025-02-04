import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/config';

function NotificationBox() {
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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

  useEffect(() => {
    if (currentUser?.role) {
      fetchUpdates();
    }
  }, [currentUser?.role]);

  const fetchUpdates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student/notify-interview-hired`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      const students = response.data.studentsWithJobDetails;
      const filteredJobs = students
        .map(student => ({
          id: student._id,
          studentName: student.name,
          department: student.department,
          year: student.year,
          jobs: student.jobs.filter(job => job.status === 'interview' || job.status === 'hired')
        }))
        .filter(student => student.jobs.length > 0);

      setNotify(filteredJobs);
    } catch (error) {
      console.log('Error while fetching notifications: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-green-400 flex items-center justify-center">
      <div className="container max-w-2xl p-6 sm:p-8 bg-black rounded-xl shadow-lg border border-green-500/40">
        <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-green-500/80">Notification</h3>
          <span>
            {
              currentUser?.role === 'tpo_admin' && (
                <Link to='/tpo/all-notifications' className='no-underline text-green-500 hover:text-green-300'>
                  View All
                </Link>
              )
            }
            {
              currentUser?.role === 'management_admin' && (
                <Link to='/management/all-notifications' className='no-underline text-green-500 hover:text-green-300'>
                  View All
                </Link>
              )
            }
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <i className="fa-solid fa-spinner fa-spin text-2xl text-green-400" />
          </div>
        ) : (
          <div className="relative h-72 overflow-hidden">
            <div className="absolute bottom-0 w-full h-full animate-scrollUp">
              {notify?.length > 0 ? (
                notify.map((student, studentIndex) => (
                  <div key={studentIndex} className="py-3 border-b border-green-500/30">
                    <Link
                      className='text-green-400 hover:text-green-300 font-medium'
                      to={
                        currentUser?.role === 'tpo_admin' ? `/tpo/user/${student.id}`
                        : currentUser?.role === 'management_admin' ? `/management/user/${student.id}`
                        : ''
                      }
                      target="_blank"
                    >
                      {student.studentName} from 
                      <b className="ml-1">
                        {student.year === 1 && 'First Year'}
                        {student.year === 2 && 'Second Year'}
                        {student.year === 3 && 'Third Year'}
                        {student.year === 4 && 'Fourth Year'}
                      </b>
                      , {student.department}
                    </Link>
                    
                    <div className="flex flex-col gap-1 mt-1">
                      {student.jobs.map((job, jobIndex) => (
                        <Link
                          key={jobIndex}
                          className='text-green-300 hover:text-green-200'
                          to={
                            currentUser?.role === 'tpo_admin' ? `/tpo/job/${job?.jobId}`
                            : currentUser?.role === 'management_admin' ? `/management/job/${job?.jobId}`
                            : ''
                          }
                          target="_blank"
                        >
                          <div className="py-1 flex justify-between">
                            <span>
                              {job?.jobTitle} at {job?.companyName}
                            </span>
                            <span className='text-sm text-green-500 hover:text-green-400'>
                              {job?.status.charAt(0).toUpperCase() + job?.status.slice(1)}
                            </span>
                          </div>
                          {(new Date() - new Date(job?.updatedAt)) / (1000 * 60 * 60 * 24) <= 2 && (
                            <Badge className="ml-2 bg-green-600 text-white px-2 py-1 rounded">
                              New
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-green-500 text-center">No notifications found!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationBox;
