import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import decodeUrlString from '../utils/search-query';

import './menuPage.scss';

class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuSlug: '',
      pageList: [],
      language: 'en',
      defaultLanguage: 'en',
    };

    this.updateLanguageState(props);
  }

  componentWillMount() {
    this.setState({
      menuSlug: this.props.data.contentfulMenuItem.slug,
      pageList: this.props.data.contentfulMenuItem.pageList || [],
      themeName: this.getThemeName(),
    });
  }

  componentWillReceiveProps(props) {
    this.updateLanguageState(props);
  }

  updateLanguageState = props => {
    this.setState(
      Object.assign(this.state, {
        language: decodeUrlString(props.history.location.search).lang,
      })
    );
  }

  //get the theme classname postfix from the menu slug
  getThemeName = _ => {
    let endIdx = this.props.data.contentfulMenuItem.slug.indexOf('-');
    return this.props.data.contentfulMenuItem.slug.substr(0, endIdx);
  }

  //given a titlelist, return the title in chosen language, else default to en
  getCardTitleForLanguage = (titleList, language) => {
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

  //using the page list, create the grid of cards
  mapPageListDataToElem = () => {
    let row = [],
      pageListGrid = [],
      max = this.state.pageList.length,
      titleCard;

    // list needs to be in grid, max 3 per row
    for (let i = 0; i < max; i += 3) {
      row = [];
      for (let j = i; j < i + 3; j++) {
        if (j >= max) break;

        titleCard = this.state.pageList[j];

        row.push(this.pageItemToCard(titleCard));
      }

      pageListGrid.push(
        <div className="columns" key={i}>
          {row.map((col, idx) => {
            return <div key={idx} className="column">{col}</div>;
          })}
        </div>
      );
    }

    return pageListGrid;
  }

  //generate a card from a page
  pageItemToCard = page => {
    const url = `/${this.state.menuSlug}/${page.slug}${
      this.props.history.location.search
      }`;
    const title = this.getCardTitleForLanguage(
      page.titleList,
      this.state.language
    );

    return (
      <Link to={url}>
        <div className="content card-background">
          <div className={`card card-size has-background-${this.state.themeName}`}>
            <div className="card-content card-title-text">
              <p className="title has-text-white-bis has-text-weight-light">
                {this.getIconForPage(page)}
                <br/>
                {title}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  //given a page and menu title, load the relevent icon
  getIconForPage = page => {
    let pageIcon = '#';

    //try to get the image
    try {
      pageIcon = require(`../content/icons/${this.state.menuSlug}/${
        page.slug
      }.png`);
    } catch (e) {
      console.log(
        'file ' +
          `/src/content/icons/${this.state.menuSlug}/${
            page.slug
          }.png does not exist`
      );
    }

    return (
      <span>
        <img src={pageIcon} className="menu-icon" />
      </span>
    );
  }

  render() {
    return <div className="section">{this.mapPageListDataToElem()}</div>;
  }
}

MenuPage.PropTypes = {
  data: PropTypes.object,
};

export default withRouter(MenuPage);

export const pageQuery = graphql`
  query menuItemContentQuery($slug: String!) {
    contentfulMenuItem(slug: { eq: $slug }) {
      slug

      menuItemTextList {
        menuItemText
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
`;
