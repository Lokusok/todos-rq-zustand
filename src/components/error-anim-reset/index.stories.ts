import { Meta, StoryObj } from '@storybook/react';
import ErrorAnimReset from '.';

const meta: Meta = {
  title: 'Pages/ErrorAnimReset',
  component: ErrorAnimReset,
};

export default meta;

type TStory = StoryObj<typeof ErrorAnimReset>;

export const ErrorAnimResetStory: TStory = {
  args: {
    buttonText: 'Кнопка сброса ошибки',
    onErrorReset: () => {},
  },
};
