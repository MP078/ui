import React, { useState, useEffect } from 'react';
import { useParams, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProfileHeader } from '../components/user/UserProfileHeader';
import { UserProfileInfo } from '../components/user/UserProfileInfo';
import { UserNav } from '../components/user/UserNav';
import { UserPosts } from '../components/user/UserPosts';
import { UserPhotos } from '../components/user/UserPhotos';
import { UserReviews } from '../components/user/UserReviews';
import { UserGuides } from '../components/user/UserGuides';
import { UserAbout } from '../components/user/UserAbout';
import { UserActivity } from '../components/user/UserActivity';
import { UserAchievements } from '../components/user/UserAchievements';
import { ConfirmationDialog } from '../components/ui/confirmation-dialog';
import { userService } from '../services/userService';
import { UserProfile as UserProfileType } from '../types/user';

export default function UserProfile() {
  const { userId = '' } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'requested' | 'connected'>('none');
  const [showConnectConfirmation, setShowConnectConfirmation] = useState(false);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] = useState(false);
  
  const [loading, setLoading] = useState({
    profile: true,
    posts: true,
    photos: true,
    reviews: true,
    guides: true,
    activities: true,
    achievements: true
  });
  
  const [error, setError] = useState({
    profile: '',
    posts: '',
    photos: '',
    reviews: '',
    guides: '',
    activities: '',
    achievements: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await userService.getUserProfile(userId);
        setUser(userData);
        setLoading(prev => ({ ...prev, profile: false }));
      } catch (err) {
        setError(prev => ({ ...prev, profile: 'Failed to load user profile' }));
        setLoading(prev => ({ ...prev, profile: false }));
      }
    };

    const fetchUserPosts = async () => {
      try {
        const postsData = await userService.getUserPosts(userId);
        setPosts(postsData);
        setLoading(prev => ({ ...prev, posts: false }));
      } catch (err) {
        setError(prev => ({ ...prev, posts: 'Failed to load posts' }));
        setLoading(prev => ({ ...prev, posts: false }));
      }
    };

    const fetchUserPhotos = async () => {
      try {
        const photosData = await userService.getUserPhotos(userId);
        setPhotos(photosData);
        setLoading(prev => ({ ...prev, photos: false }));
      } catch (err) {
        setError(prev => ({ ...prev, photos: 'Failed to load photos' }));
        setLoading(prev => ({ ...prev, photos: false }));
      }
    };

    const fetchUserReviews = async () => {
      try {
        const reviewsData = await userService.getUserReviews(userId);
        setReviews(reviewsData);
        setLoading(prev => ({ ...prev, reviews: false }));
      } catch (err) {
        setError(prev => ({ ...prev, reviews: 'Failed to load reviews' }));
        setLoading(prev => ({ ...prev, reviews: false }));
      }
    };

    const fetchUserGuides = async () => {
      try {
        const guidesData = await userService.getUserGuides(userId);
        setGuides(guidesData);
        setLoading(prev => ({ ...prev, guides: false }));
      } catch (err) {
        setError(prev => ({ ...prev, guides: 'Failed to load guides' }));
        setLoading(prev => ({ ...prev, guides: false }));
      }
    };

    const fetchUserActivities = async () => {
      try {
        const activitiesData = await userService.getUserActivities(userId);
        setActivities(activitiesData);
        setLoading(prev => ({ ...prev, activities: false }));
      } catch (err) {
        setError(prev => ({ ...prev, activities: 'Failed to load activities' }));
        setLoading(prev => ({ ...prev, activities: false }));
      }
    };

    const fetchUserAchievements = async () => {
      try {
        const achievementsData = await userService.getUserAchievements(userId);
        setAchievements(achievementsData);
        setLoading(prev => ({ ...prev, achievements: false }));
      } catch (err) {
        setError(prev => ({ ...prev, achievements: 'Failed to load achievements' }));
        setLoading(prev => ({ ...prev, achievements: false }));
      }
    };

    const fetchConnectionStatus = async () => {
      try {
        const { status } = await userService.checkConnectionStatus(userId);
        setConnectionStatus(status);
      } catch (err) {
        console.error('Failed to check connection status:', err);
      }
    };

    fetchUserProfile();
    fetchUserPosts();
    fetchUserPhotos();
    fetchUserReviews();
    fetchUserGuides();
    fetchUserActivities();
    fetchUserAchievements();
    fetchConnectionStatus();
  }, [userId]);

  const handleConnect = () => {
    setShowConnectConfirmation(true);
  };

  const handleDisconnect = () => {
    setShowDisconnectConfirmation(true);
  };

  const handleMessage = () => {
    navigate('/messages');
  };

  const handleConfirmConnect = async () => {
    try {
      await userService.connectWithUser(userId);
      setConnectionStatus('requested');
      setShowConnectConfirmation(false);
    } catch (err) {
      console.error('Failed to connect with user:', err);
    }
  };

  const handleConfirmDisconnect = async () => {
    try {
      await userService.disconnectFromUser(userId);
      setConnectionStatus('none');
      setShowDisconnectConfirmation(false);
    } catch (err) {
      console.error('Failed to disconnect from user:', err);
    }
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <UserProfileHeader 
          user={user}
          connectionStatus={connectionStatus}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onMessage={handleMessage}
        />
        <UserProfileInfo user={user} />
        <UserNav userId={userId} />
        
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-8">
            <Routes>
              <Route path="/" element={<UserPosts posts={posts} isLoading={loading.posts} error={error.posts} />} />
              <Route path="/photos" element={<UserPhotos photos={photos} isLoading={loading.photos} error={error.photos} />} />
              <Route path="/reviews" element={<UserReviews reviews={reviews} isLoading={loading.reviews} error={error.reviews} />} />
              <Route path="/guides" element={<UserGuides guides={guides} isLoading={loading.guides} error={error.guides} />} />
              <Route path="/about" element={<UserAbout user={user} isLoading={loading.profile} error={error.profile} />} />
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

      <ConfirmationDialog
        isOpen={showConnectConfirmation}
        onClose={() => setShowConnectConfirmation(false)}
        onConfirm={handleConfirmConnect}
        title="Connect with Traveler"
        message={`Would you like to connect with ${user.name}? They will be notified of your request.`}
        confirmText="Send Request"
        type="info"
      />

      <ConfirmationDialog
        isOpen={showDisconnectConfirmation}
        onClose={() => setShowDisconnectConfirmation(false)}
        onConfirm={handleConfirmDisconnect}
        title="Disconnect from Traveler"
        message={`Are you sure you want to disconnect from ${user.name}? This action cannot be undone.`}
        confirmText="Disconnect"
        type="danger"
      />
    </div>
  );
}