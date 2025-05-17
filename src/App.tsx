import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { Homepage } from "./components/home/homepage";
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
import { useAuth } from "./context/authContext";
import { useContext, useEffect } from "react";
import Feed from "./pages/Feed";
import { UserContext } from "./context/UserContext";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const { authenticated, loading } = useAuth();
  const { user } = useContext(UserContext);

  useEffect(() => {}, [authenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {authenticated && user && <Header image_url={user?.image_url} />}
      <main>
        <Routes location={state?.backgroundLocation || location}>
          {/* Public routes */}
          <Route path="/" element={!authenticated ? <Homepage /> : <Feed />} />
          <Route
            path="/login"
            element={!authenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={
              !authenticated ? <Register /> : <Navigate to="/" replace />
            }
          />

          {/* Protected routes */}
          <Route
            path="/messages"
            element={authenticated ? <Messages /> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile/*"
            element={authenticated ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/:username/*"
            element={
              authenticated ? <UserProfile /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/trips"
            element={authenticated ? <Trips /> : <Navigate to="/" replace />}
          />
          <Route
            path="/trips/create"
            element={
              authenticated ? <CreateTrip /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/explore"
            element={authenticated ? <Explore /> : <Navigate to="/" replace />}
          />
          <Route
            path="/connections/requests"
            element={
              authenticated ? (
                <ConnectionRequests />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>

        {/* Story modal route (overlay modal when backgroundLocation is set) */}
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/stories/:userId"
              element={
                authenticated ? <StoryViewer /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
