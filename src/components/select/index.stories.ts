import { Meta, StoryObj } from '@storybook/react';
import Select from '.';

const meta: Meta = {
  title: 'UI/Select',
  component: Select,
};

export default meta;

type TStory = StoryObj<typeof Select>;

export const SelectStory: TStory = {
  args: {
    options: [
      {
        label: 'Значение 1',
        value: 'val1',
      },
      {
        label: 'Значение 2',
        value: 'val2',
      },
      {
        label: 'Значение 3',
        value: 'val3',
      },
    ],
    value: 'val1',
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['val1', 'val2', 'val3'],
    },
  },
};
