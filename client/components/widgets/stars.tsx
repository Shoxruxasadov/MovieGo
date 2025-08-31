import React, { useMemo } from "react";

interface StarsProps {
  stars: number;
}

export default function Stars({ stars }: StarsProps) {
  const ids = useMemo(
    () => Array.from({ length: 5 }, () => crypto.randomUUID()),
    []
  );

  return (
    <div className="stars">
      <svg style={{ display: "none" }}>
        <defs>
          <symbol viewBox="0 0 32 32" id="star">
            <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
          </symbol>
        </defs>
      </svg>

      {ids.map((id, index) => {
        const filled = stars >= index * 2 + 0.1;
        const halfFilled = stars >= index * 2 + 1.1;

        return (
          <svg key={id} className="c-icon" width="14" height="14" viewBox="0 0 32 32">
            <use href="#star" fill={`url(#${id})`} />
            <defs>
              <linearGradient id={id} x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor={filled ? "#E50000" : "#f3f3f3a3"} />
                <stop offset="50%" stopColor={halfFilled ? "#E50000" : "#f3f3f3a3"} />
              </linearGradient>
            </defs>
          </svg>
        );
      })}
    </div>
  );
}