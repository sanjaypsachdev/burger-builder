import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const ingredientControls = [
  { label: 'Cheese', type: 'cheese' },
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' }
]


const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    <div>Current Price: <strong>{ props.price.toFixed(2) }</strong></div>
      { ingredientControls.map(ig => 
          <BuildControl 
            key={ig.label}
            label={ig.label}
            added={() => props.ingredientAdded(ig.type)}
            removed={() => props.ingredientRemoved(ig.type)}
            disabled={props.disabledInfo[ig.type]}
          />
        ) 
      }
      <button
        disabled={ !props.purchasable }
        className={ classes.OrderButton }
        onClick={ props.order }
      >
        ORDER NOW
      </button>
    </div>
  );
}

export default buildControls;
