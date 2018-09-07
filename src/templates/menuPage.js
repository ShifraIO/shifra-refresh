import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuName: '',
      menuSlug: '',
      pageList: [],
      language: 'en'
    };

    this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
    this.getCardTitleForLanguage = this.getCardTitleForLanguage.bind(this);
  }

  componentWillMount() {
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
    return this.state.pageList.map((item, index) => {
      const url = `${this.state.menuSlug}/${item.slug}`;

      //todo: user language choice
      const title = this.getCardTitleForLanguage(item.titleList, "en");

      return (
        <div className="content" key={index}>
          <div className="card">
            <div className="card-content">
              <p className="title">{title}</p>
            </div>
            <footer className="card-footer">
              <Link className="card-footer-item" to={url}>
                Read
              </Link>
            </footer>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="section">{this.mapPageListDataToElem()}</div>;
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
