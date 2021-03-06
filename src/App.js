import React from "react";
import { Link, Route } from "react-router-dom";
import "./index.css";

import Grid from "./componenets/Grid/Grid.component";
import Buttons from "./componenets/Buttons/Button.component";
import Rules from "./componenets/Rules/Rules";

export default class App extends React.Component {
  constructor() {
    super();
    this.speed = 1000;
    this.rows = 25;
    this.cols = 25;

    this.state = {
      generation: 0,
      isPlaying: false,
      stopStep: false,
      readyToPlay: false,
      fullGrid: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),

      userRows: 25,
      userCols: 25,
    };
  }

  handleSelectBox = (row, col) => {
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
      stopStep: true,
      readyToPlay: true,
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
      stopStep: true,
      readyToPlay: true,
    });
  };

  handlePlay = () => {
    this.setState({ stopStep: false });
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.getGen, this.speed);
  };

  handlePause = () => {
    clearInterval(this.intervalId);
    this.setState({ stopStep: true });
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

  handleGridSizeSubmit = (e) => {
    e.preventDefault();
    this.rows = this.state.userRows;
    this.cols = this.state.userCols;
    this.handleClear();
  };

  handleGridSizeChange = (e) => {
    console.log(e.target.name);
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState({
      // ...this.state,
      [e.target.name]: Number(e.target.value),
    });
    console.log(this.state);
  };

  getGen = () => {
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
      <>
        <Route exact path="/">
          <div className="app">
            <header>
              <Link to="/rules">Rules</Link>
              <h1>The Game of Life</h1>
              <h2>Generations: {this.state.generation}</h2>
              <Buttons
                handlePlay={this.handlePlay}
                handlePause={this.handlePause}
                handleSlow={this.handleSlow}
                handleFast={this.handleFast}
                handleClear={this.handleClear}
                handleRandomGrid={this.handleRandom}
                handleGridSizeSubmit={this.handleGridSizeSubmit}
                handleGridSizeChange={this.handleGridSizeChange}
                readyToPlay={this.readyToPlay}
                isPlaying={this.state.isPlaying}
                stopStep={this.state.stopStep}
                userRows={this.state.userRows}
                userCols={this.state.userCols}
                getGen={this.getGen}
              />
            </header>
            <Grid
              fullGrid={this.state.fullGrid}
              rows={this.rows}
              cols={this.cols}
              handleSelectBox={this.handleSelectBox}
              isPlaying={this.state.isPlaying}
            />
          </div>
        </Route>
        <Route exact path="/rules">
          <Rules />
        </Route>
      </>
    );
  }
}
