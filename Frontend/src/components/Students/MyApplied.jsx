import React, { useState, useEffect } from 'react';
import TablePlaceholder from '../TablePlaceholder';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BASE_URL } from '../../config/config';

function MyApplied() {
  document.title = 'CPMS | My Applied Job';
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setCurrentUser({
          id: res.data.id,
          role: res.data.role,
        });
      })
      .catch(err => {
        console.error("MyApplied.jsx => ", err);
      });
  }, []);

  const fetchMyJob = async () => {
    if (!currentUser?.id) return;
    try {
      const response = await axios.get(`${BASE_URL}/tpo/myjob/${currentUser?.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response?.data) setJobs(response?.data);
    } catch (error) {
      console.error("Error While Fetching Jobs => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJob();
  }, [currentUser?.id]);

  const renderTooltipViewPost = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View Post
    </Tooltip>
  );

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-green-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-center bg-gradient-to-b from-green-500 to-green-400/20 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            My Applied Jobs
          </h1>

          <div className="overflow-auto bg-black/80 rounded-2xl border border-green-500/20 p-6 shadow-lg">
            {loading ? (
              <TablePlaceholder />
            ) : (
              <Table striped bordered hover className="bg-black text-white shadow-md rounded-lg w-full text-base">
                <thead className="bg-green-500/20 text-green-400">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Annual CTC</th>
                    <th>Applied On</th>
                    <th>Last Date</th>
                    <th>Status</th>
                    <th>No. of Applicants</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.length > 0 ? (
                    jobs.map((job, index) => (
                      <tr key={index} className="border-green-500/20">
                        <td>{index + 1}</td>
                        <td className="font-bold">{job.companyName}</td>
                        <td>{job.jobTitle}</td>
                        <td>{job.salary}</td>
                        <td>{new Date(job.appliedAt).toLocaleDateString('en-IN')}</td>
                        <td>{new Date(job.applicationDeadline).toLocaleDateString('en-IN')}</td>
                        <td className="capitalize">{job.status}</td>
                        <td>{job.numberOfApplicants}</td>
                        <td className="text-center">
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipViewPost}
                          >
                            <Link className="text-green-400 hover:text-green-500 transition-colors" to={`/student/job/${job.jobId}`}>
                              <i className="fa-solid fa-circle-info text-2xl cursor-pointer" />
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-zinc-400">No Jobs found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyApplied;
