import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function UserPhotos({ username }: { username: string }) {
  const [photos, setPhotos] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await api.get(`/users/photos`, {
          params: {
            username: username,
          },
        });
        const data = res.data.data;
        const transformed = data.map((photo: unknown) => photo as string);
        setPhotos(transformed);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [username]);

  // Handle Escape key and body scroll
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  const openModal = (photo: string) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          photos.map((photo) => (
            <div
              key={photo}
              className="relative group cursor-pointer"
              onClick={() => openModal(photo)}
            >
              <img
                src={photo}
                alt={photo}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <div className="text-white text-center"></div>
              </div>
            </div>
          ))
        )}
      </div>
      {modalOpen && selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-8 bg-orange-400 bg-opacity-90 hover:bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-white text-3xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedPhoto}
              alt="Selected"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
