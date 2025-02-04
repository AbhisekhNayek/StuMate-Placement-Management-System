import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Placeholder from 'react-bootstrap/Placeholder';
import { useLocation, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalBox from './Modal';
import Toast from './Toast';
import TablePlaceholder from './TablePlaceholder';
import { BASE_URL } from '../config/config';

function AllJobPost() {
  document.title = 'CPMS | Job Listings';
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dataToParasModal, setDataToParasModal] = useState(null);
  const [modalBody, setModalBody] = useState({ cmpName: '', jbTitle: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setCurrentUser({
          id: res.data.id,
          email: res.data.email,
          role: res.data.role,
        });
        fetchJobs();
      })
      .catch(err => {
        console.log("Error in fetching user details => ", err);
        setToastMessage(err.message || 'Error loading user data');
        setShowToast(true);
      });
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tpo/jobs`);
      setJobs(response.data.data);
      fetchCompanies(response.data.data);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    }
  };

  const fetchCompanies = async (jobs) => {
    const companyNames = {};
    for (const job of jobs) {
      if (job.company && !companyNames[job.company]) {
        try {
          const response = await axios.get(`${BASE_URL}/company/company-data?companyId=${job.company}`);
          companyNames[job.company] = response.data.company.companyName;
        } catch (error) {
          console.log("Error fetching company name => ", error);
        }
      }
    }
    setCompanies(companyNames);
    setLoading(false);
  };

  const handleDeletePost = (jobId, cmpName, jbTitle) => {
    setDataToParasModal(jobId);
    setModalBody({ cmpName, jbTitle });
    setShowModal(true);
  };

  const confirmDelete = async (jobId) => {
    try {
      const response = await axios.post(`${BASE_URL}/tpo/delete-job`, { jobId });
      setShowModal(false);
      fetchJobs();
      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error?.response?.data?.msg);
        setShowToast(true);
      }
      console.log("Error deleting job ", error);
    }
  };

  const closeModal = () => setShowModal(false);

  const { showToastPass, toastMessagePass } = location.state || { showToastPass: false, toastMessagePass: '' };

  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      navigate('.', { replace: true, state: {} });
    }
    if (!jobs) setLoading(false);
  }, []);

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="bg-black border border-green-500/20 rounded-2xl p-4 shadow-lg">
        {loading || !currentUser ? (
          <TablePlaceholder />
        ) : (
          <div className="overflow-x-auto">
            <Table striped bordered hover className="bg-black text-white border-green-500 my-6 rounded-lg shadow w-full text-base max-lg:text-sm max-md:my-3">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th>Sr. No.</th>
                  <th>Company Name</th>
                  <th>Job Title</th>
                  <th>Annual CTC</th>
                  <th>Last date of Application</th>
                  <th>No. of Students Applied</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.length > 0 ? (
                  jobs?.map((job, index) => {
                    const isMatched = job?.applicants?.find(student => student.studentId === currentUser.id);
                    return (
                      <tr key={job?._id} className={`hover:bg-green-800 transition ${isMatched ? 'table-success' : ''}`}>
                        <td>{index + 1}</td>
                        <td><b>{companies[job?.company] || <Placeholder xs={12} />}</b></td>
                        <td>{job?.jobTitle}</td>
                        <td>{job?.salary}</td>
                        <td>{new Date(job?.applicationDeadline).toLocaleDateString('en-In')}</td>
                        <td>{job?.applicants?.length}</td>
                        <td>
                          <div className="flex justify-around items-center">
                            <OverlayTrigger placement="top" overlay={<Tooltip>View Post</Tooltip>}>
                              <i className="fa-solid fa-circle-info text-green-400 text-2xl cursor-pointer hover:text-green-600"
                                onClick={() => navigate(`../${currentUser.role}/job/${job._id}`)}
                              />
                            </OverlayTrigger>
                            {currentUser.role !== 'student' && (
                              <>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit Post</Tooltip>}>
                                  <i className="fa-regular fa-pen-to-square text-green-400 text-2xl cursor-pointer hover:text-green-600"
                                    onClick={() => navigate(`../${currentUser.role}/post-job/${job._id}`)}
                                  />
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Delete Post</Tooltip>}>
                                  <i className="fa-regular fa-trash-can text-red-500 text-2xl cursor-pointer hover:text-red-700"
                                    onClick={() => handleDeletePost(job?._id, companies[job?.company], job?.jobTitle)}
                                  />
                                </OverlayTrigger>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-green-400">No Job Posts Found!</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <ModalBox
        show={showModal}
        modalHeader={`Confirm Delete ${modalBody?.cmpName}`}
        modalBody={`Are you sure you want to delete this post of ${modalBody?.jbTitle} from ${modalBody?.cmpName}?`}
        modalActions={
          <>
            <button className='btn btn-secondary' onClick={closeModal}>Cancel</button>
            <button className='btn btn-danger' onClick={() => confirmDelete(dataToParasModal)}>Delete</button>
          </>
        }
      />
    </>
  );
}

export default AllJobPost;
