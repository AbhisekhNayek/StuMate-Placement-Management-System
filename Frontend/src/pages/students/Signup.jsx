import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { BASE_URL } from "../../config/config";

function Signup() {
  document.title = "CPMS | Student Sign Up";
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    number: "",
    password: "",
  });

  const { first_name, email, number, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "first_name") setError({ ...error, first_name: "" });
    if (e.target.name === "email") setError({ ...error, email: "" });
    if (e.target.name === "number") setError({ ...error, number: "" });
    if (e.target.name === "password") {
      setError({ ...error, password: "" });
      if (!validatePassword(e.target.value)) {
        setError({
          ...error,
          password:
            "Password must contain: minimum 8 characters, at least 1 special character, 1 number, 1 uppercase, and 1 lowercase letter",
        });
      }
    }
  };

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData?.email ||
      !formData?.first_name ||
      !formData?.number ||
      !formData?.password
    )
      return setError({
        email: "Email is required!",
        first_name: "Name is required!",
        number: "Phone number is required!",
        password: "Password is required!",
      });

    if (!validatePassword(formData?.password))
      return setError({
        password:
          "Password must contain: minimum 8 characters, at least 1 special character, 1 number, 1 uppercase, and 1 lowercase letter",
      });

    if (formData?.number?.length !== 10)
      return setError({
        ...error,
        number: "Phone number should be 10 digits long!",
      });

    try {
      const response = await axios.post(`${BASE_URL}/student/signup`, formData);
      setToastMessage("User created successfully! You can now log in.");
      setShowToast(true);

      const dataToPass = {
        showToastPass: true,
        toastMessagePass: "User created successfully! You can now log in.",
      };
      navigate("../student/login", { state: dataToPass });
    } catch (error) {
      if (error.response?.data?.msg) {
        setToastMessage(error.response?.data?.msg);
        setShowToast(true);
      }
      console.log("Error in Signup.jsx => ", error);
    }
  };

  const [isEyeOpen, setEyeOpen] = useState(false);

  const handleEye = () => {
    setEyeOpen(!isEyeOpen);
  };

  return (
    <>
      {/* Toast message */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center h-screen bg-black">
        <form
          className="rounded-xl bg-black/80 border border-green-500/20 p-8 shadow-lg space-y-6 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <img
              className="mb-3 rounded-xl w-20 h-20 mx-auto"
              src={Logo}
              alt="Logo"
            />
            <h1 className="text-xl font-extrabold text-green-500">
              Sign Up as a Student
            </h1>
          </div>

          <div className="space-y-1">
            <label htmlFor="inputName" className="text-sm text-green-500/80">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              name="first_name"
              value={first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black border border-green-500/20 text-white placeholder-zinc-400 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your name"
            />
            {error?.first_name && (
              <span className="text-red-500 text-sm">{error?.first_name}</span>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="inputEmail" className="text-sm text-green-500/80">
              Email Address
            </label>
            <input
              type="email"
              id="inputEmail"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black border border-green-500/20 text-white placeholder-zinc-400 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
            {error?.email && (
              <span className="text-red-500 text-sm">{error?.email}</span>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="inputNumber" className="text-sm text-green-500/80">
              Phone Number
            </label>
            <input
              type="text"
              id="inputNumber"
              name="number"
              value={number}
              onChange={handleChange}
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              className="w-full px-4 py-2 rounded-lg bg-black border border-green-500/20 text-white placeholder-zinc-400 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your phone number"
            />
            {error?.number && (
              <span className="text-red-500 text-sm">{error?.number}</span>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="inputPassword"
              className="text-sm text-green-500/80"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                id="inputPassword"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-black border border-green-500/20 text-white placeholder-zinc-400 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your password"
              />
              <i
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer ${
                  isEyeOpen
                    ? "fa-solid fa-eye text-green-500"
                    : "fa-regular fa-eye-slash text-green-500"
                }`}
                onClick={handleEye}
              ></i>
            </div>
            {error?.password && (
              <span className="text-red-500 text-sm">{error?.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
          >
            Sign Up
          </button>

          <span className="mt-2 text-center text-green-500 flex justify-center items-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 font-bold cursor-pointer px-1"
              onClick={() => navigate("../student/login")}
            >
              Login
            </span>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;
