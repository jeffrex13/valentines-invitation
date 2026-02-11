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
      {showLetter && (response === "pending" || response === "yes") && (
        <ValentineLetter onResponse={handleResponse} allowMusic={true} />
      )}

      {/* Response Screens */}
      {response === "yes" && (
        <div className="success-screen">
          {/* Animated hearts */}
          <div className="success-hearts">
            <span
              className="success-heart"
              style={{ left: "15%", top: "60%", animationDelay: "0s" }}
            >
              💖
            </span>
            <span
              className="success-heart"
              style={{ left: "35%", top: "70%", animationDelay: "0.5s" }}
            >
              💝
            </span>
            <span
              className="success-heart"
              style={{ left: "60%", top: "65%", animationDelay: "1s" }}
            >
              💘
            </span>
            <span
              className="success-heart"
              style={{ left: "80%", top: "75%", animationDelay: "1.5s" }}
            >
              💗
            </span>
          </div>
          {/* Sparkles */}
          <span
            className="success-sparkle"
            style={{ left: "25%", top: "30%", animationDelay: "0.2s" }}
          >
            ✨
          </span>
          <span
            className="success-sparkle"
            style={{ left: "70%", top: "25%", animationDelay: "0.7s" }}
          >
            ✨
          </span>
          <span
            className="success-sparkle"
            style={{ left: "50%", top: "10%", animationDelay: "1.1s" }}
          >
            ✨
          </span>
          {/* Confetti (simple emoji confetti) */}
          <div className="confetti">
            <span
              style={{
                position: "absolute",
                left: "10%",
                top: "10%",
                fontSize: "2rem",
                animation: "floatHeart 2.2s infinite",
                animationDelay: "0.1s",
              }}
            >
              🎊
            </span>
            <span
              style={{
                position: "absolute",
                left: "80%",
                top: "15%",
                fontSize: "2rem",
                animation: "floatHeart 2.5s infinite",
                animationDelay: "0.3s",
              }}
            >
              🎉
            </span>
            <span
              style={{
                position: "absolute",
                left: "40%",
                top: "5%",
                fontSize: "2rem",
                animation: "floatHeart 2.7s infinite",
                animationDelay: "0.5s",
              }}
            >
              🎊
            </span>
            <span
              style={{
                position: "absolute",
                left: "60%",
                top: "20%",
                fontSize: "2rem",
                animation: "floatHeart 2.3s infinite",
                animationDelay: "0.7s",
              }}
            >
              🎉
            </span>
          </div>
          <h1>You've Made Me So Happy! 💝</h1>
          <p>I can't wait to celebrate this special day with you!</p>
          <p>
            Get ready for an unforgettable Valentine's Day filled with love and
            joy.
          </p>
          <button
            className="open-btn"
            onClick={handleReset}
            style={{
              background: "linear-gradient(45deg, #ff3366, #ff99cc)",
              color: "#fff",
              border: "none",
              boxShadow: "0 2px 8px rgba(255,51,102,0.15)",
              fontWeight: "bold",
            }}
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
}
