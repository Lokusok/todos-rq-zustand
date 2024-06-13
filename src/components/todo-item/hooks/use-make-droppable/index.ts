import React, { useEffect } from 'react';

type TOptions = {
  isDraggable: boolean;
  todo: TTodo;
  setIsDragEntered: React.Dispatch<React.SetStateAction<boolean>>;
  onDrop?: (firstId: TTodo['id'], secondId: TTodo['id']) => void;
};

function useMakeDroppable(
  rootRef: React.RefObject<HTMLDivElement>,
  { isDraggable, setIsDragEntered, onDrop, todo }: TOptions
) {
  useEffect(() => {
    const rootNode = rootRef.current;
    if (!rootNode) return;

    const handleDragStart = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.setData('drag_todo_id', todo.id);
    };

    const handleDragEnter = () => {
      if (isDraggable) return;
      setIsDragEntered(true);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      e.stopPropagation();
      e.stopImmediatePropagation(); // Чтобы drop может отработать несколько раз

      const droppedId = e.dataTransfer.getData('drag_todo_id');
      onDrop?.(droppedId, todo.id);
      setIsDragEntered(false);
    };

    const handleDragOverWindow = () => {
      setIsDragEntered(false);
    };

    rootNode.addEventListener('dragstart', handleDragStart);
    rootNode.addEventListener('dragenter', handleDragEnter);
    rootNode.addEventListener('dragover', handleDragOver);
    rootNode.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOverWindow);

    return () => {
      rootNode.removeEventListener('dragstart', handleDragStart);
      rootNode.removeEventListener('dragenter', handleDragEnter);
      rootNode.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragover', handleDragOverWindow);
    };
  }, [todo, onDrop, isDraggable, setIsDragEntered, rootRef]);
}

export default useMakeDroppable;
