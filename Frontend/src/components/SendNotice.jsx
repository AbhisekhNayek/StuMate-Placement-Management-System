import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from './Toast';
import ModalBox from './Modal';
import { BASE_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';

function SendNotice() {
  document.title = 'CPMS | Send Notice';

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState({ role: '', id: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${BASE_URL}/user/detail`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        setCurrentUser({
          id: res.data.id,
          role: res.data.role,
        });
        setLoading(false);
      })
      .catch(err => {
        console.log("SendNotice.jsx => ", err);
        navigate('/login');
      });
  }, [navigate]);

  const handleDataChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!data?.receiver_role && !data?.title && !data?.message) {
      setError('All Fields Required!');
      return;
    }
    setShowModal(true);
  }

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/management/send-notice`, data, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response?.data?.msg) {
        setToastMessage(response?.data?.msg);
        setShowToast(true);
      }
      navigate(currentUser?.role === 'management_admin' ? '/management/all-notice' : '/tpo/all-notice');
    } catch (error) {
      console.log('Error while sending notice: ', error);
    }
    setShowModal(false);
  }

  useEffect(() => {
    if (currentUser?.role && currentUser?.id) {
      setData(prevData => ({
        ...prevData,
        sender: currentUser?.id,
        sender_role: currentUser?.role,
      }));
    }
  }, [currentUser]);

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      {loading ? (
        <div className="flex justify-center h-72 items-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-green-500" />
        </div>
      ) : (
        <div className="my-8 backdrop-blur-md bg-black border border-green-500/20 rounded-lg shadow shadow-green-400 p-6 max-sm:text-sm max-sm:p-3 text-white">
          <div className="grid grid-cols-2 gap-2">
            {currentUser?.role === 'management_admin' && (
              <FloatingLabel
                controlId="floatingSendTo"
                label={<span className="text-green-400">Receiver Role <span className="text-red-500">*</span></span>}
              >
                <Form.Select
                  aria-label="Floating label select send to"
                  className="cursor-pointer bg-black text-white border border-green-500 focus:ring-green-500 focus:border-green-500"
                  name="receiver_role"
                  value={data?.receiver_role || ""}
                  onChange={handleDataChange}
                >
                  <option disabled value="" className="text-green-400 bg">
                    Select Receiver Role...
                  </option>
                  <option value="student">Student</option>
                  <option value="tpo_admin">TPO</option>
                </Form.Select>
              </FloatingLabel>
            )}

            <FloatingLabel
              controlId="floatingTitle"
              label={<span className="text-green-500">Title <span className="text-red-500">*</span></span>}
              className={currentUser?.role === 'tpo_admin' ? 'col-span-2' : ''}
            >
              <Form.Control
                type="text"
                placeholder="Title"
                name='title'
                value={data?.title || ""}
                onChange={handleDataChange}
                className="bg-black text-white border border-green-500 focus:ring-green-500 focus:border-green-500"
              />
            </FloatingLabel>

            <div className="col-span-2">
              <FloatingLabel
                controlId="floatingMessage"
                label={<span className="text-green-500">Message <span className="text-red-500">*</span></span>}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Message"
                  name='message'
                  style={{ maxHeight: "250px", height: "200px" }}
                  value={data?.message || ""}
                  onChange={handleDataChange}
                  className="bg-black text-white border border-green-500 focus:ring-green-500 focus:border-green-500"
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="mt-2">
            <span className='text-center text-red-500'>
              {error && error}
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <Button
              variant="outline-success"
              size='lg'
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
              onClick={handleSubmit}
              onMouseEnter={(e) => {
                e.target.querySelector('i').classList.add('fa-solid', 'fa-bounce');
              }}
              onMouseLeave={(e) => {
                e.target.querySelector('i').classList.remove('fa-solid', 'fa-bounce');
              }}
            >
              <i className="fa-regular fa-paper-plane mr-2" />
              Send
            </Button>
          </div>
        </div>
      )}

      <ModalBox
        show={showModal}
        close={closeModal}
        header={<span className="text-white">Confirmation</span>}
        body={<span className="text-white">Sending Notice <strong>{data?.message ? `"${data?.message}"` : ""}</strong> to {data?.receiver_role || "student"}?</span>}
        btn="Send"
        confirmAction={confirmSubmit}
      />
    </>
  )
}

export default SendNotice;
