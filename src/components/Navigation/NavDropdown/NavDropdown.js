import React from 'react';
import PropTypes from 'prop-types';

const NavbarDropdown = props => {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <p className="navbar-link" onClick={props.onClick}>
	    {props.title}
	  </p>
      <div className="navbar-dropdown">{props.children}</div>
    </div>
  );
}

NavbarDropdown.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default NavbarDropdown;