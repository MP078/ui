import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Homepage } from "./components/home/homepage";
import Feed from "./pages/Feed";
import Messages from "./components/chat/Messages";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Trips from "./pages/Trips";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTrip from "./pages/CreateTrip";
import StoryViewer from "./components/story/StoryViewer";
import ConnectionRequests from "./pages/ConnectionRequests";
import { auth } from "./lib/api";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const state = location.state as { backgroundLocation?: Location };

  const checkAuth = async () => {
    await auth.checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHomePage && !isAuthPage && <Header />}
      <main>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/user/:userId/*" element={<UserProfile />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/create" element={<CreateTrip />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/connections/requests"
            element={<ConnectionRequests />}
          />
        </Routes>

        {/* Story modal route that renders on top of the current page */}
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/stories/:userId" element={<StoryViewer />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
