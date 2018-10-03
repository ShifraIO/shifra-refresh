import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import './index.scss';
import decodeUrlString from '../utils/search-query';
import Footer from '../components/Footer/Footer';
import { withRouter } from 'react-router';

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      search: '',
    };

    this.getThemeStringFromUrl = this.getThemeStringFromUrl.bind(this);
  }

  componentWillMount(props) {
    this.setState({
      language: decodeUrlString(this.props.location.search).lang,
      search: this.props.location.search,
    });
  }

  componentWillUpdate(props) {
    if (this.state.language !== decodeUrlString(props.location.search).lang) {
      this.setState({
        language: decodeUrlString(props.location.search).lang,
        search: props.location.search,
      });
    }
  }

  getThemeStringFromUrl() {
    const location = this.props.location.pathname;
    const locationArray = location.split('/');
    return locationArray[1];
  }

  render() {
    return (
      <div>
        <Helmet
          title="Shifra"
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
          style={{
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 10000,
          }}
        />
        <div className="content-stretch-fix">{this.props.children()}</div>
        <Footer className="footer-fix" />
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
