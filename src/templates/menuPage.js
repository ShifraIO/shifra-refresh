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

    console.log(this.props)

    this.state = {
      menuName: '',
      menuSlug: '',
      pageList: [],
      language: 'en'
    };

    this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
    this.getCardTitleForLanguage = this.getCardTitleForLanguage.bind(this);
    this.pageItemToCard = this.pageItemToCard.bind(this);
  }

  componentWillMount() {
    console.log(this.props)
    this.setState({
      menuName: this.props.data.contentfulMenuItem.title,
      menuSlug: this.props.data.contentfulMenuItem.slug,
      pageList: this.props.data.contentfulMenuItem.pageList || [],
    });
  }

  getCardTitleForLanguage(card, language) {
    card.forEach( card => {
      if (card.language.code === language)
        return card.titleText;
    });

    //else revert to default
    return card[0].titleText;
  }

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

  pageItemToCard(page) {
    const url = `/${this.state.menuSlug}/${page.slug}`;

    //todo: user language choice
    const title = this.getCardTitleForLanguage(page.titleList, "en");

    return (
      <div className="content">
        <div className={`card ${cardSize}`}>
          <div className={`card-content ${cardTitleText} ${vertCentred}`}>
              <Link className={`title`} to={url}>
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
    }
  }
`;
