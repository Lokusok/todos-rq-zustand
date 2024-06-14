import { memo } from 'react';

import Drawer from '@/components/drawer';
import Toggler from '@/components/toggler';

type TProps = {
  onClose?: () => void;
};

function SettingsDrawer({ onClose }: TProps) {
  return (
    <Drawer title="Настройки" onClose={onClose}>
      <div>
        <span>Показывать архивированные:</span>
        <br />
        <Toggler />
      </div>

      <hr />

      <div>
        Показать графики:
        <br />
        <button>Открыть</button>
      </div>
    </Drawer>
  );
}

export default memo(SettingsDrawer);
