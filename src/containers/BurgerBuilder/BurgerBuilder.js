import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, val) => sum + val, 0);

    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }

  }

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  }

  const continuePurchaseHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = { 
    ...props.ingredients
  }
  
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let modalContent = null;
  let burger = props.error ? <p>Ingredients can't be leaded !</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={ props.ingredients } />
        <BurgerControls
          ingredientAdded={ props.onIngredientAdded }
          ingredientRemoved={ props.onIngredientRemoved }
          disabledInfo={ disabledInfo }
          purchasable={ updatePurchaseState(props.ingredients) }
          order={ purchaseHandler }
          isAuthenticated = { props.isAuthenticated }
          price={props.totalPrice}
        />
      </>
    );

    modalContent = <OrderSummary
                      ingredients={ props.ingredients }
                      price={ props.totalPrice }
                      cancelPurchase={ cancelPurchaseHandler }
                      continuePurchase={ continuePurchaseHandler }
                    />
  }

  return (
    <>
      <Modal show={ purchasing } closed={ cancelPurchaseHandler } >
        { modalContent }
      </Modal>
      { burger }
    </>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));