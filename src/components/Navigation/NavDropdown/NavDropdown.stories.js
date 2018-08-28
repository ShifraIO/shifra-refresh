import React from 'react';

import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import NavDropdown from './NavDropdown';

storiesOf('NavDropdown', module)
  .addDecorator(StoryRouter())
  .add('default', () => <NavDropdown />);
