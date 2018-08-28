import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarHamburger from './NavbarHamburger';

storiesOf('NavbarHamburger', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarHamburger />);
