import React, { useEffect, useState } from "react";
import { StatModal } from "./StatModal";

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  details: React.ReactNode;
}

export function StatCard({ icon, label, value, details }: StatCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow duration-200 w-full"
      >
        <span className="text-2xl">{icon}</span>
        <div className="text-left">
          <div className="font-semibold text-xl">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </button>

      <StatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${label} Details`}
      >
        {details}
      </StatModal>
    </>
  );
}
