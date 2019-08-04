import React from 'react';

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

export default burger;