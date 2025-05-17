import { Link, useLocation } from "react-router-dom";

interface UserNavProps {
  username: string;
}

export function UserNav({ username }: UserNavProps) {
  const location = useLocation();

  const navItems = [
    { path: `/user/${username}`, label: "Posts" },
    { path: `/user/${username}/photos`, label: "Photos" },
    { path: `/user/${username}/reviews`, label: "Reviews" },
    { path: `/user/${username}/guides`, label: "Guides" },
    { path: `/user/${username}/about`, label: "About" },
  ];

  return (
    <div className="bg-white border-t border-b mt-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <nav className="flex gap-8 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 px-2 font-medium relative whitespace-nowrap ${
                location.pathname === item.path
                  ? "text-brand-orange"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
