import React from "react";
import LandNavbar from "../components/LandingPages/LandNavbar";
import LandFooter from "../components/LandingPages/LandFooter";

const courses = [
  {
    title: "Introduction to Computer Science",
    description:
      "Learn the basics of computer science, including algorithms, data structures, and programming fundamentals.",
  },
  {
    title: "Web Development with React",
    description:
      "Master front-end development using React, including components, state management, and modern UI techniques.",
  },
  {
    title: "Data Structures & Algorithms",
    description:
      "Enhance your problem-solving skills by learning about essential data structures and algorithms.",
  },
  {
    title: "Machine Learning Fundamentals",
    description:
      "Get started with machine learning, covering key concepts like supervised and unsupervised learning, neural networks, and model evaluation.",
  },
  {
    title: "Cybersecurity Basics",
    description:
      "Understand the fundamentals of cybersecurity, including encryption, network security, and ethical hacking principles.",
  },
  {
    title: "Cloud Computing with AWS",
    description:
      "Learn cloud computing essentials and gain hands-on experience with AWS services such as EC2, S3, and Lambda.",
  },
  {
    title: "Database Management Systems",
    description:
      "Explore database concepts, SQL, and NoSQL databases, focusing on efficient data storage and retrieval techniques.",
  },
  {
    title: "Blockchain and Cryptocurrency",
    description:
      "Dive into blockchain technology and cryptocurrencies, learning about decentralization, smart contracts, and security mechanisms.",
  },
  {
    title: "Software Engineering Principles",
    description:
      "Understand software development methodologies, version control, and agile practices.",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Explore AI concepts such as neural networks, natural language processing, and deep learning models.",
  },
  {
    title: "Internet of Things (IoT)",
    description:
      "Learn about IoT devices, protocols, and real-world applications of connected technologies.",
  },
  {
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Gain hands-on experience in ethical hacking techniques and security testing methodologies.",
  },
  {
    title: "Mobile App Development",
    description:
      "Develop mobile applications using frameworks like React Native and Flutter.",
  },
  {
    title: "Big Data Analytics",
    description:
      "Analyze large datasets using tools such as Hadoop, Spark, and data visualization techniques.",
  },
  {
    title: "DevOps & CI/CD",
    description:
      "Learn automation, containerization with Docker, Kubernetes, and CI/CD pipelines.",
  },
];

const Course = () => {
  return (
    <>
      <LandNavbar />
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="container max-w-6xl p-6">
          <h1 className="m-12 text-center bg-gradient-to-b from-green-500 to-green-400/20 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            Our Courses
          </h1>{" "}
          <div className="grid gap-6 sm:grid-cols-3 text-justify">
            {courses.map((course, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 inline-flex rounded-xl bg-green-500/10 p-3">
                    <svg
                      className="h-6 w-6 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M3 12a9 9 0 1018 0 9 9 0 00-18 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-3 text-lg font-medium text-white">
                    {course.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {course.description}
                  </p>
                  <div className="mt-4 flex space-x-16">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Buy Now
                    </button>
                    <button className="px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white">
                      Free Trial
                    </button>
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

export default Course;
