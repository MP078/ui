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
    if (currentUser && currentUser.username === username) {
      navigate("/profile", { replace: true });
      return;
    }
    const fetchUserProfile = async () => {
      try {
        setLoading((prev) => ({ ...prev, profile: true }));
        const response = await api.get(`/users/${username}`);
        const userData = response.data.data;
        const {
          id,
          name,
          email,
          profile_image,
          verified,
          total_trips,
          travel_days,
          connections,
          member_since,
          interests,
          languages,
          website,
          certifications,
          bio,
          location,
          about,
          phone,
          friendship_status,
        } = userData;

        const formattedUser: UserProfileType = {
          id,
          name,
          username,
          email,
          image_url:
            profile_image || `/avatars/${getAvatarNumber(id.toString())}.png`,
          verified,
          total_trips,
          travel_days,
          connections,
          member_since,
          interests,
          languages,
          website,
          certifications,
          bio,
          about,
          phone,
          location,
          friendship_status,
        };
        setUser(formattedUser);

        setLoading((prev) => ({ ...prev, profile: false }));
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
      } catch (err: unknown) {
        setError((prev) => ({
          ...prev,
          profile: "Failed to load user profile, log" + (err as Error).message,
        }));
        setLoading((prev) => ({ ...prev, profile: false }));
      }
    };

    const fetchUserReviews = async () => {
      try {
        const reviewsData = await userService.getUserReviews(username);
        setReviews(reviewsData);
        setLoading((prev) => ({ ...prev, reviews: false }));
      } catch (err) {
        setError((prev) => ({ ...prev, reviews: "Failed to load reviews" }));
        setLoading((prev) => ({ ...prev, reviews: false }));
      }
    };

    const fetchUserGuides = async () => {
      try {
        const guidesData = await userService.getUserGuides(username);
        setGuides(guidesData);
        setLoading((prev) => ({ ...prev, guides: false }));
      } catch (err) {
        setError((prev) => ({ ...prev, guides: "Failed to load guides" }));
        setLoading((prev) => ({ ...prev, guides: false }));
      }
    };

    const fetchUserActivities = async () => {
      try {
        const activitiesData = await userService.getUserActivities(username);
        setActivities(activitiesData);
        setLoading((prev) => ({ ...prev, activities: false }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          activities: "Failed to load activities",
        }));
        setLoading((prev) => ({ ...prev, activities: false }));
      }
    };

    const fetchUserAchievements = async () => {
      try {
        const achievementsData = await userService.getUserAchievements(
          username
        );
        setAchievements(achievementsData);
        setLoading((prev) => ({ ...prev, achievements: false }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          achievements: "Failed to load achievements",
        }));
        setLoading((prev) => ({ ...prev, achievements: false }));
      }
    };

    fetchUserProfile();

    fetchUserReviews();
    fetchUserGuides();
    fetchUserActivities();
    fetchUserAchievements();
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
            <Routes>
              <Route path="/" element={<UserPosts username={username} />} />
              <Route
                path="/photos"
                element={<UserPhotos username={username} />}
              />
              <Route
                path="/reviews"
                element={
                  <UserReviews
                    reviews={reviews}
                    isLoading={loading.reviews}
                    error={error.reviews}
                  />
                }
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
