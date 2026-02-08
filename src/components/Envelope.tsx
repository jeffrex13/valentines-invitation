import { useEffect, useState } from "react";
import "../Envelope.css";

type EnvelopeProps = {
  isClosed: boolean;
};

export default function Envelope({ isClosed }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Remove the useEffect that causes the warning
  // Instead, derive isOpen from isClosed prop
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsOpen(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isClosed]);

  return (
    <div
      className={`envelope-container ${isClosed ? "closed" : ""} ${
        isOpen ? "open" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: isClosed ? "pointer" : "default" }}
    >
      <div className="envelope">
        {/* Envelope Front */}
        <div className="envelope-front">
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="address">
              <div className="to-label">TO MY VALENTINE</div>
              <div className="recipient">My Beloved</div>
              <div className="from-label">With all my love 💕</div>
            </div>
          </div>
        </div>

        {/* Wax seal - positioned on top of envelope body */}
        <div className="seal">
          <div className="seal-heart">❤️</div>
        </div>

        {/* Envelope Back - Empty for realistic opening */}
        <div className="envelope-back"></div>
      </div>

      {/* Letter that appears outside the envelope */}
      <div className="envelope-letter">
        <div className="letter-inside">
          <div className="letter-content-mini">
            <div className="heart-pulse">💝</div>
            {isClosed && isHovered && (
              <div className="click-hint">Click to open</div>
            )}
          </div>
        </div>
      </div>

      <div className="envelope-glow"></div>

      {/* Sparkle effects */}
      <div className="sparkle s1">✨</div>
      <div className="sparkle s2">✨</div>
      <div className="sparkle s3">✨</div>
    </div>
  );
}
