import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileNav from '../components/ProfileNav';
import PostInput from '../components/PostInput';
import UpcomingTrips from '../components/UpcomingTrips';
import SuggestedBuddies from '../components/SuggestedBuddies';
import TrendingDestinations from '../components/TrendingDestinations';
import ProfilePosts from '../components/profile/ProfilePosts';
import ProfilePhotos from '../components/profile/ProfilePhotos';
import ProfileReviews from '../components/profile/ProfileReviews';
import ProfileGuides from '../components/profile/ProfileGuides';
import ProfileAbout from '../components/profile/ProfileAbout';
import { FloatingActionButton } from '../components/ui/floating-action-button';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader />
        <ProfileInfo />
        <div className="px-8 mt-8">
          <PostInput />
        </div>
        <div className="px-8 mt-8">
          <UpcomingTrips />
        </div>
        <ProfileNav />
        
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="col-span-8">
            <Routes>
              <Route path="/" element={<ProfilePosts />} />
              <Route path="/photos" element={<ProfilePhotos />} />
              <Route path="/reviews" element={<ProfileReviews />} />
              <Route path="/guides" element={<ProfileGuides />} />
              <Route path="/about" element={<ProfileAbout />} />
            </Routes>
          </div>
          
          <div className="col-span-4">
            <SuggestedBuddies />
            <TrendingDestinations />
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
}