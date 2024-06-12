import { memo } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';

import AllToasts from '@/containers/all-toasts';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AllToasts />
    </>
  );
}

export default memo(App);
