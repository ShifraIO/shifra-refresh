import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navigation/Navbar';

// import styles from './Header.module.scss';

const Header = ({ allContentfulMenuItem, language, search, theme }) => (
  <Navbar
    theme={theme}
    menuData={allContentfulMenuItem}
    language={language}
    search={search}
  />
);

Header.propTypes = {
  allContentfulMenuItem: PropTypes.object,
  language: PropTypes.string,
  search: PropTypes.string,
  theme: PropTypes.string,
};

export default Header;
