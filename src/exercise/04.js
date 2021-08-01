// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  const [squares, setSquares] = React.useState(
      () => JSON.parse(localStorage.getItem('squares')) || Array(9).fill(null)
  );

  React.useEffect(() => {
      localStorage.setItem('squares', JSON.stringify(squares));
  })
  const nextValue = calculateNextValue(squares);

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {

    if (winner !== null || squares[square] !== null) {
        return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue
    setSquares(squaresCopy);
  }

  function restart() {
      setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

/**
 * Get the status string.
 *
 * @param winner
 * @param squares
 * @param nextValue
 * @returns {string|string}
 */
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

/**
 * Get 'X' or 'O' value.
 * @param squares
 * @returns {string}
 */
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

/**
 * Get the winner (X or O) or null.
 *
 * @param squares
 * @returns {null|*}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
