import React from "react";

export default function Rules() {
  return (
    <div className="rules">
      <p>
        Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
      </p>
      <p>
        Any live cell with two or three live neighbours lives on to the next
        generation.
      </p>
      <p>
        Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </p>
      <p>
        Any dead cell with exactly three live neighbours becomes a live cell, as
        if by reproduction.
      </p>
    </div>
  );
}
