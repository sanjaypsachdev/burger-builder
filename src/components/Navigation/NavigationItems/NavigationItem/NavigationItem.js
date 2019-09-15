import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink 
          to={props.link}
          activeClassName={classes.active}
          exact={props.exact}>{props.children}</NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.string
}

export default navigationItem;