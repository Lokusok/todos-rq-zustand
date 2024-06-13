import style from './style.module.scss';

import { memo, useRef, useState } from 'react';
import { BadgeCheck, Clock, Grip, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import clsx from 'clsx';

import TodoItemHeader from './todo-item-header';
import TodoItemsDescr from './todo-items-descr';

import Tooltip from '../tooltip';

import useMakeDroppable from './hooks/use-make-droppable';

import { TTodosTypes } from './types';
import TodoItemsActions from './todo-items-actions';

type TProps = {
  todo: TTodo;
  onDrop?: (firstId: TTodo['id'], secondId: TTodo['id']) => void;
  onComplete?: (id: TTodo['id']) => void;
  onToggle?: (id: TTodo['id']) => void;
  onArchive?: (id: TTodo['id']) => void;
  onDelete?: (id: TTodo['id']) => void;
  isInArchive?: boolean;
  isCompleteBtnDisabled?: boolean;
  completeBtnText?: string;
};

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
    maxDescrLength: 70,
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
      <div
        onPointerEnter={callbacks.makeDraggable}
        onPointerLeave={callbacks.makeUnDraggable}
        className={style.indicatorIconWrapper}
      >
        <Grip size={30} color={'#b1b1b1'} />
      </div>

      <TodoItemHeader status={options.status} todo={todo} />
      <TodoItemsDescr todo={todo} maxLength={options.maxDescrLength} />

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

        <TodoItemsActions
          mainButtonText={actionTextMap[options.status]}
          status={options.status}
          completeBtnText={completeBtnText}
          isCompleteBtnDisabled={isCompleteBtnDisabled}
          isDeleteBtnVisible={Boolean(onDelete)}
          isInArchive={isInArchive}
          onArchive={callbacks.archiveTodo}
          onDelete={callbacks.deleteTodo}
          onToggle={callbacks.toggleTodo}
        />
      </footer>
    </article>
  );
}

export default memo(TodoItem);
