import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
``;
import Form from "react-bootstrap/Form";
import Toast from "../Toast";
import ModalBox from "../Modal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function PostJob() {
  document.title = "CPMS | Post Job";
  const navigate = useNavigate();

  const { jobId } = useParams();
  const editor = useRef(null);

  const [data, setData] = useState({});
  const [companys, setCompanys] = useState(null);

  const [loading, setLoading] = useState(true);

  // useState for toast display
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // useState for Modal display
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !data?.company ||
      !data?.jobTitle ||
      !data?.salary ||
      !data?.applicationDeadline ||
      !data?.jobDescription ||
      !data?.eligibility ||
      !data?.howToApply
    ) {
      setToastMessage("All Fields Required!");
      setShowToast(true);
      return;
    }
    // console.log(data)
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/tpo/post-job`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // console.log(response.data)
      if (response?.data?.msg) {
        setToastMessage(response.data.msg);
        setShowToast(true);

        const newDataToPass = {
          showToastPass: true,
          toastMessagePass: response?.data?.msg,
        };
        navigate("../tpo/job-listings", { state: newDataToPass });
      }
    } catch (error) {
      if (error.response) {
        if (error?.response.data?.msg) setToastMessage(error.response.data.msg);
        else setToastMessage(error.message);

        setShowToast(true);
      }
      console.log("PostJob error while fetching => ", error);
    }
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const fetchJobDetail = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tpo/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      if (error.response) {
        if (error?.response.data?.msg) setToastMessage(error.response.data.msg);
        else setToastMessage(error.message);
        setShowToast(true);

        if (error?.response?.data?.msg === "job data not found")
          navigate("../404");
      }
      console.log("Error while fetching details => ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/company/company-detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanys(response.data.companies);
    } catch (error) {
      console.log("Error fetching jobs ", error);
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
    }
  };

  useEffect(() => {
    // calling fetchJobDetail
    fetchJobDetail();
    fetchCompanys();
    if (!jobId) setLoading(false);
  }, []);

  // for formating date of birth
  const formatDate = (isoString) => {
    if (!isoString || isoString === "undefined") return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  return (
    <>
      {/*  any message here  */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      {loading ? (
        <div className="flex justify-center h-72 items-center">
          <i className="fa-solid fa-spinner fa-spin text-3xl" />
        </div>
      ) : (
        <>
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="my-8 text-base backdrop-blur-md bg-black border-green-500 rounded-lg shadow shadow-red-400 p-6 max-sm:text-sm max-md:p-3">
                <div className="grid grid-cols-1 gap-2">
                  {/* company details  */}
                  <FloatingLabel
                    controlId="floatingSelectDifficulty"
                    label={
                      <>
                        <span className="text-green-400">
                          Select Company Name{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </>
                    }
                  >
                    <Form.Select
                      aria-label="Floating label select difficulty"
                      name="companySelected"
                      value={data?.company || ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          company: e.target.value,
                        });
                      }}
                      className="bg-black text-white border border-green-500/20 focus:ring-green-500 focus:border-green-500"

                    >
                      <option disabled value="" className="text-green-400">
                        Select Company Name
                      </option>
                      {companys?.map((company, index) => (
                        <option
                          className="bg-green-600/25"
                          key={index}
                          value={company._id}
                        >
                          {company.companyName}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>

              <div className="my-8 text-base backdrop-blur-md bg-black/30 border border-green-500/20 rounded-lg shadow shadow-red-400 p-6 max-sm:text-sm max-md:p-3">
                <div className="flex flex-col">
                  {/* job details  */}
                  <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
                    <FloatingLabel
                      controlId="floatingJobTitle"
                      label={
                        <>
                          <span className="text-green-400">
                            Job Title <span className="text-red-500">*</span>
                          </span>
                        </>
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Job Title"
                        name="jobTitle"
                        value={data?.jobTitle || ""}
                        onChange={handleDataChange}
                        className="bg-black text-white border border-green-500/20 focus:ring-green-500 focus:border-green-500"

                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingSalary"
                      label={
                        <>
                          <span className="text-green-400">
                            Salary (In LPA){" "}
                            <span className="text-red-500">*</span>
                          </span>
                        </>
                      }
                    >
                      <Form.Control
                        type="text"
                        placeholder="Salary"
                        name="salary"
                        value={data?.salary || ""}
                        onChange={(e) => {
                          // Allow only numbers and decimals
                          if (
                            !isNaN(e.target.value) &&
                            /^[0-9]*[.,]?[0-9]*$/.test(e.target.value)
                          ) {
                            handleDataChange(e);
                          }
                        }}
                        className="bg-black text-white border border-green-500/20 focus:ring-green-500 focus:border-green-500"
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingDeadlineDate"
                      label={
                        <>
                          <span className="text-green-400">
                            Deadline Date{" "}
                            <span className="text-red-500">*</span>
                          </span>
                        </>
                      }
                      
                    >
                      <Form.Control
                        type="date"
                        placeholder="Deadline Date"
                        name="applicationDeadline"
                        value={formatDate(data?.applicationDeadline) || ""}
                        onChange={handleDataChange}
                        className="bg-black text-white border border-green-500/20 focus:ring-green-500 focus:border-green-500"

                      />
                    </FloatingLabel>
                  </div>

                  {/* text editor  */}
                  <div className="py-6">
                    <label className="bg-black text-green-400">
                      Enter Job Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <JoditEditor
                      ref={editor}
                      tabIndex={1}
                      value={data?.jobDescription || ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          jobDescription: e,
                        });
                      }}
                      config={{
                        theme: "dark",
                        style: {
                          color: "white",
                          backgroundColor: "black",
                        },
                      }}
                      className="bg-black text-white"
                    />
                  </div>
                  <div className="py-6">
                    <label className="text-green-400">
                      Enter Eligibility <span className="text-red-500">*</span>
                    </label>
                    <JoditEditor
                      ref={editor}
                      tabIndex={2}
                      value={data?.eligibility || ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          eligibility: e,
                        });
                      }}
                      config={{
                        theme: "dark",
                        style: {
                          color: "white",
                          backgroundColor: "black",
                        },
                      }}
                      className="bg-black text-white"
                    />
                  </div>
                  <div className="py-6">
                    <label className="">
                      Enter Process To Apply{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <JoditEditor
                      ref={editor}
                      tabIndex={3}
                      value={data?.howToApply || ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          howToApply: e,
                        });
                      }}
                      config={{
                        theme: "dark",
                        style: {
                          color: "white",
                          backgroundColor: "black",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Button
                  variant="success"
                  type="submit"
                  size="lg"
                  className="mb-2 bg-green-500"
                >
                  POST
                </Button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ModalBox Component for Delete Confirmation */}
      <ModalBox
        show={showModal}
        close={closeModal}
        header={"Confirmation"}
        body={`Do you want to post job for ${data?.jobTitle}?`}
        btn={"Post"}
        confirmAction={confirmSubmit}
      />
    </>
  );
}
export default PostJob;
