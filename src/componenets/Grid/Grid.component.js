import React from "react";
import Box from "../Box/Box.component";

export default function Grid({
  rows,
  cols,
  fullGrid,
  handleSelectBox,
  isPlaying,
}) {
  const width = cols * 16 + 1;
  let rowsArr = [];
  let boxClass = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let boxId = i + "_" + j;

      boxClass = fullGrid[i][j] ? "box on" : "box off";

      rowsArr.push(
        <Box
          boxClass={boxClass}
          boxId={boxId}
          key={boxId}
          row={i}
          col={j}
          handleSelectBox={handleSelectBox}
          isPlaying={isPlaying}
        />
      );
    }
  }
  return (
    <section className="grid" style={{ width: width }}>
      {rowsArr}
    </section>
  );
}
