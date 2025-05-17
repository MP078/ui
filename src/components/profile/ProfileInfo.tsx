interface ProfileData {
  name: string;
  verified: boolean;
  bio: string;
  languages: string[];
  memberSince: string;
  interests: string[];
  total_trips: number;
  travel_days: number;
  connections: number;
}

export default function ProfileInfo({
  name,
  verified,
  bio,
  languages,
  connections,
  interests,
  memberSince,
  total_trips,
  travel_days,
}: ProfileData) {
  return (
    <div className="pt-20 px-8">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        {verified && <span className="text-blue-500">✓</span>}
      </div>
      <p className="text-gray-600 mt-1">{bio}</p>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <span>{languages.join(", ")}</span>
        <span>•</span>
        <span>{memberSince}</span>
      </div>
      <div className="flex gap-2 mt-3">
        {interests.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <div className="flex gap-16">
          {[
            { label: "Total Trips", value: total_trips },
            { label: "Travel Days", value: travel_days },
            { label: "Connections", value: connections },
          ].map((item) => (
            <div className="text-center" key={item.label}>
              <div className="font-semibold text-xl">{item.value}</div>
              <div className="text-gray-600 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
