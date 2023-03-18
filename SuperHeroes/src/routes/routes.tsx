import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/index';
import ListCategory from '../pages/ListCategory';
import DetailsCategory from '../pages/ListCategory/DetailsCategory';
import ListHero from '../pages/ListHero';
import DetailsHero from '../pages/ListHero/DetailsHero';
import RegisterCategory from '../pages/RegisterCategory/indesx';
import RegisterHero from '../pages/RegisterHero';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/heroes',
    element: <ListHero />,
  },
  {
    path: '/heroes/:id',
    element: <DetailsHero />,
  },
  {
    path: '/category',
    element: <ListCategory />,
  },
  {
    path: '/category/:id',
    element: <DetailsCategory />,
  },
  {
    path: '/registerHero',
    element: <RegisterHero />,
  },
  {
    path: '/registerCategory',
    element: <RegisterCategory />,
  },
]);
