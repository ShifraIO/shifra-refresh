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
import './navbar.scss'

function mapMenuToState(menuData) {
  return menuData.edges.map(data => data.node);
}

class Navbar extends Component {
  state = {}

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

  getRouteWithLanguage = language => {
    return language
      ? `${this.props.location.pathname}?lang=${language}`
      : this.props.location.pathname;
  }

  toggleMenu = _ => {
    this.setState(prevState => {
      return { isMenuOpen: !prevState.isMenuOpen };
    });
  }

  closeMenu = _ => {
    this.state.isMenuOpen = false;
  }

  isContentAvaliableInLanguage = (contentArray, language) => {
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
  getMenuTextForLanguage = (menuItem, language) => {
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
  getPageTitleForLanguage = (pageItem, language) => {
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

  mapMenuToNavbar = (menuList) => {
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

  mapPageListToDropdown = (pageList, menuSlug) => {
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

  getTheme = _ => {
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
    const staticMenu = {
      More: {
        titleList: [
          { titleText: 'More', language: { code: 'en' } },
          { titleText: 'أكثر من', language: { code: 'ar' } }
        ],
      },
      About: {
        titleList: [
          { titleText: 'About', language: { code: 'en' } },
          { titleText: 'حول', language: { code: 'ar' } },
        ],
      },
      Clinic: {
        titleList: [
          { titleText: 'Clinic Locations', language: { code: 'en' } },
          { titleText: 'مواقع العيادة', language: { code: 'ar' } },
        ],
      },
      Contact: {
        titleList: [
          { titleText: 'Contact', language: { code: 'en' } },
          { titleText: 'اتصل', language: { code: 'ar' } },
        ],
      },
    };

    console.log('test2')

    if(typeof window !== 'undefined'){
      window.location.href = 'https://shifra.app'
    }

    return (
      <nav
        className={`navbar is-fixed-top is-${this.getTheme()} language-${this.props.language}`}
        role="navigation"
        aria-label="main navigation"
      >
        <NavbarBrand logo={logo} to={`/${this.props.history.location.search}`}>
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
              title={this.getPageTitleForLanguage(staticMenu.More, this.state.language)}
              to={this.getRouteWithLanguage(this.state.language)}
              position={'right'}
            >
              <NavbarItem
                to={`/clinic-locations${this.props.history.location.search}`}
                iconClass="fas fa-map-marker"
                onClick={this.closeMenu}
              >
                {this.getPageTitleForLanguage(staticMenu.Clinic, this.state.language)}
              </NavbarItem>
              <NavbarItem
                to={`/about${this.props.history.location.search}`}
                iconClass="fas fa-info"
                onClick={this.closeMenu}
              >
                {this.getPageTitleForLanguage(staticMenu.About, this.state.language)}
              </NavbarItem>
              <hr className="navbar-divider" />
              <a href={'mailto:info@shifra.io'} className="navbar-item">
                <span className="icon">
                  <i className={'fas fa-envelope'} />
                </span>
                <span>{this.getPageTitleForLanguage(staticMenu.Contact, this.state.language)}</span>
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
