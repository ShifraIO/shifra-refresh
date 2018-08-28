import React from 'react';
import PropTypes from 'prop-types';

const NavbarMenu = props => {
  return (
    <div
      className={`navbar-menu ${props.isOpen ? 'is-active' : ''}`}
      id="navMenu"
    >
      {props.children}
    </div>
  );
};

NavbarMenu.propTypes = {
  children: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default NavbarMenu;
