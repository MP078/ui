import { getAvatarNumber } from '../context/UserContext';

export interface AvatarInput {
  id?: string;
  username?: string;
  image_url?: string;
  profile_image?: string;
}

/**
 * Returns the best avatar URL for a user, given possible fields.
 * Priority: image_url > profile_image > id > username > placeholder
 */
export function getAvatarUrl({ id, username, image_url, profile_image }: AvatarInput): string {
  if (image_url) return image_url;
  if (profile_image) return profile_image;
  if (id) return `/avatars/${getAvatarNumber(id.toString())}.png`;
  if (username) return `/avatars/${getAvatarNumber(username)}.png`;
  return 'https://via.placeholder.com/64';
}
