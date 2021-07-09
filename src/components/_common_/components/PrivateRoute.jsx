import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";

const PrivateRoute = ({ component, path, exact }) => {
  const dispatch = useDispatch();

  // if (isAuthenticated()) {
    return (
        <ErrorBoundary dispatch={dispatch}>
            <Route path={path} exact={exact} component={component} />
        </ErrorBoundary>
    );
  // }

  // todo: check if the user was logged out automatically, if yes dispatch auto logout
  // dispatch({ type: AUTO_LOGOUT });
  // return <Redirect to={LOGIN} />;
};
export default PrivateRoute;
