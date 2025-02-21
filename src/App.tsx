import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { Homepage } from './components/home/homepage';
import Feed from './pages/Feed';
import Messages from './components/chat/Messages';
import Profile from './pages/Profile';
import Trips from './pages/Trips';
import Explore from './pages/Explore';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMessagesPage = location.pathname === '/messages';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHomePage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
