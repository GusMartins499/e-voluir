import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth';;

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user, ngo } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if(isPrivate === (!!user || !!ngo)){
            return <Component />
        } else {
          return <Redirect to={{
            pathname: isPrivate ? '/login' : '/',
            state: { from: location },
          }}
        />
        }
      }}
    />
  );
};

export default Route;