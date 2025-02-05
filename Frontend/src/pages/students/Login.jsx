import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/CPMS.png";
import Toast from "../../components/Toast";
import isAuthenticated from "../../utility/auth.utility";
import { Button } from "react-bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  document.title = "StuMate | Student Login";
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const [isEyeOpen, setEyeOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") return setError({ ...error, email: "" });
    if (e.target.name === "password")
      return setError({ ...error, password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.email && !formData?.password)
      return setError({
        email: "Email Required!",
        password: "Password Required!",
      });
    if (!formData?.email) return setError({ email: "Email Required!" });
    if (!formData?.password)
      return setError({ password: "Password Required!" });

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/student/login`, formData);
      localStorage.setItem("token", response.data.token);
      navigate("../student/dashboard");
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.log("Error in Student login.jsx => ", error);
      setLoading(false);
    }
  };

  const handleEye = () => {
    setEyeOpen(!isEyeOpen);
  };

  const { showToastPass, toastMessagePass } = location.state || {
    showToastPass: false,
    toastMessagePass: "",
  };
  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      navigate(".", { replace: true, state: {} });
    }
  }, []);

  return (
    <>
      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="flex justify-center items-center min-h-screen bg-black">
        <form
          className="rounded-xl bg-black/80 border border-green-500/20 p-8 shadow-lg space-y-6 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <img
              className="mb-4 rounded-xl w-20 h-20 mx-auto"
              src={Logo}
              alt="Logo"
            />
            <h1 className="text-xl font-extrabold text-green-500">
              Student Login
            </h1>
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
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
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>

          <span className="mt-4 text-center text-green-500 flex justify-center items-center">
            Don't have an account?
            <span
              className="text-blue-500 font-bold cursor-pointer px-1"
              onClick={() => navigate("../student/signup")}
            >
              Sign Up
            </span>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
