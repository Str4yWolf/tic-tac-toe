import React from 'react';
import './styles.scss';

const GameTile = ({ id, inputShape, clickCallback }) => {

  let main = <span />

  if (inputShape === 'o') {
    main = <i class="material-icons">panorama_fish_eye</i>
  } else if (inputShape === 'x') {
    main = <i class="material-icons">clear</i>
  } 
  return (
    <div
    	className="tile"
    	onClick={() => clickCallback(id)}
    >{ main }</div>
  );
}

export default GameTile;
