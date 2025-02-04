import React, { useState } from "react";
import LandingNavbar from "../components/LandingPages/LandNavbar";
import LandFooter from "../components/LandingPages/LandFooter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(
      "Thank you for contacting us! We'll get back to you soon."
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <LandingNavbar />

      {/* Contact Form Section */}
      <div className="bg-black min-h-screen text-white flex items-center justify-center mt-12">
        <div className="container max-w-3xl p-6 sm:p-8 bg-black rounded-lg shadow-lg border border-green-500/20 flex flex-col sm:flex-row-reverse">
          {/* Right Section - Image (Globe or Map) */}
          <div className="sm:w-1/2 w-full mt-6 sm:mt-0 sm:pl-6">
            <div className="h-full w-full bg-gray-400 rounded-lg">
              <img
                src="https://ceta-ac.com/wp-content/uploads/2022/06/contact-page.png"
                alt="Globe"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Left Section - Contact Form */}
          <div className="sm:w-1/2 w-full space-y-6">
            <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
              Contact Us
            </h1>
            <p className="text-green-500/80 text-center mb-6">
              We’d love to hear from you. Please fill out the form below to get
              in touch.
            </p>

            {successMessage && (
              <div className="mb-4 p-4 bg-black/80 rounded-lg text-white text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-green-500/80"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-1 block w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-500/80"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="mt-1 block w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-green-500/80"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  className="mt-1 block w-full rounded-lg bg-black border border-green-500/20 text-white py-2 px-4 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold shadow-lg transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <LandFooter/>
    </>
  );
};

export default Contact;
