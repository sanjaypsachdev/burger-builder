import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

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
        { props.isAuthenticated? 'ORDER NOW' : 'SIGN UP TO ORDER' }
      </button>
    </div>
  );
}

buildControls.propTypes = {
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  disabledInfo: PropTypes.shape({
    cheese: PropTypes.bool.isRequired,
    salad: PropTypes.bool.isRequired,
    bacon: PropTypes.bool.isRequired,
    meat: PropTypes.bool.isRequired
  }).isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  order: PropTypes.func.isRequired
}

export default buildControls;
