import { useEffect, useRef, useState } from "react";
import SparksInstrumental from "../assets/Sparks-Instrumental.mp3";

type ValentineLetterProps = {
  onResponse: (response: "yes" | "no") => void;
  allowMusic?: boolean;
};

export default function ValentineLetter({
  onResponse,
  allowMusic = false,
}: ValentineLetterProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    let fadeInterval: ReturnType<typeof setInterval>;

    if (audio) {
      audio.volume = 0;
      if (allowMusic) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              fadeInterval = setInterval(() => {
                if (audio.volume < 0.5) {
                  const newVolume = audio.volume + 0.05;
                  audio.volume = newVolume > 0.5 ? 0.5 : newVolume;
                } else {
                  clearInterval(fadeInterval);
                }
              }, 200);
            })
            .catch((error) => {
              if (
                error.name === "AbortError" ||
                error.name === "NotAllowedError"
              ) {
                // Do nothing, this is expected behavior
                return;
              }
              // Only log real errors
              console.error("Audio playback error:", error);
            });
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    }

    return () => {
      if (fadeInterval) clearInterval(fadeInterval);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [allowMusic]);

  return (
    <div className="valentine-letter">
      <audio ref={audioRef} src={SparksInstrumental} loop />

      <button
        className="music-toggle"
        onClick={() => {
          if (audioRef.current && allowMusic) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
          }
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 100,
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: allowMusic ? "pointer" : "not-allowed",
          opacity: allowMusic ? 1 : 0.5,
        }}
        disabled={!allowMusic}
      >
        {isPlaying && allowMusic ? "🔊" : "🔇"}
      </button>

      <div className="letter-header">
        <h2>Happy Valentine's Day</h2>
      </div>

      <div className="letter-content">
        <p>
          <strong>To Jamie,</strong>
        </p>
        <p>
          Hi love! I'm not really good with big or fancy words,
          <br />
          but I just want to say this simply and honestly.
        </p>

        <p>
          Being with you feels easy.
          <br />
          Comfortable.
          <br />
          Like home.
        </p>

        <p>
          Even our normal days, walking around, eating out, doing nothing
          special, they're my favorite, because I get to spend them with you.
        </p>

        <p>
          That's why this Valentine's Day, I want to do something a little
          different.
        </p>

        <p>
          So consider this my small invitation, let me take you out, spend the
          weekend together, and make a few more memories with you, just us, no
          rush, no pressure, just time together.
        </p>

        <div className="heart-question">
          <h3>Will you be my Valentine and go on this date with me? 💝</h3>
        </div>

        <p>
          Happy Valentine's Day.
          <br />I love you. Always.
        </p>
      </div>

      <div className="letter-footer">
        <div className="signature">Forever yours</div>

        <div className="response-buttons">
          <button
            className="response-btn yes-btn"
            onClick={() => onResponse("yes")}
          >
            Yes! 🌹
          </button>
          <button
            className="response-btn no-btn"
            onClick={(e) => {
              const btn = e.currentTarget;
              btn.classList.add("shake");
              setTimeout(() => {
                btn.classList.remove("shake");
                btn.disabled = true;
                btn.innerText = "Nice try 😏";
              }, 400);
            }}
          >
            No 🚫
          </button>
        </div>
      </div>
    </div>
  );
}
