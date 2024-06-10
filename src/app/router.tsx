import { createBrowserRouter } from 'react-router-dom';
import AllList from './all-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AllList />,
  },
]);

export default router;
