import { useState } from "react";
import HeartScene from "./components/HeartScene";
import ValentineLetter from "./components/ValentineLetter";

type ResponseType = "pending" | "yes" | "no";

export default function App() {
  const [started, setStarted] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType>("pending");

  const handleResponse = (response: "yes" | "no") => {
    setResponse(response);
  };

  return (
    <div className="letter-container">
      {!started && (
        <div className="overlay">
          <h1>My Dearest Valentine 💕</h1>
          <p>
            A special letter awaits you. Click below to open this heartfelt
            message.
          </p>
          <button className="open-btn" onClick={() => setStarted(true)}>
            Open My Heart's Letter
          </button>
        </div>
      )}

      <HeartScene />

      {started && response === "pending" && (
        <ValentineLetter onResponse={handleResponse} />
      )}

      {response === "yes" && (
        <div className="success-screen">
          <h1>🎉 You've Made Me So Happy! 💝</h1>
          <p>
            I can't wait to celebrate this special day with you! Get ready for
            an unforgettable Valentine's Day filled with love and joy.
          </p>
          <div
            className="hearts"
            style={{
              fontSize: "3rem",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            💕💖💝🌹✨
          </div>
          <button
            className="open-btn"
            onClick={() => {
              setStarted(false);
              setResponse("pending");
            }}
            style={{ background: "linear-gradient(45deg, #4CAF50, #8BC34A)" }}
          >
            Experience Again
          </button>
        </div>
      )}

      {response === "no" && (
        <div className="rejection-screen">
          <h1>💔 That's Okay...</h1>
          <p>
            My feelings for you remain true regardless. Thank you for being
            honest. I still cherish our connection.
          </p>
          <button
            className="open-btn"
            onClick={() => {
              setStarted(false);
              setResponse("pending");
            }}
            style={{ marginTop: "2rem" }}
          >
            Read Again
          </button>
        </div>
      )}
    </div>
  );
}
