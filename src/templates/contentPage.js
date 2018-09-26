import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import decodeUrlString from '../utils/search-query';

import { cx, css } from 'emotion';

const vertCentred = css`margin: 0 auto;`;

const cardSize = css`
    display: flex;
    align-items: center;

    min-height: 50px;
	max-width: 300px;
    @media (max-width: 768px) {
      min-height: 50px;
    }
  `;

const cardTitleText = css`display: flex; text-align: center;`;

const menuIcon = css`
    max-width: 50px;
    max-height: 50px;
`;

class ContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSlug: '',
      language: 'en',
      defaultLanguage: 'en',
      search: '',
    };

    this.getContentForLanguage = this.getContentForLanguage.bind(this);
    this.isContentAvaliableInLanguage = this.isContentAvaliableInLanguage.bind(
      this
    );
    this.buildPageHTML = this.buildPageHTML.bind(this);
	this.getCardTitleForLanguage = this.getCardTitleForLanguage.bind(this);
	this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
	//this.mapPreviousNextDataToElem = this.mapPreviousNextDataToElem.bind(this);
	this.pageItemToCard = this.pageItemToCard.bind(this);
	this.themePaletteToCss = this.themePaletteToCss.bind(this);
    this.getIconForPage = this.getIconForPage.bind(this);
  }

  componentWillMount() {
    this.setState({
	  menuSlug: this.props.data.contentfulPage.parentMenu.slug,
      language:
        decodeUrlString(this.props.location.search).lang || this.state.language,
      search: this.props.location.search,
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
  
  //using the page list, create the grid of cards
  mapPageListDataToElem() {
    let row = [], 
    pageListGrid = [],
    max = 2,
    titleCard,
	themePalette;

    // list needs to be in grid, max 2 per row
    for (let i = 0; i < max; i+=2) {
      row = [];
	  
	  titleCard = this.props.data.contentfulPage.previousPage;
	  if (titleCard !== null){
		themePalette = this.themePaletteToCss(this.props.data.contentfulPage.previousPage.parentMenu.themePalette)
		row.push(this.pageItemToCard(titleCard, themePalette));
	  }
	  
	  titleCard = this.props.data.contentfulPage.nextPage;
	  if (titleCard !== null){
		themePalette = this.themePaletteToCss(this.props.data.contentfulPage.nextPage.parentMenu.themePalette)
	    row.push(this.pageItemToCard(titleCard, themePalette));
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
  pageItemToCard(page, themePalette) {
    const url = `/${page.parentMenu.slug}/${page.slug}`;
    const title = this.getCardTitleForLanguage(page.titleList, this.state.language);

    return (
      <div className={`content ${themePalette.cardParentContainerHover}`}>
        <div className={`card ${cardSize} ${themePalette.background}`}>
          <div className={`card-content ${cardTitleText} ${vertCentred}`}>
              <Link className={`title ${themePalette.text}`} to={url}>
                {this.getIconForPage(page)}
                <br/>
                {title}
              </Link>
          </div>
        </div>
      </div>
    )
  }
  
  //given a page and menu title, load the relevent icon
  getIconForPage(page) {
    let imgImp = "#";

    //try to get the image
    try {
      imgImp = require(`../content/icons/${page.parentMenu.slug}/${page.slug}.png`);
    } catch (e){
      console.log("file " + `/src/content/icons/${page.parentMenu.slug}/${page.slug}.png does not exist` ); 
    };

    return (
      <span>
        <img src={imgImp} className={menuIcon}/>
      </span>
    );
  }

  render() {
    return (
      <div>
	  <div
        className="section content"
        dangerouslySetInnerHTML={this.buildPageHTML(
          this.getContentForLanguage(
            this.props.data.contentfulPage.contentList,
            this.state.language,
            this.state.defaultLanguage
          )
        )}
      >
	  </div>
	  <div className="section content">
        {this.mapPageListDataToElem()}
	  </div>
	  </div>
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
		  themePalette {
            primary
            secondary
            background
		  }
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
		  themePalette {
            primary
            secondary
            background
		  }
		}
	  }
	  parentMenu {
        slug
		menuItemTextList {
          menuItemText
        }
	    themePalette {
          primary
          secondary
          background
		}
      }
    }
  }
`;
