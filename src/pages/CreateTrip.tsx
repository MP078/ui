import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Image as ImageIcon,
  DollarSign,
  Plus,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";

interface TripFormData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  description: string;
  activities: string[];
  difficulty: "easy" | "moderate" | "difficult";
  image: string;
  highlights: string[];
  cost: string;
  currency: string;
  summary: {
    totalDays: number;
    totalCost: number;
    highlights: string[];
    photos: string[];
  };
}

const defaultFormData: TripFormData = {
  title: "",
  location: "",
  startDate: "",
  endDate: "",
  maxParticipants: 1,
  description: "",
  activities: [],
  difficulty: "easy",
  image: "",
  highlights: [],
  cost: "0",
  currency: "USD",
  summary: {
    totalDays: 0,
    totalCost: 0,
    highlights: [],
    photos: [],
  },
};

const availableActivities = [
  "Trekking",
  "Photography",
  "Cultural Tours",
  "Adventure Sports",
  "Wildlife",
  "Camping",
  "Local Cuisine",
  "Meditation",
];

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "INR",
  "NPR",
];

export default function CreateTrip() {
  const location = useLocation();
  const navigate = useNavigate();
  const destinationDetails = location.state?.destination;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");

  const [formData, setFormData] = useState<TripFormData>(() => {
    if (destinationDetails) {
      return {
        ...defaultFormData,
        title: `Trip to ${destinationDetails.name}`,
        location: destinationDetails.location,
        description: destinationDetails.description || "",
        difficulty: destinationDetails.difficulty?.toLowerCase() || "easy",
        image: destinationDetails.image || "",
        activities: destinationDetails.activities || [],
        highlights: destinationDetails.highlights || [],

        summary: {
          ...defaultFormData.summary,
          highlights: destinationDetails.highlights || [],
        },
      };
    }
    return defaultFormData;
  });

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    // Calculate total days whenever dates change
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setFormData((prev) => ({
        ...prev,
        summary: {
          ...prev.summary,
          totalDays: diffDays,
          totalCost: Number(prev.cost), // Update total cost to match main cost
        },
      }));
    }
  }, [formData.startDate, formData.endDate]);

  // Update summary cost whenever main cost changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        totalCost: Number(prev.cost),
      },
    }));
  }, [formData.cost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map the difficulty values to match the Trip interface
      let tripDifficulty: "easy" | "medium" | "difficult" | undefined;
      if (formData.difficulty === "moderate") {
        tripDifficulty = "medium";
      } else {
        tripDifficulty = formData.difficulty;
      }

      // Format cost to include currency
      const formattedCost = `${formData.currency} ${formData.cost}`;

      // Create a flattened JSON object with all trip data
      const tripDataFlat = {
        trip_id: `T${new Date().getFullYear()}-${Math.floor(
          Math.random() * 1000
        )}`,
        title: formData.title,
        location: formData.location,
        start_date: formData.startDate,
        end_date: formData.endDate,
        description: formData.description,
        max_participants: formData.maxParticipants,
        difficulty: tripDifficulty,
        cost: formattedCost,
        activities: formData.activities,
        highlights: formData.highlights,
        image_url: formData.image,
        total_days: formData.summary.totalDays,
        total_cost: formData.summary.totalCost,
      };

      // Output JSON data
      console.log(JSON.stringify(tripDataFlat, null, 2));

      // Prepare the trip data
      const tripData = {
        ...formData,
        difficulty: tripDifficulty,
        cost: formattedCost,
      };

      // Original logging
      console.log("Creating trip object:", tripData);
      // Here you would make an API call to create the trip

      //   navigate("/trips");
    } catch (error) {
      console.error("Error creating trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "cost") {
      setFormData((prev) => ({
        ...prev,
        cost: value,
      }));
    } else if (name === "currency") {
      setFormData((prev) => ({
        ...prev,
        currency: value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleActivity = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()],
        summary: {
          ...prev.summary,
          highlights: [...prev.summary.highlights, newHighlight.trim()],
        },
      }));
      setNewHighlight("");
    }
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
      summary: {
        ...prev.summary,
        highlights: prev.summary.highlights.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Create New Trip</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              Basic Information
            </h2>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trip Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                placeholder="Enter trip title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="maxParticipants"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Maximum Participants
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  min="1"
                  max="50"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Trip Details</h2>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                placeholder="Describe your trip..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <div className="flex flex-wrap gap-2">
                {availableActivities.map((activity) => (
                  <button
                    key={activity}
                    type="button"
                    onClick={() => toggleActivity(activity)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.activities.includes(activity)
                        ? "bg-brand-orange text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                required
              >
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Highlights
              </label>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1 bg-gray-50 px-4 py-2 rounded-lg">
                      {highlight}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  />
                  <Button
                    type="button"
                    onClick={addHighlight}
                    disabled={!newHighlight.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cost"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cost Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    id="cost"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  required
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Trip"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
