import style from './style.module.scss';
import { memo } from 'react';

import Lottie from 'lottie-react';

import polygonsAnimation from '@/assets/lottie/polygons.json';

import Button from '../button';
import { TFunction } from 'i18next';

type TProps = {
  onErrorReset?: () => void;
  t: TFunction<'ns1', undefined>;
};

function ErrorAnimReset({ onErrorReset, t }: TProps) {
  return (
    <div className={style.errorAnimResetWrapper}>
      <div>
        <Lottie style={{ width: 400, height: 400 }} animationData={polygonsAnimation} />
      </div>

      {Boolean(onErrorReset) && (
        <Button onClick={onErrorReset}>{t('errorPage.resetBtnText')}</Button>
      )}
    </div>
  );
}

export default memo(ErrorAnimReset);
