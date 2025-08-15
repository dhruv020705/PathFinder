import React, { Component } from 'react';
import Node from '../Node/Node.js';
import { dijkstra, getNodesInShortestPathOrderDijkstra } from '../Algorithms/dijkstra';
import { bfs, getNodesInShortestPathOrderBFS } from '../Algorithms/bfs';
import { dfs, getNodesInShortestPathOrderDFS } from '../Algorithms/dfs';
import './Visualizer.css';
import red from '../Img/Red.png';
import green from '../Img/green.png';
import yellow from '../Img/yellow.jpeg';
import blue from '../Img/blue.png';
import { Button, Navbar, Image } from 'react-bootstrap';

let sr = 7;
let sc = 15;
let fr = 18;
let fc = 45;

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      START_NODE_ROW: 7,
      START_NODE_COL: 15,
      FINISH_NODE_ROW: 18,
      FINISH_NODE_COL: 45,
      done: false,
      changedSource: false,
      changedDest: false,
      stop: false,
    }

  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const node = this.state.grid[row][col];
    if (this.state.changedSource === true) {

      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-src';
      this.setState({
        START_NODE_ROW: row,
        START_NODE_COL: col,
        changedSource: false
      }, () => {
        //console.log("changed source true section");
        //console.log(this.state.START_NODE_ROW);
      });

      //console.log(this.state.START_NODE_ROW);
      //console.log(row);
    } else if (this.state.changedDest === true) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-dest';
      this.setState({
        FINISH_NODE_ROW: row,
        FINISH_NODE_COL: col,
        changedDest: false
      }, () => {
        //console.log("changed dest true section");
        //console.log(this.state.FINISH_NODE_ROW);
      });
    } else if (row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL && this.state.changedSource === false) {

      const newGrid = setPreviousSourcef(this.state.grid, row, col);
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      //console.log(this.state.START_NODE_ROW);
      this.setState({
        grid: newGrid,
        changedSource: true
      }, () => {
        console.log("Current start node row ");
        console.log(this.state.START_NODE_ROW);
      });
    } else if (row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL && this.state.changedDest === false) {

      const newGrid = setPreviousDestf(this.state.grid, row, col);
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
      //console.log(this.state.START_NODE_ROW);
      this.setState({
        grid: newGrid,
        changedDest: true
      }, () => {
        console.log("Current finish node row ");
        console.log(this.state.FINISH_NODE_ROW);
      });
    } else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true }, () => {
        console.log("state changed");
      });
    }

  }

  handleMouseEnter(row, col) {
    if (this.state.changedSource === false || this.state.changedDest === false) {
      if (!this.state.mouseIsPressed) return;
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp(row, col) {

    if (this.state.changedSource === true) {
      //changing the source
      console.log("changed source true section mouseup");
    } else if (this.state.changedDest === true) {
      //changing destination
    } else {
      this.setState({ mouseIsPressed: false });
    }
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {

      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.row === this.state.START_NODE_ROW && node.col === this.state.START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-src';
        } else if (node.row === this.state.FINISH_NODE_ROW && node.col === this.state.FINISH_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-dest';

        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }

  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {

      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.row === this.state.START_NODE_ROW && node.col === this.state.START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-src';
        } else if (node.row === this.state.FINISH_NODE_ROW && node.col === this.state.FINISH_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-dest';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }
      }, 50 * i);

    }
  }
  //the below lines 
  visualizeDijkstra() {

    if (this.state.done === true) {
      alert("Clear the grid First");
    } else {
      document.getElementById(`node-${this.state.START_NODE_ROW}-${this.state.START_NODE_COL}`).className =
        'node node-shortest-path';
      const { grid } = this.state;
      const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);

      const nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(finishNode);
      // console.log(visitedNodesInOrder);
      this.setState({ 'done': true });
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  //the below lines calls the bfs function to traverse the grid
  visualizeBFS() {
    // sr = this.state.START_NODE_ROW;
    // sc = this.state.START_NODE_COL;
    if (this.state.done === true) {
      alert("Clear the grid First");
    } else {
      console.log(this.state.START_NODE_ROW);
      const { grid } = this.state;
      const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      const visitedNodesInOrder = bfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
      //console.table(visitedNodesInOrder[0]);
      // alert("BFS is going to execute");
      this.setState({ 'done': true });
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
      //console.log(visitedNodesInOrder.length);
    }
  }

  visualizeDFS() {
    // sr = this.state.START_NODE_ROW;
    // sc = this.state.START_NODE_COL;
    if (this.state.done === true) {
      alert("Clear the grid First");
      // console.log("Clear the grid dfs");

    } else {
      console.log(this.state.START_NODE_ROW);
      const { grid } = this.state;
      const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      const visitedNodesInOrder = dfs(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode, startNode);
      this.setState({ 'done': true });
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  refresh() {
    window.location.reload(false);
  }

  cleargrid() {
    // const {grid} = this.state;

    // console.log("this is the clear grid");
    // console.log(this.state.START_NODE_ROW);
    sr = this.state.START_NODE_ROW;
    sc = this.state.START_NODE_COL;
    fr = this.state.FINISH_NODE_ROW;
    fc = this.state.FINISH_NODE_COL;
    this.componentDidMount();
    const grid = getInitialGrid();
    this.setState({ grid });
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        document.getElementById(`node-${row}-${col}`).className = 'node';
      }
    }
    document.getElementById(`node-${this.state.START_NODE_ROW}-${this.state.START_NODE_COL}`).className = 'node node-src';
    document.getElementById(`node-${this.state.FINISH_NODE_ROW}-${this.state.FINISH_NODE_COL}`).className = 'node node-dest';
    this.setState({ 'done': false });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <div onClick={() => this.refresh()}>
              MazeMapper
            </div>
          </Navbar.Brand>
        </Navbar>
        <div>
          <div className="button">
            <Button variant="success" size="lg" onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </Button>
            {'   '}
            <Button variant="success" size="lg" onClick={() => this.visualizeDFS()}>
              Visualize DFS Algorithm
            </Button>
            {'   '}
            <Button variant="success" size="lg" onClick={() => this.visualizeBFS()}>
              Visualize BFS Algorithm
            </Button>
            {'   '}
            <Button variant="info" size="lg" onClick={() => this.cleargrid()}>
              Clear the GRID
            </Button>
          </div>
          <div className="info">
            <h3 className="text-white">
              Source Node - <Image src={red} roundedCircle width="25" height="25" />{' '}
              Destination Node - <Image src={green} roundedCircle width="25" height="25" />{' '}
              Path from source to destination - <Image src={yellow} roundedCircle width="25" height="25" />{' '}
              Obstacle - <Image src={blue} roundedCircle width="25" height="25" />
            </h3>
          </div>
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className="row">
                  {row.map((node, nodeIdx) => {
                    const { row, col, dest, src, wall } = node;
                    let extraClassName = '';
                    if (src) extraClassName = 'node-src';
                    else if (dest) extraClassName = 'node-dest';
                    else if (wall) extraClassName = 'node-wall';
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        dest={dest}
                        src={src}
                        wall={wall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                        row={row}
                        extraClassName={extraClassName}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    src: row === sr && col === sc,
    dest: row === fr && col === fc,
    distance: Infinity,
    isVisited: false,
    wall: false,
    previousNode: null,
  };
};
const setPreviousSourcef = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    src: false,
  }
  newGrid[row][col] = newNode;
  return newGrid;
};
const setPreviousDestf = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    dest: false,
  }
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    wall: !node.wall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
