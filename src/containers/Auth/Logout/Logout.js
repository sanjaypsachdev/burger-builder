import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

export const Logout = props => {

  useEffect(() => {
    props.logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Redirect to="/" />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);
