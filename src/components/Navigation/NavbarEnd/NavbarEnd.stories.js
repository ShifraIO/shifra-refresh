import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarEnd from './NavbarEnd';

storiesOf('NavbarEnd', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarEnd />);
