import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const NavbarItem = props => {
  return (
    <Link to={props.to} className="navbar-item">
      {props.iconClass && (
        <span className="icon">
          <i className={props.iconClass} />
        </span>
      )}
      <span>{props.children}</span>
    </Link>
  );
};

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  children: PropTypes.any.isRequired,
  search: PropTypes.string,
};

export default NavbarItem;
