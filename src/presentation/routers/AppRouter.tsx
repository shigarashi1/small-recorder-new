import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ROOT_ROUTER_CONFIG, EPath, PRIVATE_ROUTER_CONFIG } from '../lookups/router';
import PrivateRoute from '../guards/PrivateRoute';

const AppRouter: React.FC<{}> = () => (
  <Switch>
    {ROOT_ROUTER_CONFIG.map(({ exact, pathProps, component }) => (
      <Route exact={exact} path={EPath[pathProps]} component={component} />
    ))}
    <PrivateRoute path={EPath.Home}>
      {PRIVATE_ROUTER_CONFIG.map(({ exact, pathProps, component }) => (
        <Route exact={exact} path={EPath[pathProps]} component={component} />
      ))}
    </PrivateRoute>
    <Redirect to={EPath.NotFound} />
  </Switch>
);
export default AppRouter;
