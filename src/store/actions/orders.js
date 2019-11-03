import * as actionTypes from './actionTypes';
//import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  //Below code works with Redux Thunk
  // return dispatch => {
  //   dispatch(purchaseBurgerStart());
  //   axios.post('/orders.json?auth=' + token, orderData)
  //        .then(response => {
  //          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
  //        })
  //        .catch(error => dispatch(purchaseBurgerFail(error)));
  // }
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdereSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  //Below code works with Redux Thunk
  // return dispatch => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"';
  //   axios.get('/orders.json' + queryParams)
  //        .then(res => {
  //          let orders = [];
  //          for (let key in res.data) {
  //            orders.push({
  //              ...res.data[key],
  //              id: key
  //            })
  //          }
  //          dispatch(fetchOrdereSuccess(orders));
  //        })
  //        .catch(error => {
  //          dispatch(fetchOrdersFail(error));
  //        })
  // };
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
  }
}