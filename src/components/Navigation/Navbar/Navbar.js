import React, { Component } from 'react';
import logo from '../../../content/shifra-logo.png';
import NavbarBrand from '../NavbarBrand/NavbarBrand';
import NavbarHamburger from '../NavbarHamburger';
import NavbarMenu from '../NavbarMenu';
import NavbarStart from '../NavbarStart';
import NavbarEnd from '../NavbarEnd';
import NavbarDropdown from '../NavbarDropdown';
import NavbarItem from '../NavbarItem';
import PropTypes from 'prop-types';

function mapMenuToState(menuData) {
  return menuData.edges.map(data => data.node);
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleMenu = this.toggleMenu.bind(this);
    this.mapMenuToNavbar = this.mapMenuToNavbar.bind(this);
    this.mapPageListToDropdown = this.mapPageListToDropdown.bind(this);
    this.getMenuTextForLanguage = this.getMenuTextForLanguage.bind(this);
    this.getPageTitleForLanguage = this.getPageTitleForLanguage.bind(this);
    this.isContentAvaliableInLanguage = this.isContentAvaliableInLanguage.bind(
      this
    );
    this.getTheme = this.getTheme.bind(this);
  }

  componentWillMount() {
    this.setState({
      isMenuOpen: false,
      menuList: mapMenuToState(this.props.menuData),
      language: this.props.language,
      defaultLanguage: 'en',
      search: this.props.search,
      theme: this.props.theme,
    });
  }

  componentWillReceiveProps(props) {
    this.setState(Object.assign(this.state, { theme: props.theme }));
  }

  toggleMenu() {
    this.setState(prevState => {
      return { isMenuOpen: !prevState.isMenuOpen };
    });
  }

  isContentAvaliableInLanguage(contentArray, language) {
    // For each element in content array
    // Does have language 'language'?
    // if yes, return true
    // else return false

    // idea is to use 'en' if false is returned.
    return contentArray.reduce((acc, curr) => {
      if (curr.language.code === language) {
        return true;
      }
    }, false);
  }

  // Need to handle english by default.
  getMenuTextForLanguage(menuItem, language) {
    const contentlanguage = this.isContentAvaliableInLanguage(
      menuItem.menuItemTextList,
      language
    )
      ? language
      : this.state.defaultLanguage;

    return menuItem.menuItemTextList.reduce(
      (acc, curr) =>
        curr.language.code === contentlanguage ? curr.menuItemText : acc,
      null
    );
  }

  // Need to handle english by default.
  getPageTitleForLanguage(pageItem, language) {
    const contentlanguage = this.isContentAvaliableInLanguage(
      pageItem.titleList,
      language
    )
      ? language
      : this.state.defaultLanguage;

    return pageItem.titleList.reduce(
      (acc, curr) =>
        curr.language.code === contentlanguage ? curr.titleText : acc,
      null
    );
  }

  mapMenuToNavbar(menuList) {
    return menuList.map((menuItem, index) => {
      return (
        <NavbarDropdown
          key={index}
          to={`${menuItem.slug}${this.state.search}`}
          title={this.getMenuTextForLanguage(menuItem, this.state.language)}
        >
          {this.mapPageListToDropdown(menuItem.pageList || [], menuItem.slug)}
        </NavbarDropdown>
      );
    });
  }

  mapPageListToDropdown(pageList, menuSlug) {
    return pageList.map((page, index) => {
      const title = this.getPageTitleForLanguage(page, this.state.language);
      const url = `/${menuSlug}/${page.slug}`;
      return (
        <NavbarItem key={index} to={`${url}${this.state.search}`}>
          {title}
        </NavbarItem>
      );
    });
  }

  getTheme() {
    switch (this.state.theme) {
      case 'healthcare-australia':
        return 'healthcare';
      case 'family-planning':
        return 'family';
      case 'pregnancy-newborn':
        return 'pregnancy';
      case 'sexual-health':
        return 'sexual';
      case 'community-health':
        return 'community';
      case 'clinic-locations':
        return 'clinic';
      default:
        return 'healthcare';
    }
  }

  render() {
    return (
      <nav
        className={`navbar is-fixed-top is-${this.getTheme()}`}
        role="navigation"
        aria-label="main navigation"
      >
        <NavbarBrand logo={logo} to={`${this.state.search}`}>
          <NavbarHamburger
            isOpen={this.state.isMenuOpen}
            clickEvent={this.toggleMenu}
          />
        </NavbarBrand>
        <NavbarMenu isOpen={this.state.isMenuOpen}>
          <NavbarStart>{this.mapMenuToNavbar(this.state.menuList)}</NavbarStart>
          <NavbarEnd>
            <NavbarItem to={`/clinic-locations${this.state.search}`} iconClass="fas fa-map-marker">Clinic Locations</NavbarItem>
            <NavbarItem to={`/about${this.state.search}`} iconClass="fas fa-info">About</NavbarItem>
            <a href={'mailto:info@shifra.io'} className="navbar-item">
              <span className="icon">
                <i className={'fas fa-envelope'} />
              </span>
              <span>Contact</span>
            </a>
          </NavbarEnd>
        </NavbarMenu>
      </nav>
    );
  }
}

Navbar.propTypes = {
  menuData: PropTypes.object,
  language: PropTypes.string,
  search: PropTypes.string,
  theme: PropTypes.string,
};

export default Navbar;
