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
import { withRouter } from 'react-router';

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
    this.closeMenu = this.closeMenu.bind(this);
    this.getRouteWithLanguage = this.getRouteWithLanguage.bind(this);
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
    this.setState(
      Object.assign(this.state, {
        theme: props.theme,
        language: props.language,
      })
    );
  }

  getRouteWithLanguage(language) {
    return language
      ? `${this.props.location.pathname}?lang=${language}`
      : this.props.location.pathname;
  }

  toggleMenu() {
    this.setState(prevState => {
      return { isMenuOpen: !prevState.isMenuOpen };
    });
  }

  closeMenu() {
    this.state.isMenuOpen = false;
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
          to={`/${menuItem.slug}${this.props.history.location.search}`}
          title={this.getMenuTextForLanguage(menuItem, this.state.language)}
          onClick={this.closeMenu}
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
        <NavbarItem
          key={index}
          to={`${url}${this.props.history.location.search}`}
          onClick={this.closeMenu}
        >
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
            <NavbarDropdown
              icon={'fas fa-globe-asia'}
              to={this.getRouteWithLanguage(this.state.language)}
              position={'right'}
            >
              <NavbarItem to={this.getRouteWithLanguage('en')}>
                English
              </NavbarItem>
              <NavbarItem to={this.getRouteWithLanguage('ar')}>عربى</NavbarItem>
            </NavbarDropdown>
            <NavbarDropdown
              title={'More'}
              to={this.getRouteWithLanguage(this.state.language)}
              position={'right'}
            >
              <NavbarItem
                to={`/clinic-locations${this.state.search}`}
                iconClass="fas fa-map-marker"
                onClick={this.closeMenu}
              >
                Clinic Locations
              </NavbarItem>
              <NavbarItem
                to={`/about${this.state.search}`}
                iconClass="fas fa-info"
                onClick={this.closeMenu}
              >
                About
              </NavbarItem>
              <hr className="navbar-divider" />
              <a href={'mailto:info@shifra.io'} className="navbar-item">
                <span className="icon">
                  <i className={'fas fa-envelope'} />
                </span>
                <span>Contact</span>
              </a>
            </NavbarDropdown>
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
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(Navbar);
