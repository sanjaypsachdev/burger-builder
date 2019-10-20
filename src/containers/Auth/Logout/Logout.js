import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

export class Logout extends Component {

  componentDidMount() {
    console.log('Logout > componentDidMount');
    this.props.logout()
}

  render() {
    console.log('Logout > render');
    return (
      <Redirect to="/" />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);
