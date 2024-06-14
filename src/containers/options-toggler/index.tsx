import { memo } from 'react';

import SettingsOpener from '@/components/settings-opener';

import { useDrawersStore } from '@/store';

function SettingsToggler() {
  const drawersStore = useDrawersStore();

  const callbacks = {
    openSettings: () => {
      drawersStore.add({ type: 'settings_right' });
    },
  };

  return (
    <>
      <SettingsOpener onClick={callbacks.openSettings} />
    </>
  );
}

export default memo(SettingsToggler);
