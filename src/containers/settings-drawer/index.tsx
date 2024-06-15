import { memo } from 'react';

import Drawer from '@/components/drawer';
import Toggler from '@/components/toggler';
import LabelRow from '@/components/label-row';
import Button from '@/components/button';

import { useListSettingsStore } from '@/store/list-settings';

type TProps = {
  onClose?: () => void;
};

function SettingsDrawer({ onClose }: TProps) {
  const listSettingsStore = useListSettingsStore();

  const callbacks = {
    onShowArchivedChange: (showArchivedVal: boolean) => {
      listSettingsStore.setShowArchived(showArchivedVal);
    },
  };

  return (
    <Drawer.Root title="Настройки" onClose={onClose}>
      <Drawer.Field>
        <LabelRow
          title="Показать архивированные"
          input={
            <Toggler
              checked={listSettingsStore.showArchived}
              onChange={callbacks.onShowArchivedChange}
            />
          }
        />
      </Drawer.Field>

      <Drawer.Field>
        <LabelRow title="Показать графики:" input={<Button status="active">Открыть</Button>} />
      </Drawer.Field>

      <Drawer.Field>
        <LabelRow
          title="Язык"
          input={
            <>
              <select>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </>
          }
        />
      </Drawer.Field>
    </Drawer.Root>
  );
}

export default memo(SettingsDrawer);
