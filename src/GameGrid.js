import React, { useState } from 'react';
import './styles.scss';
import GameTile from './GameTile';

const GameGrid = ({ dims }) => {
  const initialTiles = ['','','','','','','','',''];
  const initialTurn = 'x';
  const initialStatus =  `Ready to play; it's ${initialTurn}'s turn.`;

  const solutions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  
  const [tiles, setTiles] = useState(initialTiles);
  const [currentTurn, setCurrentTurn] = useState(initialTurn);
  const [status, setStatus] = useState(initialStatus);

  const changeTurn = () => setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');

  const playTurn = id => {
    if (tiles[id] !== '') return setStatus('Invalid move.');
    let newTiles = tiles.slice();
    newTiles[id] = currentTurn;
    setTiles(newTiles);
    checkGameOver();
    changeTurn();
  }

  const checkGameOver = id => {
    let currentShapeTiles = getTilesWithShape();
    if (solutions.some(s => s.every(t => currentShapeTiles.includes(t)))) {
      setStatus(`The winner is ${currentTurn}!`);
    }
    else if (tiles.every(t => t !== '')) {
      setStatus('It\'s a draw.');
    }
  }

  const getTilesWithShape = (shape=currentTurn) => {
    let out = [];
    tiles.map((tile, key) => { 
      if (tile === shape) out.push(key);
    });
    return out;
  }

  const resetGame = () => {
    setTiles(initialTiles);
    setCurrentTurn(initialTurn);
    setStatus(initialStatus);
  }

  return (
    <div>
      <h3>Current Turn: {currentTurn}</h3>
      <h5>Status: {status}</h5>
      <div class="grid">
        { tiles.map((tile, key) => {
          return <GameTile
            key={key}
            id={key}
            inputShape={tile}
            clickCallback={playTurn}
          /> 
        }) }
      </div>
      <button onClick={() => resetGame()}>Reset</button>
    </div>
  );
}

export default GameGrid;
