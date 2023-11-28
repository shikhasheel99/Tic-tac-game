import { useState } from 'react';
 
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/log';
import { WINNING_COMBINATIONS } from './win-combination';
import GameOver from './components/GameOver';
 
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
 
function getActivePlayer(gameTurns) {
  let player = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player==='X') {
    player = 'O';
  }
 
  return player;
}
 
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    'X': 'Player-1',
    'O': 'Player-2'
  });
 
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevplayers) => {
      return {
        ...prevplayers,
        [symbol]: newName
      }
    })
  }
 
  function restart() {
    setGameTurns([]);
  }
 
  let gameBoard = [...initialGameBoard.map(arr => [...arr])]; // not a state
 
  for(const turn of gameTurns){
    const {row, col, player} = turn;
 
    gameBoard[row][col] = player;
  }
 
  let winner;
 
  for(const combination of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[combination[0].row][combination[0].column],
      secondSymbol = gameBoard[combination[1].row][combination[1].column],
      thirdSymbol = gameBoard[combination[2].row][combination[2].column];
 
      if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
        winner = players[firstSymbol];
      }
  }
 
  const hasDraw = gameTurns.length === 9 && !winner;
 
  function handlePlayerSelection (row, col) {
    setGameTurns((prevState) => {
      const player = getActivePlayer(prevState);
      const updatedState = [{
        row: row,
        col: col,
        player: player
      } ,...prevState];
 
      return updatedState;
    })
  }
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player-1" symbol="X" isActive={getActivePlayer(gameTurns) === 'X'} handlePlayerNameChange={handlePlayerNameChange}/>
        <Player name="Player-2" symbol="O" isActive={getActivePlayer(gameTurns) === 'O'} handlePlayerNameChange={handlePlayerNameChange}/>
      </ol>
      {winner && <GameOver winner={winner} restart={restart}/>}
      {hasDraw && <GameOver restart={restart}/>}
      <GameBoard onSelectSquare={handlePlayerSelection} gameBoard={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}
 
export default App