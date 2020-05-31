import React from 'react';
import './styles.scss';

const GameTile = ({ id, inputShape, clickCallback, disabled }) => {

	const SHAPE_TO_ICON = {
		'o': 'panorama_fish_eye',
		'x': 'clear',
	}

	const icon = <i class="material-icons">{ SHAPE_TO_ICON[inputShape] }</i>
	const iconContent = inputShape ? icon : <span />;


 	let output;
  	if (disabled) {
  		output = <div className="tile disabled">
    		{ iconContent }
    	</div>

  	} else {
  		if (inputShape) {
  			output = <div className="tile filled">
  				{ iconContent}
  			</div>

  		} else {
  			output = <div
	    		className="tile"
	    		onClick={() => clickCallback(id)}
	    		>
	    		{ iconContent }
	    	</div>
  		}
  	}
  	
  	
  	return  output;
}

export default GameTile;
