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
    };

    this.mapPageListDataToElem = this.mapPageListDataToElem.bind(this);
  }

  componentWillMount() {
    this.setState({
      menuName: this.props.data.contentfulMenuItem.name,
      menuSlug: this.props.data.contentfulMenuItem.slug,
      pageList: this.props.data.contentfulMenuItem.pageList || [],
    });
  }

  mapPageListDataToElem() {
    return this.state.pageList.map((item, index) => {
      const url = `${this.state.menuSlug}/${item.slug}`;
      const title = item.title;

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
      }
    }
  }
`;
