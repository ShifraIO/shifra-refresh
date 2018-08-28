import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavbarBrand from './NavbarBrand';

storiesOf('NavbarBrand', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavbarBrand />);
