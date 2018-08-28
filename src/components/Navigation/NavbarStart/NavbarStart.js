import React from 'react';
import PropTypes from 'prop-types';

const NavbarStart = props => {
  return <div className="navbar-start">{props.children}</div>;
};

NavbarStart.propTypes = {
  children: PropTypes.any.isRequired,
};

export default NavbarStart;
