import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import decodeUrlString from '../utils/search-query';

import beccahImage from '../content/beccah.jpg';
import taruniImage from '../content/taruni.jpg';
import hannahImage from '../content/hannah.jpg';
import aileenImage from '../content/aileen.jpg';

const AboutPage = props => {
  const language = decodeUrlString(props.location.search).lang;

  const englishContent = (
    <div className="section">
      <div className="content">
        <h1>About Us</h1>
        <b>What We Do</b>
        <br />
        <p>
          We provide evidence-based and respectful health knowledge and we make
          it accessible in every language.
        </p>
        <b>Our Mission</b>
        <p>
          We develop partnerships and products that help make sexual and
          reproductive healthcare more accessible and equitable for refugees and
          new migrants.
        </p>
        <b>Our Vision</b>
        <p>
          Shifra knows that a world where every person has access to sexual and
          reproductive health services is possible. We are working towards
          ensuring that healthcare is high quality, respectful and available in
          a language that anyone can understand.
        </p>
        <center>
          <h3>
            <b>
              <u>Our Team</u>
            </b>
          </h3>
        </center>
        <p>
          <img width="15%" src={beccahImage} alt="Beccah Bartlett" />
          <b> Founder:</b> Beccah Bartlett
        </p>
        <p>
          Passionate about reducing health disparities in underserved
          communities and promoting respectful maternity care, Beccah is a
          Registered Nurse-Midwife, a PhD candidate at Monash University and the
          founder of Shifra.
        </p>
        <p>
          Beccah is a vegetarian and her Instagram feed is full of special needs
          cates and pictures of flowers. She loves earl grey tea and believes
          sexual and reproductive health is a right not a privilege.
        </p>
        <hr />
        <p>
          <img width="15%" src={taruniImage} alt="Taruni Roy Khurana" />
          <b> Chief Operating Officer:</b> Taruni Roy Khurana
        </p>
        <p>
          A neuroscientist by training and an aspiring public health
          professional, Taruni is passionate about data driven decision making
          and leveraging her scientific background to drive impact. She is a
          strong advocate of enabling health equity across gender, nationality
          and class lines. At Shifra, Taruni is responsible for strategy,
          operations and business development. She rolls up her sleeves and does
          whatever requires doing at Shifra!
        </p>
        <p>
          When not glued to her Kindle, she is an avid zentangler, an
          enthusiastic board games geek and a spirited ultimate Frisbee player.
          Taruni is a nomad at heart and she combines her loves for travel with
          sampling local cuisine.
        </p>
        <hr />
        <p>
          <img width="15%" src={hannahImage} alt="Hannah Rackers" />
          <b> Research and Evaluation:</b> Hannah Rackers
        </p>
        <p>
          Hannah specialises in health equity, access to care and maternal
          mental health. She is a Research Instructor at University of North
          Carolina-Chapel Hill and a Project Manager for maternal mental health
          grants. Its Shifras commitment to community involvement that Hannah
          believes in most. She believes more interventions should employ
          user-designed development to ensure their interventions are as useful
          and amenable to their intended populations as possible.
        </p>
        <p>
          Hannah admits to playing an embarrassing amount of Fortnite recently
          and came to work with Shifra because access to care and health
          information is essential for fostering personal agency especially for
          people in a new place or learning a new language.
        </p>
        <hr />
        <p>
          <img width="15%" src={aileenImage} alt="Aileen Aylward" />
          <b> Feasibility and Scaling:</b> Aileen Aylward
        </p>
        <p>
          Aileens public health focus is on improving equitable access to health
          care, refugee rights and wellbeing and language education. Currently
          Aileen teaches English as a second language and is developing
          English-language educational materials in Germany where she has been
          based since mid 2017. Aileen runs marathons (for fun!) and has a dog
          named Jasper. She is also a great cook and is always on the hunt for
          the perfect brownie recipe.
        </p>
        <p>
          Aileen joined Shifra because she recognises that quality reproductive
          health care is essential and navigating the reproductive health care
          landscape in a new place is daunting and loves the idea of a
          community-designed tool that makes this easier.
        </p>
        <hr />
      </div>
    </div>
  );

  const arabicContent = (
    <div className="section">
      <div className="content">
        <h1>About Us</h1>
        <h2>Arabic content coming soon!</h2>.
        <b>What We Do</b>
        <br />
        <p>
          We provide evidence-based and respectful health knowledge and we make
          it accessible in every language.
        </p>
        <b>Our Mission</b>
        <p>
          We develop partnerships and products that help make sexual and
          reproductive healthcare more accessible and equitable for refugees and
          new migrants.
        </p>
        <b>Our Vision</b>
        <p>
          Shifra knows that a world where every person has access to sexual and
          reproductive health services is possible. We are working towards
          ensuring that healthcare is high quality, respectful and available in
          a language that anyone can understand.
        </p>
        <center>
          <h3>
            <b>
              <u>Our Team</u>
            </b>
          </h3>
        </center>
        <p>
          <img width="15%" src={beccahImage} alt="Beccah Bartlett" />
          <b> Founder:</b> Beccah Bartlett
        </p>
        <p>
          Passionate about reducing health disparities in underserved
          communities and promoting respectful maternity care, Beccah is a
          Registered Nurse-Midwife, a PhD candidate at Monash University and the
          founder of Shifra.
        </p>
        <p>
          Beccah is a vegetarian and her Instagram feed is full of special needs
          cates and pictures of flowers. She loves earl grey tea and believes
          sexual and reproductive health is a right not a privilege.
        </p>
        <hr />
        <p>
          <img width="15%" src={taruniImage} alt="Taruni Roy Khurana" />
          <b> Chief Operating Officer:</b> Taruni Roy Khurana
        </p>
        <p>
          A neuroscientist by training and an aspiring public health
          professional, Taruni is passionate about data driven decision making
          and leveraging her scientific background to drive impact. She is a
          strong advocate of enabling health equity across gender, nationality
          and class lines. At Shifra, Taruni is responsible for strategy,
          operations and business development. She rolls up her sleeves and does
          whatever requires doing at Shifra!
        </p>
        <p>
          When not glued to her Kindle, she is an avid zentangler, an
          enthusiastic board games geek and a spirited ultimate Frisbee player.
          Taruni is a nomad at heart and she combines her loves for travel with
          sampling local cuisine.
        </p>
        <hr />
        <p>
          <img width="15%" src={hannahImage} alt="Hannah Rackers" />
          <b> Research and Evaluation:</b> Hannah Rackers
        </p>
        <p>
          Hannah specialises in health equity, access to care and maternal
          mental health. She is a Research Instructor at University of North
          Carolina-Chapel Hill and a Project Manager for maternal mental health
          grants. Its Shifras commitment to community involvement that Hannah
          believes in most. She believes more interventions should employ
          user-designed development to ensure their interventions are as useful
          and amenable to their intended populations as possible.
        </p>
        <p>
          Hannah admits to playing an embarrassing amount of Fortnite recently
          and came to work with Shifra because access to care and health
          information is essential for fostering personal agency especially for
          people in a new place or learning a new language.
        </p>
        <hr />
        <p>
          <img width="15%" src={aileenImage} alt="Aileen Aylward" />
          <b> Feasibility and Scaling:</b> Aileen Aylward
        </p>
        <p>
          Aileens public health focus is on improving equitable access to health
          care, refugee rights and wellbeing and language education. Currently
          Aileen teaches English as a second language and is developing
          English-language educational materials in Germany where she has been
          based since mid 2017. Aileen runs marathons (for fun!) and has a dog
          named Jasper. She is also a great cook and is always on the hunt for
          the perfect brownie recipe.
        </p>
        <p>
          Aileen joined Shifra because she recognises that quality reproductive
          health care is essential and navigating the reproductive health care
          landscape in a new place is daunting and loves the idea of a
          community-designed tool that makes this easier.
        </p>
        <hr />
      </div>
    </div>
  );

  switch (language) {
    case 'en':
      return englishContent;
    case 'ar':
      return arabicContent;
    default:
      return englishContent;
  }
};

AboutPage.propTypes = {
  location: PropTypes.object,
};

export default withRouter(AboutPage);
