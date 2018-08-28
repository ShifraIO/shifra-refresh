import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarMenu from './NavbarMenu';

storiesOf('NavbarMenu', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarMenu />);
