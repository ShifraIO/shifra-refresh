import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cx, css } from 'emotion';
import swinburneLogo from '../../../content/contributors/swinburne.png';
import ygapLogo from '../../../content/contributors/ygap.png';
import monashLogo from '../../../content/contributors/monash.png';
import gcgLogo from '../../../content/contributors/gcgmonash.png';

const footerWrapperClass = cx('footer', css``);

const phoneFooterClass = cx('content', 'has-text-centered', css``);

const footerLink = css`
  padding: 5px;
`;

const socialIconLink = cx(
  footerLink,
  css`
    font-size: 22px;
  `
);

const importantLinksClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const separatorCircle = css`
  font-size: 6px;
  color: rgb(50, 115, 220);
`;

const disclaimerClass = cx(
  'content',
  'has-text-centered',
  css`
    font-size: 10px;
  `
);

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className={footerWrapperClass}>
        <div className={phoneFooterClass}>
          <div>
            <a className={footerLink} href={'tel:000'}>
              <i className="fas fa-phone" /> In case of emergency call 000
            </a>
            <a className={footerLink} href={'tel:131114'}>
              <i className="fas fa-phone" /> Lifeline Phone Services 13 11 14
            </a>
          </div>
        </div>
        <div className="content has-text-centered">
          <div className={importantLinksClass}>
            <a className={footerLink} href={'/privacy'}>
              Privacy Policy
            </a>
            <div className={separatorCircle}>
              <i className="fas fa-circle" />
            </div>
            <a className={footerLink} href={'/termsofuse'}>
              Terms of Use
            </a>
            <div className={separatorCircle}>
              <i className="fas fa-circle" />
            </div>
            <a className={footerLink} href={'/about'}>
              About
            </a>
            <div className={separatorCircle}>
              <i className="fas fa-circle" />
            </div>
            <a
              className={footerLink}
              href={'mailto:info@shifra.io'}
            >
              Contact
            </a>
          </div>
          <div>
            <a
              className={socialIconLink}
              href={'https://www.facebook.com/Shifra-1777571399195093/'}
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className={socialIconLink}
              href={'https://www.instagram.com/Shifra_au/'}
            >
              <i className="fab fa-instagram" />
            </a>
          </div>

          <div className="section has-text-centered">
            <div className="columns">
              <div className="column is-2">
                <img src={swinburneLogo} alt="Swinburne Logo" />
              </div>
              <div className="column is-2">
                <img src={ygapLogo} alt="YGAP Logo" />
              </div>
              <div className="column is-2">
                <img src={monashLogo} alt="Monash Logo" />
              </div>
              <div className="column">
                <img src={gcgLogo} alt="Global Consulting Group Logo" />
              </div>
            </div>
          </div>
        </div>
        <div className={disclaimerClass}>
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
};

export default Footer;
