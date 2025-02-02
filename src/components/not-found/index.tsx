import style from './style.module.scss';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import Lottie from 'lottie-react';

import notFoundAnimation from '@/assets/lottie/not-found.json';
import { TFunction } from 'i18next';
import Button from '../button';

type TProps = {
  t?: TFunction<'ns1', undefined>;
  buttonText?: string;
  goToHref?: string;
};

function NotFound({ t, goToHref, buttonText }: TProps) {
  return (
    <div className={style.notFoundWrapper}>
      <div>
        <Lottie style={{ width: 450, height: 450 }} animationData={notFoundAnimation} />
      </div>

      {Boolean(goToHref) && (
        <Link to="/">
          <Button>{t ? t('notFound.linkBtnText') : buttonText}</Button>
        </Link>
      )}
    </div>
  );
}

export default memo(NotFound);
