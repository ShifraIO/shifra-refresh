import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navigation/Navbar';

const Header = ({ allContentfulMenuItem, language, search }) => (
  <Navbar
    menuData={allContentfulMenuItem}
    language={language}
    search={search}
  />
);

Header.propTypes = {
  allContentfulMenuItem: PropTypes.object,
  language: PropTypes.string,
  search: PropTypes.string,
};

export default Header;
