import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ROOT_ROUTER_CONFIG, EPath, PRIVATE_ROUTER_CONFIG } from '../lookups/router';
import PrivateRoute from '../guards/PrivateRoute';

const AppRouter: React.FC<{}> = () => (
  <Switch>
    {ROOT_ROUTER_CONFIG.map(({ exact, pathKey, component }) => (
      <Route key={`root-router-${pathKey}`} exact={exact} path={EPath[pathKey]} component={component} />
    ))}
    <PrivateRoute path={EPath.Home}>
      {PRIVATE_ROUTER_CONFIG.map(({ exact, pathKey, component }) => (
        <Route key={`private-router-${pathKey}`} exact={exact} path={EPath[pathKey]} component={component} />
      ))}
    </PrivateRoute>
    <Redirect to={EPath.NotFound} />
  </Switch>
);
export default AppRouter;
