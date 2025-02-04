import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

function LandFooter() {
  return (
    <footer className="bg-black text-green-600 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-green-600 pb-1 text-center">
              Services
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="text-green-500 hover:text-green-400 no-underline">
                  1on1 Coaching
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-400 no-underline">
                  Company Review
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-400 no-underline">
                  Accounts Review
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-400 no-underline">
                  HR Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-400 no-underline">
                  SEO Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-green-600 pb-1 text-center">
              Company
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Meet the Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Accounts Review
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Mission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-green-600 pb-1 text-center">
              Helpful Links
            </h3>
            <ul className="text-gray-400 space-y-2 ">
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Live Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-green-600 pb-1 text-center">
              Legal
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Returns Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Hiring Statistics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Downloads */}
          <div>
            <h3 className="text-lg font-semibold mb-3 border-b border-green-600 pb-1 text-center">
              Downloads
            </h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Marketing Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  SEO Infographics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Content Strategy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Social Media Campaigns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 no-underline"
                >
                  Email Marketing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Email Subscription */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 border-t border-gray-600 pt-6 space-y-4 md:space-y-0">
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-green-600 hover:text-green-400">
              <FaFacebook size={26} />
            </a>
            <a href="#" className="text-green-600 hover:text-green-400">
              <FaGithub size={26} />
            </a>
            <a href="#" className="text-green-600 hover:text-green-400">
              <FaInstagram size={26} />
            </a>
            <a href="#" className="text-green-600 hover:text-green-400">
              <FaXTwitter size={26} />
            </a>
            <a href="#" className="text-green-600 hover:text-green-400">
              <FaLinkedin size={26} />
            </a>
          </div>
          <div className="flex items-center w-full md:w-auto space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-96 bg-gray-900 text-green-400 px-4 py-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md">
              Send
            </button>
          </div>
        </div>

        {/* Social Media Icons */}

        {/* Bottom Links */}
        <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-600 pt-6">
          <div className="mt-4 mb-0 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />© 2025
              Stumate. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandFooter;
