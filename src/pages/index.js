import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import decodeUrlString from '../utils/search-query';

import nurJourneyImage from '../content/nur-journey2.jpg';

const IndexPage = props => {
  const language = decodeUrlString(props.location.search).lang;

  const englishContent = (
    <div className="section">
      <div className="content">
        <h1>Welcome to Shifra!</h1>
        <p>
          Shifra helps non-English speakers find sexual and reproductive health
          information and services in Australia. We are committed to improving
          this access for migrants, refugees and asylum seekers.
        </p>
        <img src={nurJourneyImage} alt="Nur's Journey" />
      </div>
    </div>
  );

  const arabicContent = (
    <div className="section">
      <div className="content">
        <h1>Welcome to Shifra!</h1>
        <h2>Arabic content coming soon!</h2>
        <p>
          Shifra helps non-English speakers find sexual and reproductive health
          information and services in Australia. We are committed to improving
          this access for migrants, refugees and asylum seekers.
        </p>
        <img src={nurJourneyImage} alt="Nur's Journey" />
      </div>
    </div>
  );

  switch(language) {
    case 'en':
      return englishContent;
    case 'ar':
      return arabicContent;
    default:
      return englishContent;
  }
};

IndexPage.propTypes = {
  location: PropTypes.object,
};

export default withRouter(IndexPage);
