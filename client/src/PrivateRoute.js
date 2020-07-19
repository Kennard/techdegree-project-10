import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/** The Private route redirects a user to the sign in page if they are not authenticated
  * The redirect also provides a state property to return a user to the page they were on 
  * after they authenticated.
  */ 
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin', 
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};

