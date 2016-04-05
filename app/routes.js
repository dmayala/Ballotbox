import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { isConnected } from 'utils/routesHooks';

import MainApp from 'components/MainApp';
import Home from 'components/Home';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <Route path="/" component={Home} />
      <Route path="dashboard" onEnter={isConnected(flux)}>
        <IndexRoute component={Dashboard} />
        <Route path="new" component={Login} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  );
}
