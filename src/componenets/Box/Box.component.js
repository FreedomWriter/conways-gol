import React from "react";

export default function Box({ boxClass, boxId, row, col, selectBox }) {
  return (
    <div
      className={boxClass}
      id={boxId}
      onClick={(e) => selectBox(e, row, col)}
    />
  );
}
