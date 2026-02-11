import { useEffect, useState } from "react";
import "../Envelope.css";

type EnvelopeProps = {
  isClosed: boolean;
};

export default function Envelope({ isClosed }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      style={{ cursor: isClosed ? "pointer" : "default" }}
    >
      <div className="envelope">
        {/* Envelope Front */}
        <div className="envelope-front">
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="address">
              <div className="to-label">TO MY VALENTINE</div>
              <div className="recipient">My Jamie</div>
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

      <div className="envelope-glow"></div>

      {/* Sparkle effects */}
      <div className="sparkle s1">✨</div>
      <div className="sparkle s2">✨</div>
      <div className="sparkle s3">✨</div>
    </div>
  );
}
