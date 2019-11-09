import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Country'
      },
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      validation: {
        required: true,
        email: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      valid: true,
      validation: {},
      value: 'fastest'
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  }

  const onChangedHander = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let formInputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[formInputIdentifier].valid && formIsValid; 
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  }

  let formElementArray = []
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key]
    })
  }
  let form = (
    <form>
      {formElementArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => onChangedHander(event, formElement.id)}
        />
      ))}
      <Button
        btnType="Success"
        clicked={orderHandler}
        disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Details</h4>
      { form }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));