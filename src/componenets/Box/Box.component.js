import React from "react";

export default function Box({
  boxClass,
  boxId,
  row,
  col,
  handleSelectBox,
  isPlaying,
}) {
  return (
    <div
      className={boxClass}
      id={boxId}
      onClick={() => !isPlaying && handleSelectBox(row, col)}
    />
  );
}
