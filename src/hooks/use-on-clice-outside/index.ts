import React, { useEffect } from 'react';

function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    if (!ref.current) return;

    const pointerDownHandler = (e: PointerEvent) => {
      const eventTarget = e.target as Node;

      if (ref.current?.contains(eventTarget)) return;
      handler();
    };

    window.addEventListener('pointerdown', pointerDownHandler);

    return () => {
      window.removeEventListener('pointerdown', pointerDownHandler);
    };
  }, [handler, ref]);
}

export default useOnClickOutside;
