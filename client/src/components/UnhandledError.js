import React from 'react';

/** Error component will render any page that generates a 500 server error.
 */
export default () => (
  <div className="bounds">
    <h1>Error</h1>
    <p>Sorry! We just encountered an unexpected error.</p>
  </div>
);