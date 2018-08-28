import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decodeUrlString from '../utils/search-query';

// class ContentPage extends Component {
//   render() {
//     return (
//       <div
//         className="section content"
//         dangerouslySetInnerHTML={{
//           __html: this.props.data.contentfulPage.content.childMarkdownRemark
//             .html,
//         }}
//       />
//     );
//   }
// }

class ContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'en',
      defaultLanguage: 'en',
      search: '',
    };

    this.getContentForLanguage = this.getContentForLanguage.bind(this);
    this.isContentAvaliableInLanguage = this.isContentAvaliableInLanguage.bind(
      this
    );
    this.buildPageHTML = this.buildPageHTML.bind(this);
  }

  componentWillMount() {
    this.setState({
      language:
        decodeUrlString(this.props.location.search).lang || this.state.language,
      search: this.props.location.search,
    });
  }

  isContentAvaliableInLanguage(contentArray, language) {
    return contentArray.reduce((acc, curr) => {
      if (curr.language.code === language) {
        return true;
      }
    }, false);
  }

  getContentForLanguage(contentList, language, defaultLanguage) {
    const contentlanguage = this.isContentAvaliableInLanguage(
      contentList,
      language
    )
      ? language
      : defaultLanguage;

    return contentList.reduce((acc, curr) => {
      curr.language.code;
      return curr.language.code === contentlanguage
        ? curr.contentText.childMarkdownRemark.html
        : acc;
    }, null);
  }

  buildPageHTML(pageContentHTML) {
    return { __html: pageContentHTML };
  }

  render() {
    return (
      <div
        className="section content"
        dangerouslySetInnerHTML={this.buildPageHTML(
          this.getContentForLanguage(
            this.props.data.contentfulPage.contentList,
            this.state.language,
            this.state.defaultLanguage
          )
        )}
      />
    );
  }
}

ContentPage.PropTypes = {
  data: PropTypes.object.isRequired,
};

export default ContentPage;

export const pageQuery = graphql`
  query pageContentQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      titleList {
        titleText
        language {
          code
        }
      }
      contentList {
        contentText {
          childMarkdownRemark {
            html
          }
        }
        language {
          code
        }
      }
    }
  }
`;
