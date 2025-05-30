import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../Toast';
import ModalBox from '../Modal';
import AddUserTable from '../AddUserTable';
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AddTPO() {
  document.title = 'CPMS | TPO Users';
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: ""
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/management/tpo-users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.data) setUsers(response.data.tpoUsers);
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleDeleteUser = (email) => { setUserToDelete(email); setShowModal(true); };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/tpo-delete-user`, { email: userToDelete }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setShowModal(false);
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  const closeModal = () => { setShowModal(false); setUserToDelete(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/tpo-add-user`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.data) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        fetchUserDetails();
      }
    } catch (error) {
      console.log("Error adding user", error);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-6">
      <div className="container max-w-4xl p-6 bg-black rounded-lg shadow-lg border border-green-500/20">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">TPO Management</h1>
        <p className="text-green-500/80 text-center mb-6">Manage Training & Placement Officers</p>

        <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} delay={3000} position="top-center" />

        <AddUserTable
          users={users}
          loading={loading}
          handleDeleteUser={handleDeleteUser}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          data={data}
          handleDataChange={handleDataChange}
          handleSubmit={handleSubmit}
          showModal={showModal}
          closeModal={closeModal}
          confirmDelete={confirmDelete}
          userToDelete={userToDelete}
          userToAdd="TPO Admin"
        />

        <ModalBox
          show={showModal}
          close={closeModal}
          header="Confirmation"
          body={`Do you want to delete ${userToDelete}?`}
          btn="Delete"
          confirmAction={confirmDelete}
        />
      </div>
    </div>
  );
}

export default AddTPO;
