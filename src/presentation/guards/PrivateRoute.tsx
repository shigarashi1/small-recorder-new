import React from 'react';
import { Route, Redirect } from 'react-router';
import { EPath, TPath } from '../lookups/router';
import { useSelector } from 'react-redux';
import { authSelector } from '@Selector/entity/auth';

type TProps = {
  path: TPath;
};

const PrivateRoute: React.FC<TProps> = ({ path, children = null }) => {
  const isLoggedIn = useSelector(authSelector.isLoggedIn);
  return (
    <Route
      path={path}
      render={({ location }) =>
        isLoggedIn ? (
          <React.Fragment>
            {children}
            <Redirect to={path} />
          </React.Fragment>
        ) : (
          <Redirect to={{ pathname: EPath.Forbidden, state: { from: location } }} />
        )
      }
    />
  );
};
export default PrivateRoute;
