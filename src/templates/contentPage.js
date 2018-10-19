import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import decodeUrlString from '../utils/search-query';
import './contentPage.scss';
import { withRouter } from 'react-router';

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
    this.getButtonTitleForLanguage = this.getButtonTitleForLanguage.bind(this);
    this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
    this.getIconForPage = this.getIconForPage.bind(this);
    this.getThemeName = this.getThemeName.bind(this);
    this.getButtonTitleForLanguage = this.getButtonTitleForLanguage.bind(this);
    this.getFontDirection = this.getFontDirection.bind(this);
  }

  componentWillMount() {
    this.setState({
      language:
        decodeUrlString(this.props.location.search).lang || this.state.language,
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

  getFontDirection(language = '') {
    // Will need to extend for greater language support.
    if (language === 'ar') {
      return 'rtl';
    }
    return 'ltr';
  }

  // get the theme classname postfix from the menu slug
  getThemeName(menuSlug) {
    let endIdx = menuSlug.indexOf('-');
    return menuSlug.substr(0, endIdx);
  }

  getCardTitleForLanguage(titleList, language) {
    let chosenTitle = null;
    titleList.forEach(title => {
      if (title.language.code === language) chosenTitle = title.titleText;
    });

    if (chosenTitle !== null) return chosenTitle;
    else
      return this.getCardTitleForLanguage(
        titleList,
        this.state.defaultLanguage
      );
  }

  // given a titlelist, return the title in chosen language, else default to en
  getButtonTitleForLanguage(titleList, language) {
    let chosenTitle = null;
    titleList.forEach(title => {
      if (title.language.code === language) chosenTitle = title.titleText;
    });

    return chosenTitle
      ? chosenTitle
      : this.getCardTitleForLanguage(titleList, this.state.defaultLanguage);
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

  // using the page list, create the buttons
  mapPageListDataToElem() {
    const pageListGrid = [];
    const prevPage = this.props.data.contentfulPage.previousPage;
    const nextPage = this.props.data.contentfulPage.nextPage;
    let themeNamePrev = null;
    let themeNameNext = null;
    let urlPrev = null;
    let urlNext = null;
    let titlePrev = null;
    let titleNext = null;

    if (prevPage !== null) {
      themeNamePrev = this.getThemeName(prevPage.parentMenu.slug);
      urlPrev = `/${prevPage.parentMenu.slug}/${prevPage.slug}${
        this.props.history.location.search
      }`;
      titlePrev = this.getButtonTitleForLanguage(
        prevPage.titleList,
        this.state.language
      );
      pageListGrid.push(
        <div className="column column-prev">
          <Link to={urlPrev}>
            <div className="content button-background">
              <div className={`button button-size has-background-${themeNamePrev}`}>
                <div className="button-content button-title-text">
                  <p className="title has-text-white-bis button-link-text">
                    {this.getIconForPage(prevPage)}
                    <br />
                    {titlePrev}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    } else {
      pageListGrid.push(
        <div className="column column-prev">
          <div className="content button-background">
            <div className="button button-size button-empty">
              <div className="button-content button-title-text" />
            </div>
          </div>
        </div>
      );
    }

    if (nextPage !== null) {
      themeNameNext = this.getThemeName(nextPage.parentMenu.slug);
      urlNext = `/${nextPage.parentMenu.slug}/${nextPage.slug}${
        this.props.history.location.search
      }`;
      titleNext = this.getButtonTitleForLanguage(
        nextPage.titleList,
        this.state.language
      );
      pageListGrid.push(
        <div className="column column-next">
          <Link to={urlNext}>
            <div className="content button-background">
              <div className={`button button-size has-background-${themeNameNext}`}>
                <div className="button-content button-title-text">
                  <p className="title has-text-white-bis button-link-text">
                    {this.getIconForPage(nextPage)}
                    <br />
                    {titleNext}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    } else {
      pageListGrid.push(
        <div className="column column-next">
          <div className="content button-background">
            <div className="button button-size button-empty">
              <div className="button-content button-title-text" />
            </div>
          </div>
        </div>
      );
    }

    return pageListGrid;
  }

  // given a page and menu title, load the relevent icon
  getIconForPage(page) {
    let pageIcon = '#';

    // try to get the image
    pageIcon = require(`../content/icons/${page.parentMenu.slug}/${
      page.slug
    }.png`);

    if (pageIcon === '#') pageIcon = require(`../content/shifra-logo.png`);

    return (
      <span>
        <img src={pageIcon} className="page-icon" />
      </span>
    );
  }

  render() {
    return (
      <div>
        <div
          dir={this.getFontDirection(this.state.language)}
          className="section content"
          dangerouslySetInnerHTML={this.buildPageHTML(
            this.getContentForLanguage(
              this.props.data.contentfulPage.contentList,
              this.state.language,
              this.state.defaultLanguage
            )
          )}
        />
        <div className="columns">{this.mapPageListDataToElem()}</div>
      </div>
    );
  }
}

ContentPage.PropTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.any,
  history: PropTypes.any,
};

export default withRouter(ContentPage);

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
      nextPage {
        slug
        titleList {
          titleText
          language {
            code
          }
        }
        parentMenu {
          slug
        }
      }
      previousPage {
        slug
        titleList {
          titleText
          language {
            code
          }
        }
        parentMenu {
          slug
        }
      }
      parentMenu {
        slug
        menuItemTextList {
          menuItemText
        }
      }
    }
  }
`;
