import { useState } from "react";
import HeartScene from "./components/HeartScene";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started && (
        <div className="overlay">
          <h1>Hi love 💕</h1>
          <button onClick={() => setStarted(true)}>Open it</button>
        </div>
      )}

      <HeartScene showMessage={started} />
    </>
  );
}
