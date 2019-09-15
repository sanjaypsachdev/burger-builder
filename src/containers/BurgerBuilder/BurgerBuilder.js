import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICE = {
  cheese: 0.5,
  salad: 1,
  bacon: 1,
  meat: 3
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
         .then(response =>
           this.setState({ ingredients: response.data })
         )
         .catch(error => {
           this.setState({ error: true })
         })
  }

  updatePurchaseState () {
    this.setState((prevState) => ({
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: queryString
    });
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => ({
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
    this.setState((prevState) => ({
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

    let modalContent = null;
    let burger = this.state.error ? <p>Ingredients can't be leaded !</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      );

      modalContent = <OrderSummary
                        ingredients={ this.state.ingredients }
                        price={ this.state.totalPrice }
                        cancelPurchase={ this.cancelPurchaseHandler }
                        continuePurchase={ this.continuePurchaseHandler }
                      />
    }

    if (this.state.loading) {
      modalContent = <Spinner />
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

export default withErrorHanlder(BurgerBuilder, axios);