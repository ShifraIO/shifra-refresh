import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const NavbarDropdown = props => {
  const position = props.position ? props.position : 'left';
  return (
    <div className={`navbar-item has-dropdown is-hoverable`}>
      <Link className="navbar-link" to={props.to}>
        {props.icon ? <i className={props.icon} /> : null}
        {props.title}
      </Link>
      <div className={`navbar-dropdown is-${position}`}>{props.children}</div>
    </div>
  );
}

NavbarDropdown.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  position: PropTypes.string,
};

export default NavbarDropdown;
