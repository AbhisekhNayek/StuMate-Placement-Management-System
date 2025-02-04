import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../Toast';
import ModalBox from '../Modal';
import { BASE_URL } from '../../config/config';

function AddCompany() {
  document.title = 'CPMS | Add Company';
  const navigate = useNavigate();
  const { companyId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.companyName || !data?.companyDescription || !data?.companyDifficulty || !data?.companyLocation || !data?.companyWebsite) {
      return setError("All Fields Required!");
    }
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/company/add-company`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response?.data?.msg === "Company Created Successfully!") {
        setShowModal(false);
        navigate('../tpo/companys', { state: { showToastPass: true, toastMessagePass: response?.data?.msg } });
      } else if (response?.data?.msg === "Company Name Already Exist!") {
        setShowModal(false);
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
    } catch (error) {
      console.log("AddCompany error while fetching => ", error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/company/company-data?companyId=${companyId}`);
      setData(response.data.company);
    } catch (error) {
      console.log("AddCompany error while fetching => ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (companyId) fetchCompanyData(); }, [companyId]);
  useEffect(() => { if (!companyId) setLoading(false); }, []);

  const handleDataChange = (e) => {
    setError('');
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="container max-w-2xl p-6 sm:p-8 bg-black rounded-lg shadow-lg border border-green-500/20">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">Add Company</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="companyName" value={data?.companyName || ''} onChange={handleDataChange} placeholder="Company Name" className="w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500" required />
          <input type="text" name="companyLocation" value={data?.companyLocation || ''} onChange={handleDataChange} placeholder="Company Location" className="w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500" required />
          <input type="url" name="companyWebsite" value={data?.companyWebsite || ''} onChange={handleDataChange} placeholder="Company Website" className="w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500" required />
          <select name="companyDifficulty" value={data?.companyDifficulty || ''} onChange={handleDataChange} className="w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500" required>
            <option value="" disabled>Enter Difficulty Level</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
          <textarea name="companyDescription" value={data?.companyDescription || ''} onChange={handleDataChange} placeholder="Company Description" rows={5} className="w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500" required />
          <button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold shadow-lg transition duration-200">Add Company</button>
        </form>
      </div>

      <Toast show={showToast} onClose={() => setShowToast(false)} message={toastMessage} delay={3000} position="bottom-end" />
      <ModalBox show={showModal} close={closeModal} header="Confirmation" body={`Do you want to add company ${data?.companyName}?`} btn="Post" confirmAction={confirmSubmit} />
    </div>
  );
}

export default AddCompany;
