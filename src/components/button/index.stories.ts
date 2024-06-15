import { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta = {
  title: 'UI/Button',
  component: Button,
};

export default meta;

type TStory = StoryObj<typeof Button>;

export const ButtonMultiVariants: TStory = {
  args: {
    disabled: false,
    status: 'active',
    children: 'Текст будет тут',
  },
};
