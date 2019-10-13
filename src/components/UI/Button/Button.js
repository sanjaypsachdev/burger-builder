import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={ props.clicked }
      className={ [classes.Button, classes[props.btnType]].join(' ') }
    >
      { props.children }
    </button>
  )
}

button.propTypes = {
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.oneOf(['Danger', 'Success']).isRequired,
  children: PropTypes.string.isRequired
}

export default button
