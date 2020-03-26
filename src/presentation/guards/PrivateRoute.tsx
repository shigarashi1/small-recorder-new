import React from 'react';
import { Route, Redirect } from 'react-router';
import { EPath, TPath } from '../lookups/router';

type TProps = {
  path: TPath;
};

const PrivateRoute: React.FC<TProps> = ({ path, children = null }) => {
  // FIXME: useSelector？
  const isLoggedIn = true;
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
