import style from './style.module.scss';

import { memo, useEffect, useRef, useState } from 'react';
import { BadgeCheck, Clock, Grip, X } from 'lucide-react';

import clsx from 'clsx';
import { format } from 'date-fns';

import Button from '../button';
import Tooltip from '../tooltip';

type TProps = {
  todo: TTodo;
  onDrop?: (firstId: TTodo['id'], secondId: TTodo['id']) => void;
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

function TodoItem({ todo, onDrop }: TProps) {
  const [isDraggable, setIsDraggable] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const helpers = {
    formatDate: (date: string) => format(date, 'dd.MM.yyyy'),
  };

  const options: { status: TTodosTypes } = {
    status: (() => {
      if (todo.completed) return 'completed';

      const dateNow = new Date();
      const dateEnd = new Date(todo.endTime);

      if (dateNow > dateEnd) {
        return 'expired';
      }

      return 'in_process';
    })(),
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
  };

  useEffect(() => {
    const rootNode = rootRef.current;
    if (!rootNode) return;

    const handleDragStart = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      console.log('dragStart');
      e.dataTransfer.setData('drag_todo_id', todo.id);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      console.log('dragOver');
    };

    const handleDrop = (e: DragEvent) => {
      if (!e.dataTransfer) return;

      const droppedId = e.dataTransfer.getData('drag_todo_id');
      console.log(`Dropped to ${todo.id} this element: ${droppedId}`);
      onDrop?.(droppedId, todo.id);
    };

    rootNode.addEventListener('dragstart', handleDragStart);
    rootNode.addEventListener('dragover', handleDragOver);
    rootNode.addEventListener('drop', handleDrop);

    return () => {
      rootNode.removeEventListener('dragstart', handleDragStart);
      rootNode.removeEventListener('dragover', handleDragOver);
      rootNode.removeEventListener('drop', handleDrop);
    };
  }, [todo, onDrop]);

  return (
    <article ref={rootRef} draggable={isDraggable} className={style.root}>
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

      <p className={style.descr}>{todo.descr}</p>

      <footer className={style.footer}>
        <div className={style.statusIconWrapper}>
          <Tooltip title={titleTextMap[options.status]}>
            {renders.renderIcon(options.status)}
          </Tooltip>
        </div>
        <Button
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
      </footer>
    </article>
  );
}

export default memo(TodoItem);
