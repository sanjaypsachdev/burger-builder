import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const INGREDIENT_PRICE = {
  cheese: 0.5,
  salad: 1,
  bacon: 1,
  meat: 3
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngredientRemoved = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredientsRemoved = updateObject(state.ingredients, updatedIngredientRemoved);
  const updatedStateRemoved = {
    ingredients: updatedIngredientsRemoved,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedStateRemoved);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
}

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
};

export default reducer;