import React from "react";

export default function Button({
  handlePlay,
  handlePause,
  handleSlow,
  handleFast,
  handleClear,
  handleRandomGrid,
  handleGridSizeSubmit,
  handleGridSizeChange,
  isPlaying,
  userRows,
  userCols,
  getGen,

}) {
  return (
    <div className="container">
      <div className="button-container">
        <button onClick={handlePlay}>Play</button>

        <button onClick={getGen}>Step</button>

        <button onClick={handlePause} disabled={!isPlaying}>
          Pause
        </button>
        <button onClick={handleSlow} disabled={!isPlaying}>
          Slower
        </button>
        <button onClick={handleFast} disabled={!isPlaying}>
          Faster
        </button>
        <button onClick={handleClear} disabled={!isPlaying}>
          Clear
        </button>
        <button onClick={handleRandomGrid} disabled={isPlaying}>

          Seed

        </button>
      </div>
      <form onSubmit={(e) => handleGridSizeSubmit(e)}>
        <label htmlFor="userRows">Rows</label>
        <input
          onChange={(e) => handleGridSizeChange(e)}
          id="userRows"
          name="userRows"
          value={userRows}
        />
        <label htmlFor="userCols">Columns</label>
        <input
          onChange={(e) => handleGridSizeChange(e)}
          id="userCols"
          name="userCols"
          value={userCols}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
