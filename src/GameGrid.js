import React, { useState, useEffect } from 'react';
import './styles.scss';
import GameTile from './GameTile';

const GameGrid = () => {
  const VALID_SHAPES = ['x', 'o'];
  const SHAPE1 = VALID_SHAPES[0];
  const SHAPE2 = VALID_SHAPES[1];

  const SOLUTIONS = [
                      [0,1,2],[3,4,5],[6,7,8],
                      [0,3,6],[1,4,7],[2,5,8],
                      [0,4,8],[2,4,6]
                    ];

  const INITIAL_TILES = ['','','','','','','','',''];
  const INITIAL_TURN = SHAPE1;
  const INITIAL_STATUS =  `Ready to play; it's ${INITIAL_TURN}'s turn.`;

  const INVALID_MOVE_MESSAGE = 'Invalid move. Please click an empty field.';

  
  const [tiles, setTiles] = useState(INITIAL_TILES);
  const [currentTurn, setCurrentTurn] = useState(INITIAL_TURN);
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [gameOver, setGameOver] = useState(false);



  useEffect(() => {
    if (tiles !== INITIAL_TILES) onTilesChange();
  }, [tiles]);




  const setCheckedTile = checkedTileIndex => {
    if (tiles[checkedTileIndex] !== '') return setStatus(INVALID_MOVE_MESSAGE);

    let updatedTiles = tiles.slice();
    updatedTiles[checkedTileIndex] = currentTurn;
    setTiles(updatedTiles);
  } 


  const onTilesChange = () => {
    let winner = checkForWin();
    if (winner) {
      setWinner(winner);
      setGameOver(true);
    } else {
      changeTurn();
    }
  }


  const changeTurn = () => {
    setCurrentTurn(currentTurn === SHAPE1 ? SHAPE2 : SHAPE1);
    setStatus('');
  }


  const checkForWin = () => {
    let currentShapeTiles = getTileIndicesWithShape(currentTurn);

    if (SOLUTIONS.some(solution => {
      return solution.every(solutionTile => {
        return currentShapeTiles.includes(solutionTile);
      })
    })) {
      return currentTurn;
    } else if (tiles.every(t => t !== '')) {
      return 'no winner';
    } else {
      return '';
    }
  }

  const setWinner = winner => {
    if (VALID_SHAPES.includes(winner)) {
      setStatus(`The winner is ${currentTurn} !`);
    } else {
      setStatus('It\'s a draw.');
    }
  }


  const getTileIndicesWithShape = shape => {
    if (!VALID_SHAPES.includes(shape)) return false;

    let tilesWithId = tiles.map((tile, id) => [tile, id]);
    let filteredTiles = tilesWithId.filter(tile => tile[0] === shape);
    let filteredTileIndices = filteredTiles.map(tile => tile[1]);

    return filteredTileIndices;
  }



  const resetGame = () => {
    setTiles(INITIAL_TILES);
    setCurrentTurn(VALID_SHAPES[Math.floor(Math.random() * VALID_SHAPES.length)]);
    setStatus(INITIAL_STATUS);
    setGameOver(false);
  }




  return (
    <div className="game-container">

      <h2>Tic Tac Toe</h2>
      <h5>Current Turn: {currentTurn}</h5>
      <h5> &nbsp; { status !== '' && status } &nbsp; </h5>

      <div class="grid">
        { tiles.map((tile, key) => {
          return <GameTile
            key={key}
            id={key}
            inputShape={tile}
            clickCallback={setCheckedTile}
            disabled={gameOver}
          /> 
        }) }
      </div>

      <button onClick={() => resetGame()}>Reset</button>
    </div>
  );
}

export default GameGrid;
