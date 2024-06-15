import style from './style.module.scss';
import React, { memo } from 'react';

import { X } from 'lucide-react';

import Button from '../button';

type TProps = {
  children: React.ReactNode;
  title: string;
  rejectBtnText?: string;
  onReject?: () => void;
  okButtonText?: string;
  onSuccess?: () => void;
  onClose?: () => void;
};

function Modal({
  children,
  title,
  rejectBtnText,
  onReject,
  okButtonText,
  onSuccess,
  onClose,
}: TProps) {
  const options = {
    isFooterShow:
      (Boolean(onReject) && Boolean(rejectBtnText)) ||
      (Boolean(onSuccess) && Boolean(rejectBtnText)),
  };

  return (
    <div className={style.modalWrapper}>
      <div className={style.modalContent}>
        {Boolean(onClose) && (
          <div className={style.modalCloseBtnWrapper}>
            <button onClick={onClose} className={style.modalCloseBtn}>
              <X size={28} className={style.modalCloseBtnIcon} />
            </button>
          </div>
        )}

        <div className={style.modalInner}>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>{title}</h3>
          </div>

          <div className={style.modalInfo}>{children}</div>

          {options.isFooterShow && (
            <div className={style.modalFooter}>
              <div className={style.modalFooterActions}>
                {Boolean(onReject) && Boolean(rejectBtnText) && (
                  <Button onClick={onReject} status="success">
                    {rejectBtnText}
                  </Button>
                )}

                {Boolean(onSuccess) && Boolean(rejectBtnText) && (
                  <Button onClick={onSuccess}>{okButtonText}</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Modal);
