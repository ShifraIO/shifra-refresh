import React from 'react';
import PropTypes from 'prop-types';

const NavbarEnd = props => {
  return <div className="navbar-end">{props.children}</div>;
};

NavbarEnd.propTypes = {
  children: PropTypes.any.isRequired,
};

export default NavbarEnd;
