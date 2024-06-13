import style from './style.module.scss';
import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/button';
import Tooltip from '@/components/tooltip';

import { TTodosTypes } from '../types';
import { PackageOpen, Trash2, Archive } from 'lucide-react';

type TProps = {
  onArchive?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  status: TTodosTypes;
  isDeleteBtnVisible?: boolean;
  isInArchive?: boolean;
  completeBtnText?: string;
  isCompleteBtnDisabled?: boolean;
  mainButtonText: string;
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
  mainButtonText,
}: TProps) {
  return (
    <div className={style.actions}>
      {Boolean(onArchive) && (
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
                    <Tooltip title="Из архива">
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
                  <motion.div
                    key="inArchiveButton"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 3, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <Tooltip title="В архив">
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
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {isCompleteBtnDisabled ? (
        <>
          {isDeleteBtnVisible && (
            <Tooltip title="Удалить">
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
            {completeBtnText || 'Заблокировано'}
          </Button>
        </>
      ) : isInArchive ? (
        <Button style={{ width: 150 }} disabled={true} status="expired">
          В архиве
        </Button>
      ) : (
        <Button
          style={{ width: 150 }}
          onClick={onToggle}
          status={status === 'completed' ? 'success' : status === 'expired' ? 'expired' : 'active'}
        >
          {mainButtonText}
        </Button>
      )}
    </div>
  );
}

export default memo(TodoItemActions);
