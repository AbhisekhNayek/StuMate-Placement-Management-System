import React from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/NotificationBox';

// management
function Home() {
  document.title = 'StuMate | Management Dashboard';

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 p-6 sm:p-8">
        <NotificationBox />
        <NoticeBox />
      </div>
    </div>
  );
}

export default Home;
