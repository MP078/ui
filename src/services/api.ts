import api from '../lib/axios';
import {
  AUTH_ENDPOINTS,
  USER_ENDPOINTS,
  FRIENDSHIP_ENDPOINTS,
  POST_ENDPOINTS,
  COMMENT_ENDPOINTS,
  TRIP_ENDPOINTS,
  STORY_ENDPOINTS,
  DESTINATION_ENDPOINTS,
  RATING_ENDPOINTS,
} from '../lib/apiEndpoints';

// Auth Service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.delete(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },

  validateToken: async () => {
    const response = await api.get(AUTH_ENDPOINTS.VALIDATE_TOKEN);
    return response.data;
  },
};

// User Service
export const userService = {
  getAllUsers: async () => {
    const response = await api.get(USER_ENDPOINTS.GET_ALL);
    return response.data;
  },

  getUser: async (username: string) => {
    const response = await api.get(USER_ENDPOINTS.GET_USER(username));
    return response.data;
  },

  updateUser: async (username: string, userData: any) => {
    const response = await api.put(USER_ENDPOINTS.UPDATE_USER(username), userData);
    return response.data;
  },
};

// Friendship Service
export const friendshipService = {
  getAllFriendships: async () => {
    const response = await api.get(FRIENDSHIP_ENDPOINTS.GET_ALL);
    return response.data;
  },

  sendFriendRequest: async (username: string) => {
    const response = await api.post(FRIENDSHIP_ENDPOINTS.SEND_REQUEST(username));
    return response.data;
  },

  acceptFriendRequest: async (username: string) => {
    const response = await api.post(FRIENDSHIP_ENDPOINTS.ACCEPT_REQUEST(username));
    return response.data;
  },

  rejectFriendRequest: async (username: string) => {
    const response = await api.post(FRIENDSHIP_ENDPOINTS.REJECT_REQUEST(username));
    return response.data;
  },

  removeFriend: async (username: string) => {
    const response = await api.delete(FRIENDSHIP_ENDPOINTS.REMOVE_FRIEND(username));
    return response.data;
  },
};

// Post Service
export const postService = {
  getAllPosts: async () => {
    const response = await api.get(POST_ENDPOINTS.GET_ALL);
    return response.data;
  },

  createPost: async (postData: any) => {
    const response = await api.post(POST_ENDPOINTS.CREATE, postData);
    return response.data;
  },

  getPost: async (id: string) => {
    const response = await api.get(POST_ENDPOINTS.GET_ONE(id));
    return response.data;
  },

  updatePost: async (id: string, postData: any) => {
    const response = await api.put(POST_ENDPOINTS.UPDATE(id), postData);
    return response.data;
  },

  deletePost: async (id: string) => {
    const response = await api.delete(POST_ENDPOINTS.DELETE(id));
    return response.data;
  },

  likePost: async (id: string) => {
    const response = await api.post(POST_ENDPOINTS.LIKE(id));
    return response.data;
  },

  unlikePost: async (id: string) => {
    const response = await api.delete(POST_ENDPOINTS.UNLIKE(id));
    return response.data;
  },

  getPostComments: async (postId: string) => {
    const response = await api.get(POST_ENDPOINTS.GET_COMMENTS(postId));
    return response.data;
  },

  createPostComment: async (postId: string, commentData: any) => {
    const response = await api.post(POST_ENDPOINTS.CREATE_COMMENT(postId), commentData);
    return response.data;
  },
};

// Comment Service
export const commentService = {
  getAllComments: async () => {
    const response = await api.get(COMMENT_ENDPOINTS.GET_ALL);
    return response.data;
  },

  createComment: async (commentData: any) => {
    const response = await api.post(COMMENT_ENDPOINTS.CREATE, commentData);
    return response.data;
  },

  getComment: async (id: string) => {
    const response = await api.get(COMMENT_ENDPOINTS.GET_ONE(id));
    return response.data;
  },

  updateComment: async (id: string, commentData: any) => {
    const response = await api.put(COMMENT_ENDPOINTS.UPDATE(id), commentData);
    return response.data;
  },

  deleteComment: async (id: string) => {
    const response = await api.delete(COMMENT_ENDPOINTS.DELETE(id));
    return response.data;
  },

  likeComment: async (id: string) => {
    const response = await api.post(COMMENT_ENDPOINTS.LIKE(id));
    return response.data;
  },

  unlikeComment: async (id: string) => {
    const response = await api.delete(COMMENT_ENDPOINTS.UNLIKE(id));
    return response.data;
  },
};

