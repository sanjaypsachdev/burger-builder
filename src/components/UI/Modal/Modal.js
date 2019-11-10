import React, { memo } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

  return (
    <>
      <Backdrop show={ props.show } clicked={ props.closed } />
      <div 
        className={ classes.Modal }
        style={ { 
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        } }
      >
        { props.children }
      </div>
    </>
  )
}

modal.propTypes = {
  show: PropTypes.bool,
  closed: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
      nextProps.children === prevProps.children
);
