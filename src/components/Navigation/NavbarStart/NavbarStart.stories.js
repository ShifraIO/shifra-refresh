import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarStart from './NavbarStart';

storiesOf('NavbarStart', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarStart />);
