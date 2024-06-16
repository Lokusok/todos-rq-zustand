import { Meta, StoryObj } from '@storybook/react';
import Drawer from '.';

const meta: Meta = {
  title: 'UI/Drawer',
  component: Drawer.Root,
};

export default meta;

type TStory = StoryObj<typeof Drawer>;

export const DrawerStory: TStory = {
  args: {},
  render: () => (
    <Drawer.Root title="Заголовок">
      <Drawer.Field>Поле тут</Drawer.Field>
      <Drawer.Field>Второе поле тут</Drawer.Field>
      <Drawer.Field>А третье здесь</Drawer.Field>
    </Drawer.Root>
  ),
};
