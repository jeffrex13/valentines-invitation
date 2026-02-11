import { useState } from "react";
import HeartScene from "./components/HeartScene";
import ValentineLetter from "./components/ValentineLetter";
import Envelope from "./components/Envelope";

type ResponseType = "pending" | "yes" | "no";

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [showLetter, setShowLetter] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType>("pending");

  const handleOpenEnvelope = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      // Wait for envelope animation to complete before showing letter
      setTimeout(() => {
        setShowLetter(true);
      }, 1500); // Match this with envelope animation duration
    }
  };

  const handleResponse = (response: "yes" | "no") => {
    setResponse(response);
  };

  const handleReset = () => {
    setIsEnvelopeOpen(false);
    setShowLetter(false);
    setResponse("pending");
  };

  return (
    <div className="letter-container">
      {/* 3D Heart Scene - Always in background */}
      <HeartScene />

      {/* Closed Envelope - Initial state */}
      {!isEnvelopeOpen && (
        <div className="envelope-landing" onClick={handleOpenEnvelope}>
          <Envelope isClosed={true} />
          <div className="open-hint">
            <p>📬 Open Me! 💌</p>
          </div>
        </div>
      )}

      {/* Opening Envelope Animation */}
      {isEnvelopeOpen && !showLetter && (
        <div className="envelope-landing">
          <Envelope isClosed={false} />
        </div>
      )}

      {/* Valentine Letter - appears after envelope opens */}
      {showLetter && response === "pending" && (
        <ValentineLetter onResponse={handleResponse} />
      )}

      {/* Response Screens */}
      {response === "yes" && (
        <div className="success-screen">
          <h1>🎉 You've Made Me So Happy! 💝</h1>
          <p>I can't wait to celebrate this special day with you!</p>
          <p>
            Get ready for an unforgettable Valentine's Day filled with love and
            joy.
          </p>
          <div
            className="hearts"
            style={{ fontSize: "3rem", margin: "2rem 0" }}
          >
            💝🌹✨
          </div>
          <button
            className="open-btn"
            onClick={handleReset}
            style={{ background: "linear-gradient(45deg, #4CAF50, #8BC34A)" }}
          >
            Experience Again
          </button>
        </div>
      )}

      {response === "no" && (
        <div className="rejection-screen">
          <h1>💔 That's Okay...</h1>
          <p>My feelings for you remain true regardless.</p>
          <p>Thank you for being honest. I still cherish our connection.</p>
          <button
            className="open-btn"
            onClick={handleReset}
            style={{ marginTop: "2rem" }}
          >
            Read Again
          </button>
        </div>
      )}
    </div>
  );
}
