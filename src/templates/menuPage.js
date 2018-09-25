import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import { cx, css } from 'emotion';

const vertCentred = css`margin: 0 auto;`;

const cardSize = css`
    display: flex;
    align-items: center;

    min-height: 200px;
    @media (max-width: 768px) {
      min-height: 100px;
    }
  `;

const cardTitleText = css`display: flex; text-align: center;`;

class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuName: '',
      menuSlug: '',
      pageList: [],
      language: "en"
    };

    this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
    this.getCardTitleForLanguage = this.getCardTitleForLanguage.bind(this);
    this.pageItemToCard = this.pageItemToCard.bind(this);
    this.themePaletteToCss = this.themePaletteToCss.bind(this);
  }

  componentWillMount() {
    this.setState({
      menuName: this.props.data.contentfulMenuItem.title,
      menuSlug: this.props.data.contentfulMenuItem.slug,
      pageList: this.props.data.contentfulMenuItem.pageList || [],
      themePalette: this.themePaletteToCss(this.props.data.contentfulMenuItem.themePalette)
    });
  }

  //take a theme palette object (from contentful), convert to relevent css classes
  themePaletteToCss(themePalette) {
    return {
      text: css`
        color: ${themePalette.background};
        font-weight: normal;

        &:hover {
          color: ${themePalette.background};
        }`,

      background: css`background-color: ${themePalette.primary};`,
      cardParentContainerHover: css``
    }
  }

  //given a titlelist, return the title in chosen language, else default to en
  getCardTitleForLanguage(titleList, language) {
    //default on the first title, english
    let chosenTitle = titleList[0].titleText;

    titleList.forEach( title => {
      if (title.language.code === language)
         chosenTitle = title.titleText;
    });

    return chosenTitle;
  }

  //using the page list, create the grid of cards
  mapPageListDataToElem() {
    let row = [], 
    pageListGrid = [],
    max = this.state.pageList.length,
    titleCard;

    // list needs to be in grid, max 3 per row
    for (let i = 0; i < max; i+=3) {
      row = [];
      for (let j = i; j < i + 3; j++) {
        if (j >= max)
          break;

        titleCard = this.state.pageList[j];

        row.push(this.pageItemToCard(titleCard));
      }

      pageListGrid.push(
        <div className="columns">
          { row.map(col => { return(<div className="column">{col}</div>) }) }
        </div>
      );
    }

    return pageListGrid;
  }

  //generate a card from a page
  pageItemToCard(page) {
    const url = `/${this.state.menuSlug}/${page.slug}`;
    const title = this.getCardTitleForLanguage(page.titleList, this.state.language);

    return (
      <div className={`content ${this.state.themePalette.cardParentContainerHover}`}>
        <div className={`card ${cardSize} ${this.state.themePalette.background}`}>
          <div className={`card-content ${cardTitleText} ${vertCentred}`}>
              <Link className={`title ${this.state.themePalette.text}`} to={url}>
                {title}
              </Link>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="section">
        {this.mapPageListDataToElem()}
      </div> 
    );
  }
}

MenuPage.PropTypes = {
  data: PropTypes.object,
};

export default MenuPage;

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

      themePalette { 
        primary
        secondary
        background
      }
    }
  }
`;
