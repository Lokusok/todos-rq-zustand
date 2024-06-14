import { memo } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';

import AllToasts from '@/containers/all-toasts';
import AllDrawers from '@/containers/all-drawers';

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <AllToasts />
      <AllDrawers />
    </>
  );
}

export default memo(App);
