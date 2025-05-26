import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import DefaultProfileImage from "../assets/defaultProfileImg.png";
import Toast from "./Toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function UserDetails() {
  document.title = "CPMS | Complete Profile";
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentUserData, setCurrentUserData] = useState("");
  const completeProfileReq = location.pathname
    .split("/")
    .includes("complete-profile");

  const fetchCurrentUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/user/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUserData(response.data);
      if (completeProfileReq) {
        if (!(userId === response.data.id)) navigate("../404");
        if (response.data.isProfileCompleted === "true") {
          if (response.data.role === "student")
            navigate("../student/dashboard");
          if (response.data.role === "tpo_admin") navigate("../tpo/dashboard");
          if (response.data.role === "management_admin")
            navigate("../management/dashboard");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Account.jsx => ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (error.response?.data) {
          setToastMessage(error.response.data.msg);
          setShowToast(true);
          if (
            error.response.data.msg === "Student not found" ||
            error.response.data.msg === "user not found"
          )
            navigate("../404");
        }
        console.error("Error fetching student data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [userId]);

  const handleDataChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleDataChangeForSGPA = (e) => {
    setUserData({
      ...userData,
      studentProfile: {
        ...userData?.studentProfile,
        SGPA: {
          ...userData?.studentProfile?.SGPA,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/user/update-profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.msg) {
        setToastMessage(response.data.msg);
        setShowToast(true);
        if (
          completeProfileReq &&
          response.data.msg === "Data Updated Successfully!"
        ) {
          navigate("../management/dashboard");
        }
      }
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("UserDetails => ", error);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImgs", file);
      formData.append("userId", userData._id);
      try {
        const response = await axios.post(
          `${BASE_URL}/user/upload-photo`,
          formData
        );
        setUserData({ ...userData, profile: response.data.file });
        if (response.data?.msg) {
          setToastMessage(response.data.msg);
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage(error?.response?.data?.msg || "Error uploading photo");
        setShowToast(true);
        console.error("Error uploading photo:", error);
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString || isoString === "undefined") return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-72 bg-black text-black">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-green-500" />
        </div>
      ) : (
        <>
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage}
            delay={3000}
            position="bottom-end"
          />
          <div className="min-h-screen bg-black text-black px-4 py-10">
            <h1 className="text-2xl md:text-4xl text-green-500 mb-8 font-bold">
              {userData?.first_name} {userData?.middle_name || ""}{" "}
              {userData?.last_name || ""}
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div className="mb-8 bg-gray-900/80 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/20 p-6 transition-all duration-300">
                <span className="text-xl md:text-2xl text-green-500 font-semibold">
                  Personal Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-4">
                    <FloatingLabel
                      controlId="floatingFirstName"
                      label="First Name"
                    >
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={userData?.first_name || ""}
                        onChange={handleDataChange}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-g-800 text-black border-green-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingMiddleName"
                      label="Middle Name"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Middle Name"
                        name="middle_name"
                        value={userData?.middle_name || ""}
                        onChange={handleDataChange}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingLastName"
                      label="Last Name"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={userData?.last_name || ""}
                        onChange={handleDataChange}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Email address"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        name="email"
                        value={userData?.email || ""}
                        onChange={handleDataChange}
                        required={completeProfileReq}
                        disabled
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingNumber"
                      label="Mobile Number"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Mobile Number"
                        name="number"
                        value={userData?.number || ""}
                        onChange={handleDataChange}
                        onInput={(e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        }}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                  </div>
                  <div className="flex flex-col gap-4">
                    <FloatingLabel
                      controlId="floatingSelectGender"
                      label="Gender"
                    >
                      <Form.Select
                        name="gender"
                        value={userData?.gender || "undefined"}
                        onChange={handleDataChange}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                      >
                        <option
                          disabled
                          value="undefined"
                          className="text-gray-400"
                        >
                          Enter Your Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingBirthDate"
                      label="Date of Birth"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        value={formatDate(userData?.dateOfBirth)}
                        onChange={handleDataChange}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingTextareaAddress"
                      label="Address"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Full Address here..."
                        style={{ height: "150px", resize: "none" }}
                        name="address"
                        value={userData?.fullAddress?.address || ""}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            fullAddress: {
                              ...userData?.fullAddress,
                              address: e.target.value,
                            },
                          });
                        }}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPincode" label="Pincode">
                      <Form.Control
                        type="number"
                        placeholder="Pincode"
                        name="pincode"
                        value={userData?.fullAddress?.pincode || ""}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            fullAddress: {
                              ...userData?.fullAddress,
                              pincode: e.target.value,
                            },
                          });
                        }}
                        pattern="\d{6}"
                        onInput={(e) => {
                          if (e.target.value.length > 6) {
                            e.target.value = e.target.value.slice(0, 6);
                          }
                        }}
                        required={completeProfileReq}
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Col className="w-32 md:w-44 lg:w-52">
                      <Image
                        src={BASE_URL + userData?.profile}
                        roundedCircle
                        className="border-2 border-green-500/20 shadow-md"
                      />
                    </Col>
                    <span className="text-xl text-green-500">
                      {userData?.first_name} {userData?.middle_name || ""}{" "}
                      {userData?.last_name || ""}
                    </span>
                    <FloatingLabel
                      controlId="floatingProfileImage"
                      label="Change Profile Image"
                    >
                      <Form.Control
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        placeholder="Change Profile Image"
                        name="profile"
                        onChange={handlePhotoChange}
                        required={
                          userData?.profile === DefaultProfileImage &&
                          completeProfileReq
                        }
                        disabled={
                          !completeProfileReq &&
                          currentUserData.role !== "superuser"
                        }
                        className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>

              {userData?.role === "student" && (
                <>
                  {/* College Information */}
                  <div className="mb-8 bg-gray-900/80 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/20 p-6 transition-all duration-300">
                    <span className="text-xl md:text-2xl text-green-500 font-semibold">
                      College Information
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-4">
                        <FloatingLabel controlId="floatingUIN" label="UIN">
                          <Form.Control
                            type="text"
                            placeholder="UIN"
                            name="uin"
                            value={userData?.studentProfile?.UIN || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  UIN: e.target.value,
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingRollNumber"
                          label="Roll Number"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Roll Number"
                            name="rollNumber"
                            value={userData?.studentProfile?.rollNumber || ""}
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  rollNumber: e.target.value,
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                      </div>
                      <div className="flex flex-col gap-4">
                        <FloatingLabel
                          controlId="floatingSelectDepartment"
                          label="Department"
                        >
                          <Form.Select
                            name="department"
                            value={
                              userData?.studentProfile?.department ||
                              "undefined"
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  department: e.target.value,
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                          >
                            <option
                              disabled
                              value="undefined"
                              className="text-gray-400"
                            >
                              Enter Your Department
                            </option>
                            <option value="Computer">Computer</option>
                            <option value="Civil">Civil</option>
                            <option value="ECS">ECS</option>
                            <option value="AIDS">AIDS</option>
                            <option value="Mechanical">Mechanical</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingSelectYear"
                          label="Year"
                        >
                          <Form.Select
                            name="year"
                            value={
                              userData?.studentProfile?.year || "undefined"
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  year: e.target.value,
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                          >
                            <option
                              disabled
                              value="undefined"
                              className="text-gray-400"
                            >
                              Enter Your Year
                            </option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingAdmissionYear"
                          label="Admission Year"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Admission Year"
                            name="addmissionYear"
                            value={
                              userData?.studentProfile?.addmissionYear || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  addmissionYear: e.target.value,
                                },
                              });
                            }}
                            onInput={(e) => {
                              if (e.target.value.length > 4) {
                                e.target.value = e.target.value.slice(0, 4);
                              }
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                          <FloatingLabel controlId="floatingSem1" label="Sem 1">
                            <Form.Control
                              type="number"
                              placeholder="Sem 1"
                              name="sem1"
                              value={userData?.studentProfile?.SGPA?.sem1 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem2" label="Sem 2">
                            <Form.Control
                              type="number"
                              placeholder="Sem 2"
                              name="sem2"
                              value={userData?.studentProfile?.SGPA?.sem2 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem3" label="Sem 3">
                            <Form.Control
                              type="number"
                              placeholder="Sem 3"
                              name="sem3"
                              value={userData?.studentProfile?.SGPA?.sem3 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem4" label="Sem 4">
                            <Form.Control
                              type="number"
                              placeholder="Sem 4"
                              name="sem4"
                              value={userData?.studentProfile?.SGPA?.sem4 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                        </div>
                        <div className="flex flex-col gap-4">
                          <FloatingLabel controlId="floatingSem5" label="Sem 5">
                            <Form.Control
                              type="number"
                              placeholder="Sem 5"
                              name="sem5"
                              value={userData?.studentProfile?.SGPA?.sem5 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem6" label="Sem 6">
                            <Form.Control
                              type="number"
                              placeholder="Sem 6"
                              name="sem6"
                              value={userData?.studentProfile?.SGPA?.sem6 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem7" label="Sem 7">
                            <Form.Control
                              type="number"
                              placeholder="Sem 7"
                              name="sem7"
                              value={userData?.studentProfile?.SGPA?.sem7 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                          <FloatingLabel controlId="floatingSem8" label="Sem 8">
                            <Form.Control
                              type="number"
                              placeholder="Sem 8"
                              name="sem8"
                              value={userData?.studentProfile?.SGPA?.sem8 || ""}
                              onChange={handleDataChangeForSGPA}
                              disabled={
                                !completeProfileReq &&
                                currentUserData.role !== "superuser"
                              }
                              className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                            />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Past Qualification */}
                  <div className="mb-8 bg-gray-900/80 border border-green-500/20 rounded-lg shadow-lg shadow-green-500/20 p-6 transition-all duration-300">
                    <span className="text-xl md:text-2xl text-green-500 font-semibold">
                      Past Qualification
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-4">
                        <FloatingLabel
                          controlId="floatingSelectSSC"
                          label="SSC Board Name"
                        >
                          <Form.Select
                            name="sscBoard"
                            value={
                              userData?.studentProfile?.pastQualification?.ssc
                                ?.board || "undefined"
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.ssc,
                                      board: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                          >
                            <option
                              disabled
                              value="undefined"
                              className="text-gray-400"
                            >
                              Enter Your SSC Board Name
                            </option>
                            <option value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">
                              Maharashtra State Board
                            </option>
                            <option value="Central Board of Secondary Education (CBSE)">
                              CBSE
                            </option>
                            <option value="Council for the Indian School Certificate Examinations (CISCE)">
                              CISCE
                            </option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingSSCMarks"
                          label="SSC Percentage"
                        >
                          <Form.Control
                            type="number"
                            placeholder="SSC Percentage"
                            name="sscPercentage"
                            value={
                              userData?.studentProfile?.pastQualification?.ssc
                                ?.percentage || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.ssc,
                                      percentage: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingSelectSSCPassingYear"
                          label="SSC Passing Year"
                        >
                          <Form.Control
                            type="number"
                            placeholder="SSC Passing Year"
                            name="sscPassingYear"
                            value={
                              userData?.studentProfile?.pastQualification?.ssc
                                ?.year || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    ssc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.ssc,
                                      year: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            required={completeProfileReq}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                      </div>
                      <div className="flex flex-col gap-4">
                        <FloatingLabel
                          controlId="floatingSelectHSC"
                          label="HSC Board Name"
                        >
                          <Form.Select
                            name="hscBoard"
                            value={
                              userData?.studentProfile?.pastQualification?.hsc
                                ?.board || "undefined"
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.hsc,
                                      board: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                          >
                            <option
                              disabled
                              value="undefined"
                              className="text-gray-400"
                            >
                              Enter Your HSC Board Name
                            </option>
                            <option value="Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)">
                              Maharashtra State Board
                            </option>
                            <option value="Central Board of Secondary Education (CBSE)">
                              CBSE
                            </option>
                            <option value="Council for the Indian School Certificate Examinations (CISCE)">
                              CISCE
                            </option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingHSCMarks"
                          label="HSC Percentage"
                        >
                          <Form.Control
                            type="number"
                            placeholder="HSC Percentage"
                            name="hscPercentage"
                            value={
                              userData?.studentProfile?.pastQualification?.hsc
                                ?.percentage || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.hsc,
                                      percentage: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingSelectHSCPassingYear"
                          label="HSC Passing Year"
                        >
                          <Form.Control
                            type="number"
                            placeholder="HSC Passing Year"
                            name="hscPassingYear"
                            value={
                              userData?.studentProfile?.pastQualification?.hsc
                                ?.year || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    hsc: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.hsc,
                                      year: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                      </div>
                      <div className="flex flex-col gap-4">
                        <FloatingLabel
                          controlId="floatingSelectDiploma"
                          label="Diploma Board Name"
                        >
                          <Form.Select
                            name="diplomaBoard"
                            value={
                              userData?.studentProfile?.pastQualification
                                ?.diploma?.department || "undefined"
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.diploma,
                                      department: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300 cursor-pointer"
                          >
                            <option
                              disabled
                              value="undefined"
                              className="text-gray-400"
                            >
                              Enter Your Diploma University Name
                            </option>
                            <option value="Computer">Computer</option>
                            <option value="Civil">Civil</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="ECS">ECS</option>
                            <option value="AIDS">AIDS</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingDiplomaMarks"
                          label="Diploma Percentage or CGPA"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Diploma Percentage"
                            name="diplomaPercentage"
                            value={
                              userData?.studentProfile?.pastQualification
                                ?.diploma?.percentage || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.diploma,
                                      percentage: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-gray-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingSelectDiplomaPassingYear"
                          label="Diploma Passing Year"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Diploma Passing Year"
                            name="diplomaPassingYear"
                            value={
                              userData?.studentProfile?.pastQualification
                                ?.diploma?.year || ""
                            }
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                studentProfile: {
                                  ...userData?.studentProfile,
                                  pastQualification: {
                                    ...userData?.studentProfile
                                      ?.pastQualification,
                                    diploma: {
                                      ...userData?.studentProfile
                                        ?.pastQualification?.diploma,
                                      year: e.target.value,
                                    },
                                  },
                                },
                              });
                            }}
                            disabled={
                              !completeProfileReq &&
                              currentUserData.role !== "superuser"
                            }
                            className="bg-gray-800 text-black border-green-700 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                          />
                        </FloatingLabel>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {(completeProfileReq || currentUserData.role === "superuser") && (
                <div className="flex justify-center">
                  <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white border-none px-8 py-2 rounded-lg transition-all duration-300"
                  >
                    Update
                  </Button>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default UserDetails;
