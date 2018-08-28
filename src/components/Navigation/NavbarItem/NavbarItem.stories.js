import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarItem from './NavbarItem';

storiesOf('NavbarItem', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarItem />);
