import React from "react";

export default function Button({
  handlePlay,
  handlePause,
  handleSlow,
  handleFast,
  handleClear,
  handleRandomGrid,
  handleGridSize,
  isPlaying,
}) {
  return (
    <div className="button-container">
      <button onClick={(e) => handlePlay(e)}>Play</button>
      <button onClick={(e) => handlePause(e)}>Pause</button>
      <button onClick={(e) => handleSlow(e)}>Slower</button>
      <button onClick={(e) => handleFast(e)}>Faster</button>
      <button onClick={(e) => handleClear(e)}>Clear</button>
      <button onClick={(e) => handleRandomGrid(e)} disabled={isPlaying}>
        Random
      </button>
      <button onClick={(e) => handleGridSize(e)}>Grid Size</button>
    </div>
  );
}
