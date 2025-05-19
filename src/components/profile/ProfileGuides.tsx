import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

const guides = [
  {
    id: 1,
    title: "Ultimate Everest Base Camp Guide",
    description: "A comprehensive guide to preparing and completing the EBC trek",
    location: "Everest Region",
    duration: "14 days",
    groupSize: "8-12 people",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    downloads: 1200,
    pdf: "/guides/my.pdf"
  },
  {
    id: 2,
    title: "Annapurna Circuit Adventure",
    description: "Complete guide to trekking the Annapurna Circuit",
    location: "Annapurna Region",
    duration: "12-15 days",
    groupSize: "6-10 people",
    image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914",
    downloads: 850,
    pdf: "/guides/annapurna-circuit.pdf"
  }
];

export default function ProfileGuides() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {guides.map(guide => (
        <div
          key={guide.id}
          className="relative group bg-white border border-orange-100 rounded-2xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-56 object-cover object-center transition-transform group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {guide.location}
            </span>
            <span className="absolute top-4 right-4 bg-white/80 text-brand-orange text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-orange-100">
              {guide.downloads} downloads
            </span>
          </div>
          <div className="p-6 flex flex-col h-full">
            <h3 className="font-bold text-xl text-brand-orange mb-1 flex items-center gap-2">
              {guide.title}
            </h3>
            <p className="text-gray-700 mb-3 line-clamp-2 min-h-[48px]">{guide.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 bg-orange-100/60 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                <Calendar className="w-4 h-4" />
                <span>{guide.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100/60 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                <Users className="w-4 h-4" />
                <span>{guide.groupSize}</span>
              </div>
            </div>
            <div className="mt-auto flex gap-3 items-center">
              <a
                href={guide.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group/view flex flex-col items-center text-brand-orange hover:text-orange-600 transition-colors"
                title="View Guide"
              >
                <span className="bg-orange-100 p-3 rounded-full shadow-sm mb-1 group-hover/view:bg-orange-200 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M15 12H9" /><path d="M12 8v4l2 2" /></svg>
                </span>
                <span className="text-xs font-semibold">View</span>
              </a>
              <a
                href={guide.pdf}
                download
                className="group/download flex flex-col items-center text-brand-orange hover:text-white transition-colors"
                title="Download Guide"
              >
                <span className="bg-orange-500 p-3 rounded-full shadow-sm mb-1 group-hover/download:bg-orange-600 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v12m0 0l-4-4m4 4l4-4" /><path d="M20 20H4" /></svg>
                </span>
                <span className="text-xs font-semibold group-hover/download:text-orange-100">Download</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}