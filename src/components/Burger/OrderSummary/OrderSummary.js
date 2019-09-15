import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
                                 .map(igKey => 
                                    <li key={igKey}>
                                      <span style={ { textTransform: 'capitalize' } }>
                                        {igKey}
                                      </span>
                                      : {props.ingredients[igKey]}
                                    </li>);
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        { ingredientSummary }
      </ul>
      <p><strong>Total Price: { props.price.toFixed(2) }</strong></p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={ props.cancelPurchase }>CANCEL</Button>
      <Button btnType="Success" clicked={ props.continuePurchase }>CONTINUE</Button>
    </Aux>
  )
}

orderSummary.propTypes = {
  ingredients: PropTypes.shape({
    cheese: PropTypes.number.isRequired,
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired
}

export default orderSummary;
