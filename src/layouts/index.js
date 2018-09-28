import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import './index.scss';
import decodeUrlString from '../utils/search-query';
import Footer from '../components/Footer/Footer';

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      search: '',
    };

    this.getFontDirection = this.getFontDirection.bind(this);
    this.getThemeStringFromUrl = this.getThemeStringFromUrl.bind(this);
  }

  componentWillMount() {
    this.setState({
      language: decodeUrlString(this.props.location.search).lang,
      search: this.props.location.search,
    });
  }

  getFontDirection(language = '') {
    // Will need to extend for greater language support.
    if (language === 'ar') {
      return 'rtl';
    }
    return 'ltr';
  }

  getThemeStringFromUrl() {
    const location = this.props.location.pathname;
    const locationArray = location.split('/');
    return locationArray[1];
  }

  render() {
    return (
      <div className="fix">
        <Helmet
          title="Gatsby Starter Bulma Storybook"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header
          allContentfulMenuItem={this.props.data.allContentfulMenuItem}
          language={this.state.language}
          theme={this.getThemeStringFromUrl()}
          search={this.state.search}
        />
        <div className='stretch-fix'
          // style={{
          //   margin: '0 auto',
          //   maxWidth: 960,
          //   padding: '0px 1.0875rem 1.45rem',
          //   paddingTop: 0,
          // }}

          dir={this.getFontDirection(this.state.language)}
        >
          {this.props.children()}
        </div>
        <Footer className="footer-fix"/>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object,
};

export default TemplateWrapper;

export const query = graphql`
  query MenuQuery {
    allContentfulMenuItem(sort: { fields: [menuOrder] }) {
      edges {
        node {
          slug
          menuItemTextList {
            menuItemText
            language {
              code
            }
          }
          pageList {
            slug
            titleList {
              titleText
              language {
                code
              }
            }
          }
        }
      }
    }
  }
`;
