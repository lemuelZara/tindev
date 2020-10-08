import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/devs/:id" component={Main} />
    </BrowserRouter>
  );
};

export default Routes;
