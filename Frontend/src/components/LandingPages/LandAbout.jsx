"use client";

import React from 'react';

const AboutUs = () => {
  return (
    <main className="relative px-6 pt-32 bg-black">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-9 items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 text-sm text-green-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            About Us
          </div>

          <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-7xl">
            Who We Are
            <span className="block bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent text-6xl">
              Our Mission & Vision.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 text-justify">
            We are a dedicated team committed to providing a secure and reliable platform
            for managing and sharing information. Our mission is to empower users with
            the tools they need while ensuring privacy and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-40 grid gap-6 sm:grid-cols-3 text-justify">
          {[ 
            {
              title: "Our Mission",
              description:
                "Our goal is to create an intuitive and seamless experience, ensuring users have easy access to the information they need while maintaining security and privacy.",
              icon: (
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
              ),
            },
            {
              title: "Our Core Values",
              description:
                "Security, Privacy, Transparency, and Innovation are at the heart of everything we do.",
              icon: (
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
                    d="M13 16h-1v-4h-1m1-4h.01M12 3c-1.657 0-3 1.343-3 3v1H6v6h3v4h6v-4h3V7h-3V6c0-1.657-1.343-3-3-3z"
                  />
                </svg>
              ),
            },
            {
              title: "Our Team",
              description:
                "Our team consists of passionate professionals with expertise in technology, security, and user experience.",
              icon: (
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.978 2.891a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.784.57-1.839-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.6 9.601c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"
                  />
                </svg>
              ),
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all hover:bg-zinc-800/80"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-green-500/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-40 rounded-2xl bg-zinc-900 p-8">
          <div className="grid gap-y-8 sm:grid-cols-3">
            {[ 
              { value: "500K+", label: "Users Served" },
              { value: "99.9%", label: "Uptime Guarantee" },
              { value: "5M+", label: "Threats Blocked" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-green-700">
                  {stat.value}
                </div>
                <div className="mt-3 text-sm text-zinc-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
