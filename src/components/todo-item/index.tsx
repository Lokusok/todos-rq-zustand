import style from './style.module.scss';

import { memo, useRef, useState } from 'react';
import { Archive, BadgeCheck, Clock, Grip, PackageOpen, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import clsx from 'clsx';
import { format } from 'date-fns';

import Button from '../button';
import Tooltip from '../tooltip';

import useMakeDroppable from './hooks/use-make-droppable';

type TProps = {
  todo: TTodo;
  onDrop?: (firstId: TTodo['id'], secondId: TTodo['id']) => void;
  onComplete?: (id: TTodo['id']) => void;
  onToggle?: (id: TTodo['id']) => void;
  onArchive?: (id: TTodo['id']) => void;
  isInArchive?: boolean;
  isCompleteBtnDisabled?: boolean;
  completeBtnText?: string;
  onDelete?: (id: TTodo['id']) => void;
};

type TTodosTypes = 'completed' | 'in_process' | 'expired';

const actionTextMap: Record<TTodosTypes, string> = {
  completed: 'Выполнено',
  in_process: 'Выполнить',
  expired: 'Время вышло',
};

const titleTextMap: Record<TTodosTypes, string> = {
  completed: 'Выполнено',
  in_process: 'В процессе',
  expired: 'Время вышло',
};

function TodoItem({
  todo,
  onDrop,
  onComplete,
  onToggle,
  onArchive,
  isInArchive = false,
  isCompleteBtnDisabled = false,
  completeBtnText,
  onDelete,
}: TProps) {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDragEntered, setIsDragEntered] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const helpers = {
    formatDate: (date: string) => format(date, 'dd.MM.yyyy'),
  };

  const options: { status: TTodosTypes; maxDescrLength: number } = {
    status: (() => {
      if (todo.completed) return 'completed';

      const dateNow = new Date();
      const dateEnd = new Date(todo.endTime);

      if (dateNow > dateEnd) {
        return 'expired';
      }

      return 'in_process';
    })(),
    maxDescrLength: 150,
  };

  const renders = {
    renderIcon: (todoStatus: TTodosTypes) => {
      switch (todoStatus) {
        case 'completed':
          return <BadgeCheck size={40} />;
        case 'expired':
          return <X size={40} />;
        case 'in_process':
          return <Clock size={40} />;
      }
    },
  };

  const callbacks = {
    makeDraggable: () => setIsDraggable(true),
    makeUnDraggable: () => setIsDraggable(false),
    completeTodo: () => onComplete?.(todo.id),
    toggleTodo: () => onToggle?.(todo.id),
    archiveTodo: () => onArchive?.(todo.id),
    deleteTodo: () => onDelete?.(todo.id),
  };

  useMakeDroppable(rootRef, {
    isDraggable,
    setIsDragEntered,
    todo,
    onDrop,
  });

  return (
    <article
      ref={rootRef}
      draggable={isDraggable}
      className={clsx(style.root, { [style.blindRoot]: isDragEntered })}
    >
      {options.status}
      <div
        onPointerEnter={callbacks.makeDraggable}
        onPointerLeave={callbacks.makeUnDraggable}
        className={style.indicatorIconWrapper}
      >
        <Grip size={30} color={'#b1b1b1'} />
      </div>

      <header
        className={clsx(style.header, {
          [style.crossChildren]: ['completed', 'expired'].includes(options.status),
        })}
      >
        <h3 className={style.title}>{todo.title}</h3>
        <span className={style.date}>
          {helpers.formatDate(todo.startTime)} - {helpers.formatDate(todo.endTime)}
        </span>
      </header>

      <p className={style.descr}>
        {todo.descr.length > options.maxDescrLength ? (
          <span>
            {todo.descr.slice(0, options.maxDescrLength)}{' '}
            <span className={style.additionalDots}>...</span>
          </span>
        ) : (
          <span>{todo.descr}</span>
        )}
      </p>

      <footer className={style.footer}>
        <div className={style.statusIconWrapper}>
          <Tooltip title={titleTextMap[options.status]}>
            {
              <AnimatePresence initial={false} mode={'popLayout'}>
                <motion.div
                  key={options.status}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                >
                  {renders.renderIcon(options.status)}
                </motion.div>
              </AnimatePresence>
            }
          </Tooltip>
        </div>

        <div className={style.actions}>
          {Boolean(onArchive) && (
            <AnimatePresence initial={false} mode={'wait'}>
              {options.status === 'completed' && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  key={Number(options.status === 'completed')}
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
                            onClick={callbacks.archiveTodo}
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
                            onClick={callbacks.archiveTodo}
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
              {Boolean(onDelete) && (
                <Tooltip title="Удалить">
                  <Button
                    onClick={callbacks.deleteTodo}
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
          ) : (
            <Button
              onClick={
                options.status === 'in_process' ? callbacks.completeTodo : callbacks.toggleTodo
              }
              status={
                options.status === 'completed'
                  ? 'success'
                  : options.status === 'expired'
                  ? 'expired'
                  : 'active'
              }
            >
              {actionTextMap[options.status]}
            </Button>
          )}
        </div>
      </footer>
    </article>
  );
}

export default memo(TodoItem);
