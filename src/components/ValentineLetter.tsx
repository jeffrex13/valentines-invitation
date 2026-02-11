import { useEffect, useRef, useState } from 'react';
import SparksInstrumental from '../assets/Sparks-Instrumental.mp3';

type ValentineLetterProps = {
  onResponse: (response: "yes" | "no") => void;
};

export default function ValentineLetter({ onResponse }: ValentineLetterProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.5;
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="valentine-letter">
      <audio ref={audioRef} src={SparksInstrumental} loop />

      <button 
        className="music-toggle"
        onClick={() => {
          if(audioRef.current) {
            if(isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
          }
        }}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 100, background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>

      <div className="letter-header">
        <h2>To My Beloved</h2>
        <div className="date">February 14th</div>
      </div>

      <div className="letter-content">
        <p>
          My dearest, as you see this heart floating before you, know that it
          beats only for you. Every rotation, every glow, every shimmer is a
          reflection of my feelings.
        </p>

        <p>
          From the moment our paths crossed, my world gained colors I never knew
          existed. Your smile became my sunrise, your laughter my favorite
          melody, and your presence my greatest comfort.
        </p>

        <p>
          This Valentine's Day, I want to make a simple request —
          <strong> a request to call you mine</strong>, to cherish you, to
          create memories that sparkle brighter than any star in this
          simulation.
        </p>

        <p>
          So here I am, with a digital heart that pales in comparison to the
          real one you hold in your hands, asking the most important question of
          this year...
        </p>

        <div className="heart-question">
          <h3>Will you be my Valentine? 💝</h3>
          <p>This heart beats only for you</p>
        </div>
      </div>

      <div className="letter-footer">
        <div className="signature">
          With all my love,
          <br />
          Your Valentine
        </div>

        <div className="response-buttons">
          <button
            className="response-btn yes-btn"
            onClick={() => onResponse("yes")}
          >
            Yes! 🌹
          </button>
          <button
            className="response-btn no-btn"
            onClick={() => onResponse("no")}
          >
            Maybe Later 💕
          </button>
        </div>
      </div>
    </div>
  );
}
