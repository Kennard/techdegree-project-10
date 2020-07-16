import React from 'react';

// The Forbidden component will render for a user who are not athenticated to update data
export default () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Oh oh! You can't access this page.</p>
  </div>
);