import React from 'react';

const AboutPage = props => {
  return (
    <div className="section">
      <div className="content">
        <h1>About Us</h1>
        <h3>Shifra has been designed to:</h3>
        <p>
          <ul>
            <li>
              Help you access culturally sensitive sexual and reproductive
              health information in your language.
            </li>
            <li>
              Help you find respectful sexual and reproductive health services
              that specialise in migrant and refugee health.
            </li>
            <li>
              Gather and analyse data on communities' needs to help improve
              local health service delivery.
            </li>
          </ul>
        </p>
        <h3>
          Shifra is new and we are currently available in English and Arabic.
          Soon we will be operating in
        </h3>
        <p>
          <ul>
            <li>Tamil</li>
            <li>Burmese (Karen)</li>
            <li>Persian (Farsi and Dari)</li>
            <li>Vietnamese and Chinese (Mandarin)</li>
            <li>Dinka</li>
            <li>Urdu</li>
          </ul>
        </p>
        <p>
          <span>
            The information we provide can also be helpful to anyone trying to
            navigate the Australian health system in English.
          </span>
          <br />
          <span>
            Shifra is a grassroots organisation. We have much more to add and
            are working hard on improving.
          </span>
          <br />
          <span>
            <a href={'mailto:info@shifra.io'}>Feedback</a> is always welcome and
            we'd love to hear from you if you'd like to{' '}
            <a href={'mailto:info@shifra.io'}>volunteer</a>
            to make Shifra more accessible and helpful to everyone.
          </span>
          <br />
          <span>
            We believe access to quality, respectful health care, in a language
            you understand is a basic human right.
          </span>
          <br />
          <span>
            Shifra will one day be available in every language and in every
            country. Your help will get us there!
          </span>
        </p>
        <h3>
          Shifra shares health knowledge in a language that is easy to
          understand and in a way which is respectful for all.
        </h3>
        <p>
          <ul>
            <li>
              We believe that respectful health knowledge should be accessible
              to all women, in every language.
            </li>
            <li>
              We recognise that migrants and refugees have unique and varied
              barriers to accessing quality reproductive health care within
              their host communities.
            </li>
            <li>
              We acknowledge that they are the best people to determine what
              these barriers are and how best to overcome them. Our focus is on
              enabling women and girls with knowledge to make their own
              decisions about their own health care options.
            </li>
          </ul>
        </p>
        <p>
          <h3>
            Shifra uses mobile technology and data analytics to increase access
            to quality reproductive health for Australia’s new migrants and
            refugees.
          </h3>
          <ul>
            <li>
              We work with all stakeholders to co-design each and every version
              of Shifra to ensure it fits that particular community.
            </li>
            <li>
              We develop the local capacity of communities so they are the ones
              maintaining and improving Shifra long term.
            </li>
            <li>
              We integrate evaluation tools into our implementation design to
              ensure we are measuring impact from the start.
            </li>
          </ul>
        </p>
        <hr/>
        <p>
          <p>We believe that for girls to count, they need to be counted!</p>
          <p>
            We are working towards improving reproductive health access for the
            millions of women and girls around the world who currently lack it.
          </p>
          <p>
            We want you to join the the Shifra movement and help us get there
            sooner. Please <a href={'mailto:info@shifra.io'}>contact us</a> now
            to find out how.
          </p>
          <img
            src={'/img/mAdapt-team.jpg'}
            alt={'Shifra Launch Party'}
          />
          <p>Shifra’s Designers, Developers and Researchers</p>
          <p>Launch Party , 2 August 2017</p>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
