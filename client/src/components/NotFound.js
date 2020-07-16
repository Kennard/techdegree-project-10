import React from 'react';

// Not found component will render if none of the existing routes are found
export default () => (
  <div className="bounds">
    <h1>Not Found</h1>
    <p>Sorry! We couldn't find the page you're looking for.</p>
  </div>
);
