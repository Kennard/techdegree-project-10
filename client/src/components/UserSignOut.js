import React from 'react';
import { Redirect } from 'react-router-dom';

/** Stateless Components to Sign out user using the signout method in Context.
 */
export default ({ context }) => {
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
}
