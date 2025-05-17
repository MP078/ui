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
import { api, downloadImageFromUrl } from "../lib/api";

interface TripFormData {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  description: string;
  activities: string[];
  difficulty: "easy" | "medium" | "hard";
  image: string;
  imageFile: File | null; // For local file uploads
  imageSource: "url" | "file"; // Track the source of the image
  highlights: string[];
  costMin: string;
  costMax: string;
  currency: string;
  costNote: string;
  totalDays: number;
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
  imageFile: null,
  imageSource: "url",
  highlights: [],
  costMin: "0",
  costMax: "0",
  currency: "NPR",
  costNote: "",
  totalDays: 0,
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
        totalDays: diffDays,
      }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate image URL if using URL as image source
      if (formData.imageSource === "url" && formData.image) {
        const isValidUrl = await validateImageUrl(formData.image);
        if (!isValidUrl) {
          alert(
            "The image URL provided is not valid or the image is not accessible. Please check the URL and try again."
          );
          setIsSubmitting(false);
          return;
        }
      }
      const tripDifficulty = formData.difficulty as "easy" | "medium" | "hard";

      // Format cost to include currency and note
      let currencySymbol = "";
      switch (formData.currency) {
        case "NPR":
          currencySymbol = "Rs.";
          break;
        case "USD":
          currencySymbol = "$";
          break;
        case "EUR":
          currencySymbol = "€";
          break;
        case "GBP":
          currencySymbol = "£";
          break;
        default:
          currencySymbol = formData.currency;
      }

      const formattedCost = `${currencySymbol} ${
        formData.costMin
      } - ${currencySymbol} ${formData.costMax} ${
        formData.costNote ? `(${formData.costNote})` : ""
      }`;

      // Create FormData object for multipart/form-data submission (needed for file uploads)
      const formDataToSend = new FormData();

      // Add all text fields to FormData
      formDataToSend.append("title", formData.title);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("start_date", formData.startDate);
      formDataToSend.append("end_date", formData.endDate);
      formDataToSend.append(
        "maximum_participants",
        formData.maxParticipants.toString()
      );
      formDataToSend.append("description", formData.description);
      formDataToSend.append("difficulty", tripDifficulty);
      formDataToSend.append("cost", formattedCost);

      // Add arrays as repeated keys (Rails expects this)
      formData.activities.forEach((activity) => {
        formDataToSend.append("activities[]", activity);
      });
      formData.highlights.forEach((highlight) => {
        formDataToSend.append("highlights[]", highlight);
      });

      // Handle image upload based on source
      if (formData.imageSource === "file" && formData.imageFile) {
        // If using local file, append it directly to FormData
        formDataToSend.append("cover_image", formData.imageFile);
        console.log("Using uploaded image file:", formData.imageFile.name);
      } else if (formData.imageSource === "url" && formData.image) {
        try {
          // Show progress indicator
          console.log("Downloading image from URL...");

          // Download the image from URL and convert to file
          const imageFile = await downloadImageFromUrl(formData.image);
          if (imageFile) {
            formDataToSend.append("cover_image", imageFile);
            console.log("Downloaded and using image from URL:", formData.image);
          } else {
            // Fallback to URL if download fails
            formDataToSend.append("cover_image_url", formData.image);
            console.log("Using image URL (download failed):", formData.image);
          }
        } catch (error) {
          console.error("Error downloading image from URL:", error);
          console.log("Using image URL (download failed):", formData.image);

          // If API doesn't support URL processing, we can throw an error here instead
          // Uncomment this if your API requires file uploads
          // alert("Failed to download image from URL. Please save the image locally and upload it as a file.");
          // setIsSubmitting(false);
          // return;
        }
      }

      console.log("Trip data being sent to API (FormData)");

      // Send data to the server
      const response = await api.post("/trips", formDataToSend);
      console.log("Trip created successfully:", response.data);

      // Show success message and navigate
      alert("Trip created successfully!");
      navigate("/trips");
    } catch (error: unknown) {
      console.error("Error creating trip:", error);

      // Handle different types of errors
      let errorMessage = "Unknown error occurred";
      if (error && typeof error === "object") {
        if (
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
        ) {
          errorMessage = String(error.response.data.message);
        } else if ("message" in error) {
          errorMessage = String(error.message);
        }
      }

      // Show a user-friendly error message
      alert(`Failed to create trip: ${errorMessage}`);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      }));
      setNewHighlight("");
    }
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i: number) => i !== index),
    }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        alert(`Image is too large. Maximum size is 5MB.`);
        return;
      }

      // Update state with the selected file
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        // Clear the image URL when using a file
        image: "",
      }));

      // Preview is automatically handled in the JSX with URL.createObjectURL
    }
  };

  const validateImageUrl = async (url: string): Promise<boolean> => {
    // Return true immediately during development for local URLs
    if (
      url.startsWith("http://localhost") ||
      url.startsWith("https://localhost")
    ) {
      return true;
    }

    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);

      img.src = url;
    });
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
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, imageSource: "url" }))
                    }
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.imageSource === "url"
                        ? "bg-brand-orange text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, imageSource: "file" }))
                    }
                    className={`px-4 py-2 rounded-full text-sm ${
                      formData.imageSource === "file"
                        ? "bg-brand-orange text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {formData.imageSource === "url" ? (
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
                      required={formData.imageSource === "url"}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {formData.imageFile && (
                      <p className="text-sm text-gray-500">
                        Selected file: {formData.imageFile.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Preview if image is available */}
                {(formData.image || formData.imageFile) && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                    <div className="relative">
                      <img
                        src={
                          formData.imageFile
                            ? URL.createObjectURL(formData.imageFile)
                            : formData.image
                        }
                        alt="Cover preview"
                        className="w-full max-h-40 object-cover rounded-lg"
                        onError={(e) => {
                          // Show placeholder on error
                          e.currentTarget.src = "/public/placeholders/trip.png";
                          // Show error message
                          alert(
                            "Failed to load image preview. The URL might be invalid or inaccessible."
                          );
                        }}
                      />

                      {/* Clear image button */}
                      {(formData.image || formData.imageFile) && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              image: "",
                              imageFile: null,
                            }));
                          }}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
                          title="Clear image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
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

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="costMin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Cost
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      id="costMin"
                      name="costMin"
                      value={formData.costMin}
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
                    htmlFor="costMax"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Maximum Cost
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      id="costMax"
                      name="costMax"
                      value={formData.costMax}
                      onChange={handleChange}
                      min={formData.costMin}
                      step="0.01"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label
                    htmlFor="costNote"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cost Note (Optional)
                  </label>
                  <input
                    type="text"
                    id="costNote"
                    name="costNote"
                    value={formData.costNote}
                    onChange={handleChange}
                    placeholder="e.g. excluding flights"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Trip"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
