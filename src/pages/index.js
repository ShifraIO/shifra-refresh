import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import nurJourneyImage from '../content/nur-journey2.jpg';

const IndexPage = props => {
  return (
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
};

export default IndexPage;
