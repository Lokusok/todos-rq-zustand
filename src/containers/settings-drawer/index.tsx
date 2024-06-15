import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/drawer';
import Toggler from '@/components/toggler';
import LabelRow from '@/components/label-row';
import Button from '@/components/button';
import Select from '@/components/select';
import Tooltip from '@/components/tooltip';

import { useListSettingsStore } from '@/store/list-settings';
import { TLanguages } from '@/store/list-settings/types';

import { useModalsStore } from '@/store/modals';
import useTodos from '@/api/hooks/use-todos';

type TProps = {
  onClose?: () => void;
};

function SettingsDrawer({ onClose }: TProps) {
  const listSettingsStore = useListSettingsStore();
  const modalsStore = useModalsStore();
  const todosQuery = useTodos();

  const callbacks = {
    onShowArchivedChange: (showArchivedVal: boolean) => {
      listSettingsStore.setShowArchived(showArchivedVal);
    },
    onLanguageChange: (language: TLanguages) => {
      listSettingsStore.setLanguage(language);
      console.log({ language });

      i18n.changeLanguage(language);
    },
    openChartsModal: () => {
      modalsStore.add({ type: 'charts' });
    },
  };

  const options = {
    isChartsBtnDisabled: !todosQuery.data || Object.values(todosQuery.data.list).length <= 0,
  };

  const { t, i18n } = useTranslation();

  return (
    <Drawer.Root title={t('options.title')} onClose={onClose}>
      <Drawer.Field>
        <LabelRow
          title={`${t('options.archiveEnableLabel')}:`}
          input={
            <Toggler
              checked={listSettingsStore.showArchived}
              onChange={callbacks.onShowArchivedChange}
            />
          }
        />
      </Drawer.Field>

      <Drawer.Field>
        {options.isChartsBtnDisabled ? (
          <LabelRow
            title={`${t('options.showChartsLabel')}:`}
            input={
              <Tooltip title={t('options.showChartsBtnDisabledTooltip')}>
                <Button
                  onClick={callbacks.openChartsModal}
                  disabled={options.isChartsBtnDisabled}
                  status="active"
                >
                  {t('options.showChartsBtnText')}
                </Button>
              </Tooltip>
            }
          />
        ) : (
          <LabelRow
            title={`${t('options.showChartsLabel')}:`}
            input={
              <Button onClick={callbacks.openChartsModal} status="active">
                {t('options.showChartsBtnText')}
              </Button>
            }
          />
        )}
      </Drawer.Field>

      <Drawer.Field>
        <LabelRow
          title={`${t('options.languageLabel')}:`}
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
