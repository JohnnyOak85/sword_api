import { LoginRoutes } from './login.routes';
import { TaskRoutes } from './tasks.routes';

export const Routes = [...LoginRoutes, ...TaskRoutes];
