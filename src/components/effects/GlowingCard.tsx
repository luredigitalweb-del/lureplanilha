import type { ReactNode } from "react";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowingCard({ children, className = "" }: GlowingCardProps) {
  return (
    <div className={`glow-card-wrap ${className}`}>
      <div className="glow-card-content">{children}</div>
      <div className="glow-card-border" />
    </div>
  );
}
