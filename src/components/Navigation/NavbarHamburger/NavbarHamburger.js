import React from 'react';
import PropTypes from 'prop-types';

const NavbarHamburger = props => {
  return (
    <a
      role="button"
      className={`navbar-burger ${props.isOpen ? 'is-active' : ''}`}
      aria-label="dropdown navigation"
      aria-expanded="false"
      onClick={props.clickEvent}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  );
}

NavbarHamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  clickEvent: PropTypes.func.isRequired,
};

export default NavbarHamburger;
