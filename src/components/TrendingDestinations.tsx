import React, { useEffect } from "react";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

interface DestinationProps {
  name: string;
  cover_image_url: string;
  description: string;
}

export default function TrendingDestinations() {
  const [destinations, setDestinations] = React.useState<DestinationProps[]>(
    []
  );
  useEffect(() => {
    // Fetch trending destinations data
    const fetchDestinations = async () => {
      try {
        const response = await api.get("/destinations");
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);
  return (
    <div className="bg-white rounded-lg p-4 mt-4">
      <Link to={"/explore"}>
        <h3 className="font-semibold mb-4">Trending Destinations</h3>
      </Link>
      {destinations.slice(0, 3).map((dest) => (
        <div key={dest.name} className="mb-4">
          <img
            src={dest.cover_image_url}
            alt={dest.name}
            className="w-full h-24 object-cover rounded-lg mb-2"
          />
          <h4 className="font-medium">{dest.name}</h4>
          <p className="text-sm text-gray-600">{dest.description}</p>
        </div>
      ))}
    </div>
  );
}
