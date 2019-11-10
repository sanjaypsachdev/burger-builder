import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

export const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false,
      value: ''
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false,
      value: ''
    }
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const onChangedHander = (event, controlName) => {
    const updatedControls = updateObject( authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true
      })
    });
    setAuthForm(updatedControls);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  }

  const switchAuthHandler = () => {
    setIsSignUp(!isSignUp);
  }

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.setAuthRedirectPath();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let formElementArray = []
  for (let key in authForm) {
    formElementArray.push({
      id: key,
      config: authForm[key]
    })
  }

  let form = formElementArray.map(formElement => (
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
  ))

  if (props.loading) {
    form = <Spinner />
  };

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    );
  }

  const switchToButtonText = 'SWITCH TO ' + (isSignUp ? 'SIGNIN' : 'SIGNUP');

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={onSubmitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthHandler} btnType="Danger">{switchToButtonText}</Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
