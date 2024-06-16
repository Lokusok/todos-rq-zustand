import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LazyAllList = lazy(() => import('./main/all-list'));
const LazyCreateTodo = lazy(() => import('./main/create-todo'));
const LazyMain = lazy(() => import('./main'));
const LazyArchive = lazy(() => import('./main/archive'));
const LazyNotFound = lazy(() => import('./main/not-found'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyMain />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <LazyAllList />
          </Suspense>
        ),
      },
      {
        path: 'create_todo',
        element: (
          <Suspense fallback={null}>
            <LazyCreateTodo />
          </Suspense>
        ),
      },
      {
        path: 'archive',
        element: (
          <Suspense fallback={null}>
            <LazyArchive />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={null}>
            <LazyNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
