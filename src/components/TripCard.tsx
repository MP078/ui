import { Users } from "lucide-react";

interface TripCardProps {
  image: string;
  title: string;
  date: string;
  people: number;
}

export default function TripCard({
  image,
  title,
  date,
  people,
}: TripCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <span>{date}</span>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{people} People</span>
          </div>
        </div>
      </div>
    </div>
  );
}
