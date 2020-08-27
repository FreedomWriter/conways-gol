import React from "react";

import { Link } from "react-router-dom";

export default function Rules() {
  return (
    <div className="rules">
      <Link to="/">Play</Link>
      <a
        className="wiki"
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
      >
        Wiki
      </a>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970. It is a
        zero-player game, meaning that its evolution is determined by its
        initial state, requiring no further input. One interacts with the Game
        of Life by creating an initial configuration and observing how it
        evolves. It is Turing complete and can simulate a universal constructor
        or any other Turing machine.
      </p>
      <p>
        1. Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
      </p>
      <p>
        2. Any live cell with two or three live neighbours lives on to the next
        generation.
      </p>
      <p>
        3. Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </p>
      <p>
        4. Any dead cell with exactly three live neighbours becomes a live cell,
        as if by reproduction.
      </p>
    </div>
  );
}
