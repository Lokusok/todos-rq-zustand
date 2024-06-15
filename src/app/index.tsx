import { memo, useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';

import { useShallow } from 'zustand/react/shallow';

import AllToasts from '@/containers/all-toasts';
import AllDrawers from '@/containers/all-drawers';
import AllModals from '@/containers/all-modals';
import { useModalsStore } from '@/store/modals';

function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  const modalsStore = useModalsStore(
    useShallow((state) => ({
      list: state.list,
    }))
  );

  // https://github.com/facebook/react/issues/17157
  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.inert = modalsStore.list.length > 0;
  }, [modalsStore.list]);

  return (
    <>
      <div ref={rootRef}>
        <RouterProvider router={router} />
      </div>

      <AllToasts />
      <AllDrawers />
      <AllModals />
    </>
  );
}

export default memo(App);
