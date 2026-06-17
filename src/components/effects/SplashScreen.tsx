import { useEffect, useState } from "react";
import logo from "@/assets/lure-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1200);
    const doneTimer = setTimeout(() => onComplete(), 1800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ease-out ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logo}
        alt="Lure Digital"
        className="h-20 w-auto animate-fade-in"
      />
    </div>
  );
}
