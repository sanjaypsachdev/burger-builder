import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    axios.get('/orders.json')
         .then(res => {
           let orders = [];
           for (let key in res.data) {
             orders.push({
               ...res.data[key],
               id: key
             })
           }
           this.setState({ loading: false, orders: orders })
         })
         .catch(error => {
           this.setState({ loading: false })
         })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    )
  }
}

export default errorHandler(Orders, axios);
