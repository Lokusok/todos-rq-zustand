import style from './style.module.scss';
import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PackageOpen, Trash2, Archive } from 'lucide-react';

import Button from '@/components/button';
import Tooltip from '@/components/tooltip';

import { TTodosTypes } from '../types';

import { TFunction } from 'i18next';

type TProps = {
  onArchive?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  status: TTodosTypes;
  isDeleteBtnVisible?: boolean;
  isInArchive?: boolean;
  isArchiveBtnVisible?: boolean;
  completeBtnText?: string;
  isCompleteBtnDisabled?: boolean;
  mainButtonText: string;
  t: TFunction<'ns1', undefined>;
};

function TodoItemActions({
  onArchive,
  onDelete,
  onToggle,
  status,
  isInArchive,
  completeBtnText,
  isCompleteBtnDisabled = false,
  isDeleteBtnVisible = false,
  isArchiveBtnVisible = false,
  mainButtonText,
  t,
}: TProps) {
  return (
    <div className={style.actions}>
      {isArchiveBtnVisible && (
        <AnimatePresence initial={false} mode={'wait'}>
          {status === 'completed' && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              key={Number(status === 'completed')}
            >
              <AnimatePresence initial={false} mode={'wait'}>
                {isInArchive ? (
                  <motion.div
                    key="outOfArchiveButton"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 3, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Tooltip title={t('taskItemHelpers.removeFromArchive')}>
                      <Button
                        onClick={onArchive}
                        status="active"
                        style={{
                          width: 40,
                          height: 40,
                          padding: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <PackageOpen />
                      </Button>
                    </Tooltip>
                  </motion.div>
                ) : (
                  <>
                    {Boolean(onArchive) && (
                      <motion.div
                        key="inArchiveButton"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 3, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        <Tooltip title={t('taskItemHelpers.inArchive')}>
                          <Button
                            onClick={onArchive}
                            status="success"
                            style={{
                              width: 40,
                              height: 40,
                              padding: 0,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Archive />
                          </Button>
                        </Tooltip>
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {isCompleteBtnDisabled ? (
        <>
          {isDeleteBtnVisible && (
            <Tooltip title={t('taskItemHelpers.delete')}>
              <Button
                onClick={onDelete}
                status="danger"
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Trash2 />
              </Button>
            </Tooltip>
          )}
          <Button disabled={true} status={'expired'}>
            {completeBtnText || t('taskItemHelpers.blocked')}
          </Button>
        </>
      ) : isInArchive ? (
        <Button style={{ width: 165, whiteSpace: 'nowrap' }} disabled={true} status="expired">
          {t('taskItemHelpers.inArchive')}
        </Button>
      ) : (
        <>
          {status === 'expired' && (
            <Tooltip title={t('taskItemHelpers.inArchive')}>
              <Button
                onClick={onDelete}
                status="danger"
                style={{
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Trash2 />
              </Button>
            </Tooltip>
          )}

          <Button
            style={{ width: 165, whiteSpace: 'nowrap' }}
            onClick={onToggle}
            status={
              status === 'completed' ? 'success' : status === 'expired' ? 'expired' : 'active'
            }
          >
            {mainButtonText}
          </Button>
        </>
      )}
    </div>
  );
}

export default memo(TodoItemActions);
