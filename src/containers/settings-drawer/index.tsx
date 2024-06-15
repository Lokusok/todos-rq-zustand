import { memo } from 'react';

import Drawer from '@/components/drawer';
import Toggler from '@/components/toggler';
import LabelRow from '@/components/label-row';
import Button from '@/components/button';
import Select from '@/components/select';

import { useListSettingsStore } from '@/store/list-settings';
import { TLanguages } from '@/store/list-settings/types';

import { useModalsStore } from '@/store/modals';

type TProps = {
  onClose?: () => void;
};

function SettingsDrawer({ onClose }: TProps) {
  const listSettingsStore = useListSettingsStore();
  const modalsStore = useModalsStore();

  const callbacks = {
    onShowArchivedChange: (showArchivedVal: boolean) => {
      listSettingsStore.setShowArchived(showArchivedVal);
    },
    onLanguageChange: (language: TLanguages) => {
      listSettingsStore.setLanguage(language);
    },
    openChartsModal: () => {
      modalsStore.add({ type: 'charts' });
      // onClose?.();
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
        <LabelRow
          title="Показать графики:"
          input={
            <Button onClick={callbacks.openChartsModal} status="active">
              Открыть
            </Button>
          }
        />
      </Drawer.Field>

      <Drawer.Field>
        <LabelRow
          title="Язык:"
          input={
            <>
              <Select
                onChange={callbacks.onLanguageChange}
                options={[
                  {
                    value: 'en',
                    label: 'English',
                  },
                  {
                    value: 'ru',
                    label: 'Русский',
                  },
                ]}
                value={listSettingsStore.language}
              />
            </>
          }
        />
      </Drawer.Field>
    </Drawer.Root>
  );
}

export default memo(SettingsDrawer);
