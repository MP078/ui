import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import { User } from "../../context/UserContext";

export default function ProfileAbout({ user }: { user: User }) {
  if (!user) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <p className="text-gray-600">User information is not available.</p>
      </div>
    );
  }

  const {
    location,
    email,
    phone,
    website,
    languages,
    interests,
    certifications,
    about,
  } = user;
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-600">{about}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Globe2 className="w-5 h-5" />
            <span>{website}</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Languages</h2>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <span
              key={language}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
