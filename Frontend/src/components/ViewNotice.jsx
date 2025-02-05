import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ViewNotice() {
  document.title = 'CPMS | Notice';
  const navigate = useNavigate();
  const noticeId = useParams();
  const [notice, setNotice] = useState({});

  const fetchNotice = async () => {
    try {
      if (!noticeId) return;
      const response = await axios.get(`${BASE_URL}/management/get-notice?noticeId=${noticeId.noticeId}`);
      setNotice(response?.data);
    } catch (error) {
      console.log("Error while fetching notice => ", error);
    }
  };

  useEffect(() => {
    fetchNotice();
    if (notice === null) navigate('/404');
  }, [noticeId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-green-400">
      <div className="my-6 mx-4 p-6 bg-[#0d0d0d] border border-green-500/40 rounded-lg shadow-lg shadow-green-500/20 max-w-2xl">
        <div className="flex flex-col gap-3">
          <h2 className='text-2xl font-semibold text-green-400'>{notice?.title}</h2>
          <p className='text-green-300'>{notice?.message}</p>
          <span className='text-sm text-green-500 text-right'>
            {notice?.createdAt && 
              new Date(notice?.createdAt).toLocaleDateString('en-IN') + 
              " " + 
              new Date(notice?.createdAt).toLocaleTimeString('en-IN')
            }
          </span>
        </div>
      </div>
    </div>
  );
}

export default ViewNotice;
