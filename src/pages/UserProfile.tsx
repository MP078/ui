import { useState, useEffect } from "react";
import { useParams, Routes, Route, useNavigate } from "react-router-dom";
import { UserProfileHeader } from "../components/user/UserProfileHeader";
import { UserProfileInfo } from "../components/user/UserProfileInfo";
import { UserNav } from "../components/user/UserNav";
import { UserPosts } from "../components/user/UserPosts";
import UserPhotos from "../components/user/UserPhotos";
import { UserReviews } from "../components/user/UserReviews";
import { UserGuides } from "../components/user/UserGuides";
import { UserActivity } from "../components/user/UserActivity";
import { UserAchievements } from "../components/user/UserAchievements";
import { userService } from "../services/userService";
import { UserProfile as UserProfileType } from "../types/user";
import { api } from "../lib/api";
import { getAvatarNumber } from "../context/UserContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import ProfileAbout from "../components/profile/ProfileAbout";

export default function UserProfile() {
  const { username = "" } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfileType | null>(null);
  const [reviews, setReviews] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState<
    "none" | "sent" | "friends" | "received"
  >("none");

  const [loading, setLoading] = useState({
    profile: true,
    photos: true,
    reviews: true,
    guides: true,
    activities: true,
    achievements: true,
  });

  const [error, setError] = useState({
    profile: "",
    reviews: "",
    guides: "",
    activities: "",
    achievements: "",
  });
  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!username || !currentUser) return;
    if (currentUser.username === username) {
      navigate("/profile", { replace: true });
      return;
    }

    const fetchAll = async () => {
      setLoading({
        profile: true,
        photos: true,
        reviews: true,
        guides: true,
        activities: true,
        achievements: true,
      });

      try {
        const [
          profileRes,
          reviewsData,
          guidesData,
          activitiesData,
          achievementsData,
        ] = await Promise.all([
          api.get(`/users/${username}`),
          userService.getUserReviews(username),
          userService.getUserGuides(username),
          userService.getUserActivities(username),
          userService.getUserAchievements(username),
        ]);

        const userData = profileRes.data.data;
        const formattedUser: UserProfileType = {
          ...userData,
          username,
          image_url:
            userData.profile_image ||
            `/avatars/${getAvatarNumber(userData.id.toString())}.png`,
        };

        setUser(formattedUser);
        setConnectionStatus(
          ["none", "sent", "friends", "received"].includes(
            formattedUser.friendship_status
          )
            ? (formattedUser.friendship_status as
                | "none"
                | "sent"
                | "friends"
                | "received")
            : "none"
        );

        setReviews(reviewsData);
        setGuides(guidesData);
        setActivities(activitiesData);
        setAchievements(achievementsData);

        setLoading({
          profile: false,
          photos: false,
          reviews: false,
          guides: false,
          activities: false,
          achievements: false,
        });
      } catch (err) {
        setError((prev) => ({
          ...prev,
          profile: "Failed to load user profile, " + (err as Error).message,
          reviews: "Failed to load reviews",
          guides: "Failed to load guides",
          activities: "Failed to load activities",
          achievements: "Failed to load achievements",
        }));
        setLoading({
          profile: false,
          photos: false,
          reviews: false,
          guides: false,
          activities: false,
          achievements: false,
        });
      }
    };

    fetchAll();
  }, [currentUser, navigate, username]);

  const handleConnect = async () => {
    try {
      await api
        .post(`/friendships/${username}`)
        .then(() => setConnectionStatus("sent"));
    } catch (err) {
      console.error("Failed to connect with user:", err);
    }
  };
  const handleCancel = async () => {
    try {
      await api
        .delete(`/friendships/${username}`)
        .then(() => setConnectionStatus("none"));
    } catch (err) {
      console.error("Failed to cancel friendship:", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await api
        .delete(`/friendships/${username}`)
        .then(() => setConnectionStatus("none"));
    } catch (err) {
      console.error("Failed to disconnect friendship:", err);
    }
  };

  const handleMessage = () => {
    navigate("/messages");
  };

  if (loading.profile && !error.profile) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 w-full mb-16"></div>
          <div className="h-32 bg-gray-200 w-full mb-8"></div>
          <div className="h-8 bg-gray-200 w-full mb-4"></div>
          <div className="h-8 bg-gray-200 w-3/4 mb-8"></div>
        </div>
      </div>
    );
  }

  if (error.profile) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          <p>{error.profile}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) return <div>no user</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <UserProfileHeader
          user={user}
          connectionStatus={connectionStatus}
          onConnect={handleConnect}
          onCancel={handleCancel}
          onDisconnect={handleDisconnect}
          onMessage={handleMessage}
        />
        <UserProfileInfo user={user} />
        <UserNav username={username} />

        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-8">
            <Routes key={username}>
              <Route path="/" element={<UserPosts username={username} />} />
              <Route
                path="/photos"
                element={<UserPhotos username={username} />}
              />
              <Route
            path="/reviews"
            element={<UserReviews username={username} />}
          />
              <Route
                path="/guides"
                element={
                  <UserGuides
                    guides={guides}
                    isLoading={loading.guides}
                    error={error.guides}
                  />
                }
              />
              <Route path="/about" element={<ProfileAbout user={user} />} />
            </Routes>
          </div>

          <div className="col-span-4">
            <UserActivity
              activities={activities}
              isLoading={loading.activities}
              error={error.activities}
            />
            <UserAchievements
              achievements={achievements}
              isLoading={loading.achievements}
              error={error.achievements}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
