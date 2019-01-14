import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './footer.scss'
import { withRouter } from 'react-router'
import logo from '../../content/shifra-logo.png'
import moment from 'moment'
import { isMobile } from '../../utils/screen'
import Slider from "react-slick"

class Footer extends Component {
  state = {}

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
  getIconForLogo = logo => {
    let logoIcon = '#';

    // try to get the image
    try {
      logoIcon = require(`../../content/contributors/${logo}.png`);
    } catch (e) {
      logoIcon = null;
    }

    return logoIcon;
  }

  getLogoRows = _ => {
    const logos = [
      {
        slug: 'swinburne',
        name: 'Swinburne',
        url: 'https://www.swinburne.edu.au/'
      },{
        slug: 'ygap',
        name: 'YGAP',
        url: 'https://ygap.org/'
      },{
        slug: 'monash',
        name: 'Monash',
        url: 'https://www.monash.edu/'
      },{
        slug: 'gcgmonash',
        name: 'Global Consulting Group',
        url: 'https://www.gcg.org.au'
      },{
        slug: 'sylaba',
        name: 'Sylaba',
        url: 'https://sylaba.com.au/'
      },{
        slug: 'minter',
        name: 'Minter Ellison',
        url: 'https://www.minterellison.com/'
      },{
        slug: 'yc',
        name: 'YC',
        url:' https://yourcreative.com.au'
      }
    ]

    const logosPerRow = isMobile() ? 999 : Math.ceil(logos.length/2)

    let logoRows = [[]]

    if(!isMobile()){
      logoRows.push([])
    }

    logos.forEach((logo, index) => {
      if(index < logosPerRow){
        logoRows[0].push(logo)
      }else{
        logoRows[1].push(logo)
      }
    })

    return logoRows
  }

  render() {
    // the logo stuff is a bit over-engineered, but it's always hard to make a bunch of logos look neat.
    const logoRows = this.getLogoRows()

    return (
      <footer className="footer">
        <div className="content has-text-centered top">
          <div>
            <a className="footerLink" href={'tel:000'}>
              <i className="fas fa-phone" /> In case of emergency call 000
            </a>
            <a className="footerLink" href={'tel:131114'}>
              <i className="fas fa-phone" /> Lifeline Phone Services 13 11 14
            </a>
          </div>
        </div>
        <div className="content has-text-centered middle">
        <ul className="halves clearfix">
          <li>
            <ul className="clearfix columns-container">
              <li>
                <img src={logo} className="shifra-logo" />
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
              </li>
              <li>
                <ul className="clearfix">
                  <li>
                    <a className="footerLink" href={`/about${this.props.history.location.search}`}>
                      About
                    </a>
                  </li>
                  <li>
                    <a className="footerLink" href={'mailto:info@shifra.io'}>
                      Contact
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <ul className="clearfix">
                  <li>
                    <a className="footerLink" href={`/privacy${this.props.history.location.search}`}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="footerLink" href={`/termsofuse${this.props.history.location.search}`}>
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="logo-half">
            { logoRows.map((logoRow, index) => {
              const logos = logoRow.map((logo, logoIndex) => {
                return (
                  <li key={logoIndex}>
                    <a href={logo.url} target="_blank">
                      <img src={this.getIconForLogo(logo.slug)} alt={`${logo.name} Logo`} />
                    </a>
                  </li>
                )
              })

              if(isMobile()){
                const sliderSettings = {
                  arrows: false,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 0,
                  speed: 3000,
                  cssEase:'linear'
                }

                return (
                  <Slider 
                    key={index} 
                    className="logos clearfix"
                    { ...sliderSettings }
                  >
                    { logos }
                  </Slider>
                )
              }else{
                return (
                  <ul className="logos clearfix" key={index}>
                    { logos }
                  </ul>
                )
              }
            }) }
          </li>
        </ul>
        </div>
        <div className="disclaimer">
          <p>
            © { moment().format('Y') } Shifra. All rights reserved.
          </p>
          <p>
            This website and the resources to which it refers are intended to provide educational and general information only. They do not provide comprehensive medical or legal advice. Please seek specific medical or legal advice in relation to individual circumstances. Shifra accepts no responsibility or legal liability for reliance on the information contained on this site, or other sites to which this site links. De-identified data obtained from this website may be used by Shifra for research purposes.
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
