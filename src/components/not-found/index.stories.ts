import { Meta, StoryObj } from '@storybook/react';
import NotFound from '.';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta: Meta = {
  title: 'Pages/NotFound',
  component: NotFound,
};

export default meta;

type TStory = StoryObj<typeof NotFound>;

export const NotFoundStory: TStory = {
  args: {
    goToHref: '/',
    buttonText: 'Домой',
  },
  decorators: [withRouter],
};
