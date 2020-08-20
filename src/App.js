import React from "react";
import "./index.css";

import Grid from "./componenets/Grid/Grid.component";
import Buttons from "./componenets/Buttons/Button.component";

export default class App extends React.Component {
  constructor() {
    super();
    this.speed = 1000;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      isPlaying: false,
      fullGrid: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  selectBox = (e, row, col) => {
    e.preventDefault();
    let gridCopy = JSON.parse(JSON.stringify(this.state.fullGrid));
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      fullGrid: gridCopy,
    });
  };

  handleRandom = () => {
    const gridCopy = JSON.parse(JSON.stringify(this.state.fullGrid));
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 10) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      fullGrid: gridCopy,
    });
  };

  handleBoxClick = () => {
    const gridCopy = this.state.fullGrid;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      fullGrid: gridCopy,
    });
  };

  handlePlay = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  handlePause = () => {
    clearInterval(this.intervalId);
  };

  handleSlow = () => {
    this.speed = this.speed + 100;
    this.handlePlay();
  };

  handleFast = () => {
    this.speed = this.speed * 0.5;
    this.handlePlay();
  };

  handleClear = () => {
    this.handlePause();
    let grid = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));
    this.setState({
      fullGrid: grid,
      generation: 0,
      isPlaying: false,
    });
  };

  handleGridSize = (size) => {
    // TODO - add ability to chose a grid size
    this.handleClear();
  };

  play = () => {
    let curGrid = this.state.fullGrid;
    let newGrid = JSON.parse(JSON.stringify(this.state.fullGrid));

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let neighbors = 0;
        // find the neighbors
        i > 0 && curGrid[i - 1][j] && neighbors++;
        i > 0 && j > 0 && curGrid[i - 1][j - 1] && neighbors++;
        i > 0 && j < this.cols - 1 && curGrid[i - 1][j + 1] && neighbors++;
        j < this.cols - 1 && curGrid[i][j + 1] && neighbors++;
        j > 0 && curGrid[i][j - 1] && neighbors++;
        i < this.rows - 1 && curGrid[i + 1][j] && neighbors++;
        i < this.rows - 1 && j > 0 && curGrid[i + 1][j - 1] && neighbors++;
        i < this.rows - 1 &&
          j < this.cols - 1 &&
          curGrid[i + 1][j + 1] &&
          neighbors++;
        // decide between life and death
        curGrid[i][j] &&
          (neighbors < 2 || neighbors > 3) &&
          (newGrid[i][j] = false);
        !curGrid[i][j] && neighbors === 3 && (newGrid[i][j] = true);
      }
    }
    this.setState({
      fullGrid: newGrid,
      generation: this.state.generation + 1,
      isPlaying: true,
    });
  };

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <h2>Generations: {this.state.generation}</h2>
        <Buttons
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleSlow={this.handleSlow}
          handleFast={this.handleFast}
          handleClear={this.handleClear}
          handleRandomGrid={this.handleRandom}
          handleGridSize={this.handleGridSize}
          isPlaying={this.state.isPlaying}
        />
        <Grid
          fullGrid={this.state.fullGrid}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          isPlaying={this.state.isPlaying}
        />
      </div>
    );
  }
}
