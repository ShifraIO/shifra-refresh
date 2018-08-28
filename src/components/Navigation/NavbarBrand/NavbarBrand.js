import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const NavbarBrand = props => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to={props.to}>
        <img src={props.logo} />
      </Link>
      {props.children}
    </div>
  );
}


NavbarBrand.propTypes = {
  logo: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  to: PropTypes.string,
};

export default NavbarBrand;
