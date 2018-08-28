import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

function getMenuPages(pages, slugPrefix) {
  if (pages) {
    return pages.map(page => (
      <Link
        key={page.slug}
        to={`${slugPrefix}/${page.slug}`}
        className="navbar-item"
      >
        {page.title}
      </Link>
    ));
  }

  return <span className="navbar-item">Empty</span>;
}

const Header = ({ pages = [], slugPrefix = '' }) => (
  <div className="navbar-dropdown">{getMenuPages(pages, slugPrefix)}</div>
);

Header.propTypes = {
  pages: PropTypes.array,
  slugPrefix: PropTypes.string,
};

export default Header;
