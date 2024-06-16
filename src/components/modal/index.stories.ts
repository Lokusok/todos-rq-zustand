import { Meta, StoryObj } from '@storybook/react';
import Modal from '.';

const meta: Meta = {
  title: 'UI/Modal',
  component: Modal,
};

export default meta;

type TStory = StoryObj<typeof Modal>;

export const ModalStory: TStory = {
  args: {
    title: 'Пример модалки',
    onClose: () => {},
    children: 'DEMO CONTENT',
    okButtonText: 'DEMO OK',
    onSuccess: () => {},
    rejectBtnText: 'DEMO REJECT',
    onReject: () => {},
  },
};
