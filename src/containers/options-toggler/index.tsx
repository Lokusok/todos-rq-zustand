import { memo } from 'react';

import SettingsOpener from '@/components/settings-opener';

function SettingsToggler() {
  const callbacks = {
    openSettings: () => {
      console.log('open settings');
    },
  };

  return <SettingsOpener onClick={callbacks.openSettings} />;
}

export default memo(SettingsToggler);
