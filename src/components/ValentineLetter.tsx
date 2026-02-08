type ValentineLetterProps = {
  onResponse: (response: "yes" | "no") => void;
};

export default function ValentineLetter({ onResponse }: ValentineLetterProps) {
  return (
    <div className="valentine-letter">
      <div className="hearts-decoration heart-1">💖</div>
      <div className="hearts-decoration heart-2">💝</div>
      <div className="hearts-decoration heart-3">💕</div>
      <div className="hearts-decoration heart-4">💘</div>

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
