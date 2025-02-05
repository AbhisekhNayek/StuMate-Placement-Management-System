import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalBox from './Modal';
import Toast from './Toast';
import TablePlaceholder from './TablePlaceholder';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AddInternship() {
  document.title = 'CPMS | My Internships';
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState({});
  const [dataToParasModal, setDataToParasModal] = useState('');

  const [currentUser, setCurrentUser] = useState({});

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
      })
      .catch(err => {
        console.log("AddUserTable.jsx => ", err);
        setToastMessage(err);
        setShowToast(true);
      });

    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      if (!currentUser?.id) return;
      const response = await axios.get(`${BASE_URL}/student/internship?studentId=${currentUser?.id}`);
      setInternships(response.data.internships);
      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    }
  }

  useEffect(() => {
    fetchInternships();
  }, [currentUser?.id]);

  const handleDeleteInternship = (internshipId, cmpName) => {
    setDataToParasModal(internshipId);
    setModalBody({ cmpName });
    setShowModal(true);
  }

  const confirmDelete = async (internshipId) => {
    try {
      const response = await axios.post(`${BASE_URL}/student/delete-internship`, { internshipId, studentId: currentUser.id });

      setShowModal(false);
      fetchInternships();
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
  }

  const closeModal = () => setShowModal(false);

  const { showToastPass, toastMessagePass } = location.state || { showToastPass: false, toastMessagePass: '' };

  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      navigate('.', { replace: true, state: {} });
    }
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

      <div className='bg-black border border-green-500/20 rounded-2xl p-4 shadow-lg'>
        {loading ? (
          <TablePlaceholder />
        ) : (
          <Table striped bordered hover className='bg-black text-white border-green-500 my-6 rounded-lg shadow w-full text-base max-lg:text-sm max-md:my-3'>
            <thead className="bg-green-600 text-white">
              <tr>
                <th style={{ width: '6%' }}>Sr. No.</th>
                <th style={{ width: '16%' }}>Company Name</th>
                <th style={{ width: '13%' }}>Company Website</th>
                <th style={{ width: '14%' }}>Start Date</th>
                <th style={{ width: '14%' }}>End Date</th>
                <th style={{ width: '13%' }}>Duration</th>
                <th style={{ width: '11%' }}>Stipend</th>
                <th style={{ width: '13%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {internships?.length > 0 ? (
                internships.map((internship, index) => (
                  <tr key={internship?._id} className="hover:bg-green-800 transition">
                    <td>{index + 1}</td>
                    <td><b>{internship?.companyName || '-'}</b></td>
                    <td>
                      {internship?.companyWebsite ? (
                        <a href={internship?.companyWebsite} target='_blank' className='text-green-400 hover:text-green-600'>
                          {internship?.companyWebsite}
                        </a>
                      ) : '-'}
                    </td>
                    <td>{new Date(internship?.startDate).toLocaleDateString('en-IN') || '-'}</td>
                    <td>{new Date(internship?.endDate).toLocaleDateString('en-IN') || '-'}</td>
                    <td>{internship?.internshipDuration ? internship?.internshipDuration + " days" : '-'}</td>
                    <td>{internship?.monthlyStipend ? "Rs. " + internship?.monthlyStipend : '-'}</td>
                    <td>
                      <div className="flex justify-around items-center max-lg:flex-col max-lg:gap-1">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Edit Internship Detail</Tooltip>}
                        >
                          <i
                            className="fa-regular fa-pen-to-square text-green-400 text-2xl cursor-pointer hover:text-green-600"
                            onClick={() => navigate(`../student/add-internship/${internship._id}`)}
                          />
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Delete Internship</Tooltip>}
                        >
                          <i
                            className="fa-regular fa-trash-can text-red-500 text-2xl cursor-pointer hover:text-red-700"
                            onClick={() => handleDeleteInternship(internship?._id, internship?.companyName)}
                          />
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-green-400">Internship Not Added Yet!</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      <ModalBox
        show={showModal}
        close={closeModal}
        header="Confirmation"
        body={`Do you want to delete internship of ${modalBody.cmpName}?`}
        btn="Delete"
        confirmAction={() => confirmDelete(dataToParasModal)}
      />
    </>
  )
}

export default AddInternship;
