import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant';

const burger = (props) => {
  let transformedIngredients = Object.keys( props.ingredients )
                                       .map(igKey => [...Array( props.ingredients[igKey] )]
                                          .map((_, i) => <BurgerIngrediant key={igKey + i} type={igKey} />))
                                       .reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients.</p>;
  };
  return (
    <div className={classes.Burger}>
      <BurgerIngrediant type="bread-top" />
      { transformedIngredients }
      <BurgerIngrediant type="bread-bottom" />
    </div>
  );
}

burger.propTypes = {
  ingredients: PropTypes.shape({
    cheese: PropTypes.number.isRequired,
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  }).isRequired
}

export default burger;