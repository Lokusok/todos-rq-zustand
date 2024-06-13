import style from './style.module.scss';

import { memo } from 'react';
import { Settings } from 'lucide-react';

type TProps = {
  onClick: () => void;
};

function SettingsOpener({ onClick }: TProps) {
  return (
    <button className={style.button} onClick={onClick}>
      <div className={style.inner}>
        <Settings size={30} />
      </div>
    </button>
  );
}

export default memo(SettingsOpener);
