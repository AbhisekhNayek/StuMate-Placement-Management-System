import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import axios from 'axios';
import Logo from '../assets/CPMS.png';
import SubMenu from './Submenu';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Sidebar = ({ isSidebarVisible }) => {
  const [sidebar, setSidebar] = useState(isSidebarVisible);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSidebar(isSidebarVisible);
  }, [isSidebarVisible]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (loadData.role === 'student') navigate('../student/login');
    else if (loadData.role === 'tpo_admin') navigate('../tpo/login');
    else if (loadData.role === 'management_admin') navigate('../management/login');
    else if (loadData.role === 'superuser') navigate('../admin/login');
  };

  const [loadData, setLoadData] = useState({
    name: 'Not Found',
    email: 'Not Found',
    profile: 'Profile Img',
    role: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${BASE_URL}/user/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoadData({
          name: `${res.data?.first_name} ${res.data?.middle_name} ${res.data?.last_name}`,
          email: res.data.email,
          profile: res.data.profile,
          role: res.data.role,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          const dataToPass = {
            showToastPass: true,
            toastMessagePass: err.response.data.msg,
          };
          navigate('../', { state: dataToPass });
        }
      });
  }, [navigate]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [SidebarData, setSidebarData] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchSidebarData = async () => {
    if (loadData.role === 'superuser') {
      const { SidebarData } = await import('./SuperUser/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'management_admin') {
      const { SidebarData } = await import('./Management/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'tpo_admin') {
      const { SidebarData } = await import('./TPO/SidebarData');
      setSidebarData(SidebarData);
    } else if (loadData.role === 'student') {
      const { SidebarData } = await import('./Students/SidebarData');
      setSidebarData(SidebarData);
    }
  };

  useEffect(() => {
    if (loadData.role) {
      fetchSidebarData();
    }
  }, [loadData.role]);

  return (
    <nav
      className={`bg-black w-[240px] min-h-screen h-full z-20 flex flex-col fixed top-0 transition-transform duration-300 ${
        sidebar ? 'translate-x-0' : '-translate-x-full'
      } shadow-lg navbar-container lg:w-[260px] border-r border-green-500/20`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center px-4 py-6 gap-3 bg-black/80 border-b border-green-500/20">
        <img
          className="rounded-xl shadow-md border border-green-500/20"
          src={Logo}
          alt="Logo"
          width="75"
          height="75"
        />
        <h1 className="text-2xl font-extrabold text-green-500">
          <Link
            to={
              loadData.role === 'superuser'
                ? '/admin/dashboard'
                : loadData.role === 'management_admin'
                ? '/management/dashboard'
                : loadData.role === 'tpo_admin'
                ? '/tpo/dashboard'
                : '/student/dashboard'
            }
            className="no-underline text-green-500"
          >
            StuMate
          </Link>
        </h1>
      </div>

      {/* Sidebar Links */}
      <div className="flex-grow overflow-y-auto sidebar-content pb-24">
        <div className="flex flex-col justify-center w-full">
          {SidebarData.length > 0 ? (
            SidebarData.map((item, index) => (
              <SubMenu
                item={item}
                key={index}
                currentPath={location.pathname}
              />
            ))
          ) : (
            <p className="text-center text-green-500/50">Loading...</p>
          )}
        </div>
      </div>

      {/* User Profile and Dropdown */}
      <div className="bottom-0 absolute w-full">
        {dropdownOpen && (
          <div className="w-full bg-black/90 border-t border-green-500/20">
            {loadData.role && (
              <Link
                to={`../${loadData.role}/account`}
                className="flex items-center rounded-t-md no-underline text-green-500 p-3 hover:bg-green-500/10"
              >
                <FaCog className="mr-2" /> <span>Account Details</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center rounded-t-md w-full p-3 text-red-500 hover:bg-red-500/10"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        )}

        <div
          className="flex justify-center items-center cursor-pointer bg-black hover:bg-green-500/10"
          onClick={toggleDropdown}
        >
          <img
            src={`${BASE_URL}${loadData.profile}`}
            alt="Profile"
            width="45"
            className="mx-2 my-2 rounded-full border border-green-500/20"
          />
          <div className="w-full">
            <div className="flex flex-col justify-center py-1">
              <h2 className="text-base font-semibold text-green-500">
                {loadData.name}
              </h2>
              <p className="text-sm text-green-500/70">{loadData.email}</p>
            </div>
          </div>
          <div className="px-1">
            <IoIosArrowDropdownCircle
              size={24}
              className={`transition-transform duration-300 ${
                dropdownOpen ? 'rotate-180' : 'rotate-0'
              } text-green-500`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
