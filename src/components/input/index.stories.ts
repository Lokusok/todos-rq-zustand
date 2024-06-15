import { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
};

export default meta;

type TStory = StoryObj<typeof Input>;

export const InputMultiVariant: TStory = {
  args: {
    multiline: false,
    placeholder: 'Пример текста',
  },
};
