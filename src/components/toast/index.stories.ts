import { Meta, StoryObj } from '@storybook/react';
import Toast from '.';

const meta: Meta = {
  title: 'UI/Toast',
  component: Toast,
};

export default meta;

type TStory = StoryObj<typeof Toast>;

export const ToastStory: TStory = {
  args: {
    title: 'Пример заголовка',
    descr: 'Сюда пойдёт какое-либо краткое описание...',
    closeCb: () => {},
    status: 'info',
  },
};
