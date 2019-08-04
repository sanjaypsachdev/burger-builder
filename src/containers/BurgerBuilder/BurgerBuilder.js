import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
  cheese: 0.5,
  salad: 1,
  bacon: 1,
  meat: 3
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState () {
    this.setState((prevState, props) => ({
      purchasable: Object.keys(prevState.ingredients).map(igKey => prevState.ingredients[igKey]).reduce((sum, val) => sum + val, 0) > 0
    }));
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  continuePurchaseHandler = () => {
    alert("You continue");
  }

  addIngredientHandler = (type) => {
    this.setState((prevState, props) => ({
      totalPrice: prevState.totalPrice + INGREDIENT_PRICE[type],
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1
      }
    }));
    this.updatePurchaseState();
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }
    this.setState((prevState, props) => ({
      totalPrice: prevState.totalPrice - INGREDIENT_PRICE[type],
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] - 1
      }
    }));
    this.updatePurchaseState();
  }

  render() {
    const disabledInfo = { 
      ...this.state.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={ this.state.purchasing } closed={ this.cancelPurchaseHandler } >
          <OrderSummary
            ingredients={ this.state.ingredients }
            price={ this.state.totalPrice }
            cancelPurchase={ this.cancelPurchaseHandler }
            continuePurchase={ this.continuePurchaseHandler }
          />
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BurgerControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabledInfo={ disabledInfo }
          purchasable={ this.state.purchasable }
          order={ this.purchaseHandler }
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder;