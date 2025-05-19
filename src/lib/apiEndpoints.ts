// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/sign_in',
  REGISTER: '/auth/sign_up',
  LOGOUT: '/auth/sign_out',
  VALIDATE_TOKEN: '/auth/validate_token',
};

// User endpoints
export const USER_ENDPOINTS = {
  GET_ALL: '/users',
  GET_USER: (username: string) => `/users/${username}`,
  UPDATE_USER: (username: string) => `/users/${username}`,
};

// Friendship endpoints
export const FRIENDSHIP_ENDPOINTS = {
  GET_ALL: '/friendships',
  SEND_REQUEST: (username: string) => `/friendships/${username}`,
  ACCEPT_REQUEST: (username: string) => `/friendships/${username}/accept`,
  REJECT_REQUEST: (username: string) => `/friendships/${username}/reject`,
  REMOVE_FRIEND: (username: string) => `/friendships/${username}`,
};

// Post endpoints
export const POST_ENDPOINTS = {
  GET_ALL: '/posts',
  CREATE: '/posts',
  GET_ONE: (id: string) => `/posts/${id}`,
  UPDATE: (id: string) => `/posts/${id}`,
  DELETE: (id: string) => `/posts/${id}`,
  LIKE: (id: string) => `/posts/${id}/like`,
  UNLIKE: (id: string) => `/posts/${id}/unlike`,
  GET_COMMENTS: (postId: string) => `/posts/${postId}/comments`,
  CREATE_COMMENT: (postId: string) => `/posts/${postId}/comments`,
};

// Comment endpoints
export const COMMENT_ENDPOINTS = {
  GET_ALL: '/comments',
  CREATE: '/comments',
  GET_ONE: (id: string) => `/comments/${id}`,
  UPDATE: (id: string) => `/comments/${id}`,
  DELETE: (id: string) => `/comments/${id}`,
  LIKE: (id: string) => `/comments/${id}/like`,
  UNLIKE: (id: string) => `/comments/${id}/unlike`,
};

// Trip endpoints
export const TRIP_ENDPOINTS = {
  GET_ALL: '/trips',
  CREATE: '/trips',
  GET_ONE: (id: string) => `/trips/${id}`,
  UPDATE: (id: string) => `/trips/${id}`,
  DELETE: (id: string) => `/trips/${id}`,
  JOIN: (tripId: string) => `/trips/${tripId}/trip_participations`,
  LEAVE: (tripId: string) => `/trips/${tripId}/trip_participations/leave`,
  PROMOTE_PARTICIPANT: (tripId: string, participationId: string) => 
    `/trips/${tripId}/trip_participations/${participationId}/promote`,
  APPROVE_PARTICIPANT: (tripId: string, participationId: string) => 
    `/trips/${tripId}/trip_participations/${participationId}/approve`,
  REMOVE_PARTICIPANT: (tripId: string, participationId: string) => 
    `/trips/${tripId}/trip_participations/${participationId}`,
};

// Story endpoints
export const STORY_ENDPOINTS = {
  GET_ALL: '/stories',
  CREATE: '/stories',
  GET_ONE: (id: string) => `/stories/${id}`,
  UPDATE: (id: string) => `/stories/${id}`,
  DELETE: (id: string) => `/stories/${id}`,
};

// Destination endpoints
export const DESTINATION_ENDPOINTS = {
  GET_ALL: '/destinations',
  CREATE: '/destinations',
  GET_ONE: (id: string) => `/destinations/${id}`,
  UPDATE: (id: string) => `/destinations/${id}`,
  DELETE: (id: string) => `/destinations/${id}`,
};

// Rating endpoints
export const RATING_ENDPOINTS = {
  CREATE: '/ratings',
  UPDATE: (id: string) => `/ratings/${id}`,
};