import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const NavbarDropdown = props => {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <Link className="navbar-link" to={props.to} onClick={props.onClick}>
        {props.title}
      </Link>
      <div className="navbar-dropdown">{props.children}</div>
    </div>
  );
}

NavbarDropdown.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavbarDropdown;
