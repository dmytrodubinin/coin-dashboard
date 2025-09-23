import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('/coin/:id', './routes/coin-details.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig;
