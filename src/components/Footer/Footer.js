import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './footer.scss';
import { withRouter } from 'react-router';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getIconForLogo = this.getIconForLogo.bind(this);
  }

  componentWillMount(props) {
    this.setState({
      language: this.props.language,
      defaultLanguage: 'en',
      search: this.props.search,
    });
  }

  componentWillReceiveProps(props) {
    this.setState(
      Object.assign(this.state, {
        language: props.language,
      })
    );
  }

  // given a logo, load the relevant icon
  getIconForLogo(logo) {
    let logoIcon = '#';

    // try to get the image
    try {
      logoIcon = require(`../../content/contributors/${logo}.png`);
    } catch (e) {
      logoIcon = null;
    }

    return logoIcon;
  }

  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <div>
            <a className="footerLink" href={'tel:000'}>
              <i className="fas fa-phone" /> In case of emergency call 000
            </a>
            <a className="footerLink" href={'tel:131114'}>
              <i className="fas fa-phone" /> Lifeline Phone Services 13 11 14
            </a>
          </div>
        </div>
        <div className="content has-text-centered">
          <div className="importantLinks">
            <a className="footerLink" href={`/privacy${this.props.history.location.search}`}>
              Privacy Policy
            </a>
            <div className="separatorCircle">
              <i className="fas fa-circle" />
            </div>
            <a className="footerLink" href={`/termsofuse${this.props.history.location.search}`}>
              Terms of Use
            </a>
            <div className="separatorCircle">
              <i className="fas fa-circle" />
            </div>
            <a className="footerLink" href={`/about${this.props.history.location.search}`}>
              About
            </a>
            <div className="separatorCircle">
              <i className="fas fa-circle" />
            </div>
            <a className="footerLink" href={'mailto:info@shifra.io'}>
              Contact
            </a>
          </div>
          <div>
            <a
              className="footerLink socialIconLink"
              href={'https://www.facebook.com/Shifra-1777571399195093/'}
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="footerLink socialIconLink"
              href={'https://www.instagram.com/Shifra_au/'}
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
          <div>
            <a className="footerLink" href={'https://www.nfaw.org/donations'}>
              Donate Now
            </a>
          </div>
          <div className="section has-text-centered">
            <div className="columns">
              <div className="column is-2">
                <img
                  src={this.getIconForLogo('swinburne')}
                  alt="Swinburne Logo"
                />
              </div>
              <div className="column is-2">
                <img src={this.getIconForLogo('ygap')} alt="YGAP Logo" />
              </div>
              <div className="column is-2">
                <img src={this.getIconForLogo('monash')} alt="Monash Logo" />
              </div>
              <div className="column">
                <img
                  src={this.getIconForLogo('gcgmonash')}
                  alt="Global Consulting Group Logo"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="disclaimer">
          <p>© 2017 Shifra. All rights reserved.</p>
          <p>
            This website and the resources to which it refers are intended to
            provide educational and general information only. They do not
            provide comprehensive medical or legal advice. Please seek specific
            medical or legal advice in relation to individual circumstances.
            Shifra accepts no responsibility or legal liability for reliance on
            the information contained on this site, or other sites to which this
            site links.
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  menuData: PropTypes.object,
  language: PropTypes.string,
  search: PropTypes.string,
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(Footer);