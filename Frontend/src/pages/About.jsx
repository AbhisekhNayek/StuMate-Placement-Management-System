import React from "react";
import LandNavbar from "../components/LandingPages/LandNavbar";
import LandFooter from "../components/LandingPages/LandFooter";

// Sample company info
const companyInfo = {
  name: "Tech Innovations",
  description:
    "At Tech Innovations, we are passionate about pushing the boundaries of technology to create seamless and impactful experiences for our users. Our team of experts works tirelessly to innovate and bring cutting-edge solutions to life.",
  mission:
    "Our mission is to revolutionize the tech industry by creating intuitive and sustainable solutions that enhance the way people live and work.",
  values: [
    "Innovation",
    "Collaboration",
    "Integrity",
    "Excellence",
    "Customer-Centricity",
  ],
  additionalInfo:
    "Tech Innovations is a leader in the tech industry, providing cutting-edge solutions across various sectors, from AI to cloud computing. Our commitment to excellence ensures that we remain at the forefront of technological advancements.",
};

const About = () => {
  return (
    <>
      <LandNavbar />
      <div className="min-h-screen bg-black text-white">
        <div className="container max-w-6xl px-8 py-10">
          {/* About Header */}
          <div className="text-center mt-10">
            <h1 className="text-5xl font-extrabold text-green-400">About Us</h1>
            <p className="text-lg text-gray-300 mt-4">{companyInfo.mission}</p>
          </div>

          {/* About Description and Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            {/* About Description Card */}
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-white">Who We Are</h2>
              <p className="text-lg text-gray-300 mt-4">
                {companyInfo.description}
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
              <p className="text-lg text-gray-300 mt-4">
                {companyInfo.mission}
              </p>
            </div>
          </div>

          {/* Company Values Card */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-center text-white">
              Our Core Values
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
              {companyInfo.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-6 rounded-lg shadow-xl transition-all hover:bg-green-500 hover:text-white"
                >
                  <span className="text-lg font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-10">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-white">
                More About Us
              </h2>
              <p className="text-lg text-gray-300 mt-4">
                {companyInfo.additionalInfo}
              </p>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-center text-white">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
              {/* Replace with actual team members */}
              {[
                { name: "John", position: "CEO" },
                { name: "Jane", position: "CTO" },
                { name: "Alice", position: "Lead Developer" },
                { name: "Bob", position: "Product Manager" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-800 p-8 transition-all hover:bg-zinc-700"
                >
                  <div className="relative mb-5 inline-flex justify-center w-full">
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={member.name}
                      className="w-24 h-24 rounded-full border-4 border-green-500"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LandFooter />
    </>
  );
};

export default About;
