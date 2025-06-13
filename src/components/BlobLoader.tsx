import { GridLoader  } from "react-spinners";
import { useEffect, useState } from "react";

export default function BlobLoader({ isLoaded }: { isLoaded: boolean }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Wait for fade-out transition before removing from DOM
      const timeout = setTimeout(() => setHide(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      } bg-[#0f172a]`}
    >
      <div className="flex flex-col items-center">
        <GridLoader  color="#38bdf8" size={20} />
      </div>
    </div>
  );
} 