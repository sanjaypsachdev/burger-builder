import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  };

  componentDidMount() {
    console.log("props inside BurgerBuilder.js", this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, val) => sum + val, 0);

    return sum > 0;
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
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  // addIngredientHandler = (type) => {
  //   this.setState((prevState) => ({
  //     totalPrice: prevState.totalPrice + INGREDIENT_PRICE[type],
  //     ingredients: {
  //       ...prevState.ingredients,
  //       [type]: prevState.ingredients[type] + 1
  //     }
  //   }));
  //   this.updatePurchaseState();
  // }

  // removeIngredientHandler = (type) => {
  //   if (this.state.ingredients[type] === 0) {
  //     return;
  //   }
  //   this.setState((prevState) => ({
  //     totalPrice: prevState.totalPrice - INGREDIENT_PRICE[type],
  //     ingredients: {
  //       ...prevState.ingredients,
  //       [type]: prevState.ingredients[type] - 1
  //     }
  //   }));
  //   this.updatePurchaseState();
  // }

  render() {
    console.log('this.props.ingredients', this.props.ingredients);
    const disabledInfo = { 
      ...this.props.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let modalContent = null;
    let burger = this.props.error ? <p>Ingredients can't be leaded !</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ingredients } />
          <BurgerControls
            ingredientAdded={ this.props.onIngredientAdded }
            ingredientRemoved={ this.props.onIngredientRemoved }
            disabledInfo={ disabledInfo }
            purchasable={ this.updatePurchaseState(this.props.ingredients) }
            order={ this.purchaseHandler }
            price={this.props.totalPrice}
          />
        </Aux>
      );

      modalContent = <OrderSummary
                        ingredients={ this.props.ingredients }
                        price={ this.props.totalPrice }
                        cancelPurchase={ this.cancelPurchaseHandler }
                        continuePurchase={ this.continuePurchaseHandler }
                      />
    }

    return (
      <Aux>
        <Modal show={ this.state.purchasing } closed={ this.cancelPurchaseHandler } >
          { modalContent }
        </Modal>
        { burger }
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(BurgerBuilder, axios));