import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import LandNavbar from "../components/LandingPages/LandNavbar";
import LandFooter from "../components/LandingPages/LandFooter";

// Add social media links for each member
const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    description: "Leading the vision and strategy of our company with a passion for innovation and technology.",
    image: "/images/alice.jpg", 
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Bob Smith",
    role: "CTO",
    description: "Driving technological advancements and ensuring cutting-edge software solutions.",
    image: "/images/bob.jpg", // Add the image path for each member
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Charlie Brown",
    role: "Lead Developer",
    description: "Expert in full-stack development, creating seamless and scalable applications.",
    image: "/images/charlie.jpg", // Add the image path for each member
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Williams",
    role: "Product Manager",
    description: "Ensuring product excellence and user satisfaction with a data-driven approach.",
    image: "/images/david.jpg", // Add the image path for each member
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emma Davis",
    role: "UI/UX Designer",
    description: "Crafting intuitive and aesthetically pleasing user experiences.",
    image: "/images/emma.jpg", // Add the image path for each member
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Frank Harris",
    role: "Cybersecurity Expert",
    description: "Protecting data and ensuring security across all platforms.",
    image: "/images/frank.jpg", // Add the image path for each member
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
];

const Team = () => {
  return (
    <>
      <LandNavbar />
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="container max-w-6xl p-6">
          {/* Heading for the Team section */}
          <h1 className="text-3xl font-extrabold m-16 text-center text-white">Meet Our Team</h1>
          
          {/* Team Members Section */}
          <div className="grid gap-6 sm:grid-cols-3 text-justify">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative text-center">
                  {/* User Image */}
                  <div className="mb-5 mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-green-500">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>

                  <h2 className="mb-3 text-lg font-medium text-white">{member.name}</h2>
                  <h3 className="mb-1 text-sm text-green-400">{member.role}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{member.description}</p>

                  {/* Social Media Icons */}
                  <div className="flex justify-center mt-4 space-x-4">
                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="text-green-400 h-6 w-6 transition-transform transform hover:scale-110" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="text-green-400 h-6 w-6 transition-transform transform hover:scale-110" />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-green-400 h-6 w-6 transition-transform transform hover:scale-110" />
                    </a>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="text-green-400 h-6 w-6 transition-transform transform hover:scale-110" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LandFooter />
    </>
  );
};

export default Team;
