import { createBrowserRouter } from 'react-router-dom';

import AllList from './main/all-list';
import CreateTodo from './main/create-todo';
import Main from './main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <AllList />,
      },
      {
        path: 'create_todo',
        element: <CreateTodo />,
      },
    ],
  },
]);

export default router;