// Trip Service
export const tripService = {
  getAllTrips: async () => {
    const response = await api.get(TRIP_ENDPOINTS.GET_ALL);
    return response.data;
  },

  createTrip: async (tripData: any) => {
    const response = await api.post(TRIP_ENDPOINTS.CREATE, tripData);
    return response.data;
  },

  getTrip: async (id: string) => {
    const response = await api.get(TRIP_ENDPOINTS.GET_ONE(id));
    return response.data;
  },

  updateTrip: async (id: string, tripData: any) => {
    const response = await api.put(TRIP_ENDPOINTS.UPDATE(id), tripData);
    return response.data;
  },

  deleteTrip: async (id: string) => {
    const response = await api.delete(TRIP_ENDPOINTS.DELETE(id));
    return response.data;
  },

  joinTrip: async (tripId: string) => {
    const response = await api.post(TRIP_ENDPOINTS.JOIN(tripId));
    return response.data;
  },

  leaveTrip: async (tripId: string) => {
    const response = await api.delete(TRIP_ENDPOINTS.LEAVE(tripId));
    return response.data;
  },

  promoteParticipant: async (tripId: string, participationId: string) => {
    const response = await api.post(TRIP_ENDPOINTS.PROMOTE_PARTICIPANT(tripId, participationId));
    return response.data;
  },

  approveParticipant: async (tripId: string, participationId: string) => {
    const response = await api.post(TRIP_ENDPOINTS.APPROVE_PARTICIPANT(tripId, participationId));
    return response.data;
  },

  removeParticipant: async (tripId: string, participationId: string) => {
    const response = await api.delete(TRIP_ENDPOINTS.REMOVE_PARTICIPANT(tripId, participationId));
    return response.data;
  },
};

// Story Service
export const storyService = {
  getAllStories: async () => {
    const response = await api.get(STORY_ENDPOINTS.GET_ALL);
    return response.data;
  },

  createStory: async (storyData: any) => {
    const response = await api.post(STORY_ENDPOINTS.CREATE, storyData);
    return response.data;
  },

  getStory: async (id: string) => {
    const response = await api.get(STORY_ENDPOINTS.GET_ONE(id));
    return response.data;
  },

  updateStory: async (id: string, storyData: any) => {
    const response = await api.put(STORY_ENDPOINTS.UPDATE(id), storyData);
    return response.data;
  },

  deleteStory: async (id: string) => {
    const response = await api.delete(STORY_ENDPOINTS.DELETE(id));
    return response.data;
  },
};

// Destination Service
export const destinationService = {
  getAllDestinations: async () => {
    const response = await api.get(DESTINATION_ENDPOINTS.GET_ALL);
    return response.data;
  },

  createDestination: async (destinationData: any) => {
    const response = await api.post(DESTINATION_ENDPOINTS.CREATE, destinationData);
    return response.data;
  },

  getDestination: async (id: string) => {
    const response = await api.get(DESTINATION_ENDPOINTS.GET_ONE(id));
    return response.data;
  },

  updateDestination: async (id: string, destinationData: any) => {
    const response = await api.put(DESTINATION_ENDPOINTS.UPDATE(id), destinationData);
    return response.data;
  },

  deleteDestination: async (id: string) => {
    const response = await api.delete(DESTINATION_ENDPOINTS.DELETE(id));
    return response.data;
  },
};

// Rating Service
export const ratingService = {
  createRating: async (ratingData: any) => {
    const response = await api.post(RATING_ENDPOINTS.CREATE, ratingData);
    return response.data;
  },

  updateRating: async (id: string, ratingData: any) => {
    const response = await api.put(RATING_ENDPOINTS.UPDATE(id), ratingData);
    return response.data;
  },
};