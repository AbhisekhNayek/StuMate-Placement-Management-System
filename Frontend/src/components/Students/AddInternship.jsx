import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Toast from "../Toast";
import ModalBox from "../Modal";

const BASE_URL = import.meta.env.VITE_BASE_URL;


function AddInternship() {
  document.title = "CPMS | Add Internships";
  const [loading, setLoading] = useState(true);
  const { internshipId } = useParams();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const closeModal = () => setShowModal(false);
  const [internship, setInternship] = useState({});
  const [currentUserData, setCurrentUserData] = useState("");

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/user/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserData({ id: response.data.id });
        if (!internshipId) setLoading(false);
      } catch (error) {
        console.log("addinternship.jsx => ", error);
      }
    };
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    const fetchInternshipData = async () => {
      if (!currentUserData?.id || !internshipId) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/student/internship?studentId=${currentUserData.id}&internshipId=${internshipId}`
        );
        setInternship(response.data.internship);
        setModalBody(response.data.internship.companyName);
      } catch (error) {
        setToastMessage("Error while updating internship. Try again later!");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInternshipData();
  }, [currentUserData?.id]);

  const handleDataChange = (e) => {
    setInternship({ ...internship, [e.target.name]: e.target.value });
    if (e.target.name === "companyName") setModalBody(e.target.value);
  };

  const formatDate = (isoString) =>
    isoString ? new Date(isoString).toISOString().split("T")[0] : "";

  const handleSubmit = () => {
    if (
      !internship?.companyName ||
      !internship?.internshipDuration ||
      !internship?.startDate ||
      !internship?.type
    ) {
      setToastMessage("All required fields must be filled!");
      setShowToast(true);
      return;
    }
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/student/update-internship?studentId=${currentUserData.id}&internshipId=${internshipId}`,
        { internship }
      );
      setToastMessage(
        response?.data?.msg || "Internship updated successfully!"
      );
      setShowToast(true);
      navigate("/student/internship", {
        state: { showToastPass: true, toastMessagePass: response?.data?.msg },
      });
    } catch (error) {
      setToastMessage("Error updating internship. Please try again!");
      setShowToast(true);
    }
    setShowModal(false);
  };

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
          <i className="fa-solid fa-spinner fa-spin text-3xl text-green-500/80" />
        </div>
      ) : (
        <div className="my-8 backdrop-blur-md bg-black text-white border border-green-500/20 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Add Internship Details
          </h2>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label
                htmlFor="companyName"
                className="text-green-400 font-semibold mb-2"
              >
                Company Name *
              </label>
              <Form.Control
                type="text"
                name="companyName"
                value={internship?.companyName || ""}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="companyWebsite"
                className="text-green-400 font-semibold mb-2"
              >
                Company Website
              </label>
              <Form.Control
                type="text"
                name="companyWebsite"
                value={internship?.companyWebsite || ""}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="internshipDuration"
                className="text-green-400 font-semibold mb-2"
              >
                Internship Duration (Days) *
              </label>
              <Form.Control
                type="number"
                name="internshipDuration"
                value={internship?.internshipDuration || ""}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="text-green-400 font-semibold mb-2"
              >
                Start Date *
              </label>
              <Form.Control
                type="date"
                name="startDate"
                value={formatDate(internship?.startDate)}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="text-green-400 font-semibold mb-2"
              >
                Internship Type *
              </label>
              <Form.Select
                name="type"
                value={internship?.type || "undefined"}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              >
                <option disabled value="undefined">
                  Select Internship Type
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="On-Site">On-Site</option>
                <option value="Work From Home">Work From Home</option>
                <option value="Other">Other</option>
              </Form.Select>
            </div>
            <div>
              <label
                htmlFor="companyAddress"
                className="text-green-400 font-semibold mb-2"
              >
                Company Address
              </label>
              <Form.Control
                as="textarea"
                name="companyAddress"
                value={internship?.companyAddress || ""}
                onChange={handleDataChange}
                className="bg-black text-green-500 focus:text-green-500 focus:bg-black border-2 border-transparent focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Button variant="success" size="lg" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      )}
      <ModalBox
        show={showModal}
        close={closeModal}
        header="Confirmation"
        body={`Do you want to add internship ${modalBody}?`}
        btn="Update"
        confirmAction={confirmSubmit}
      />
    </>
  );
}

export default AddInternship;
