import { MapPin } from "lucide-react";
import { UserProfile } from "../../types/user";

interface UserProfileInfoProps {
  user: UserProfile;
}

export function UserProfileInfo({ user }: UserProfileInfoProps) {
  return (
    <div className="pt-20 px-8">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{user.name}</h1>
        {user.verified && <span className="text-blue-500">✓</span>}
      </div>

      {user.username && (
        <p className="text-gray-500 text-sm">@{user.username}</p>
      )}

      <p className="text-gray-600 mt-1">{user.bio}</p>

      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{user.location}</span>
        </div>

        {/* {user.lastActive && !user.isOnline && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Last active {user.lastActive}</span>
          </div>
        )} */}

        {/* {user.isOnline && <span className="text-green-500">● Online</span>} */}
      </div>

      {user.interests && user.interests.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {user.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
            >
              {interest}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <div className="flex gap-16">
          <div className="text-center">
            <div className="font-semibold text-xl">{user.total_trips}</div>
            <div className="text-gray-600 text-sm">Total Trips</div>
          </div>

          <div className="text-center">
            <div className="font-semibold text-xl">{user.travel_days}</div>
            <div className="text-gray-600 text-sm">Travel Days</div>
          </div>

          <div className="text-center">
            <div className="font-semibold text-xl">{user.connections}</div>
            <div className="text-gray-600 text-sm">Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
}
