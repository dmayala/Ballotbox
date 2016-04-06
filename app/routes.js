import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { isConnected } from 'utils/routesHooks';

import MainApp from 'components/MainApp';
import Home from 'components/Home';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import AddPoll from 'components/AddPoll';
import MyPolls from 'components/MyPolls';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <Route path="/" component={Home} />
      <Route path="dashboard" onEnter={isConnected(flux)} component={Dashboard}>
        <IndexRoute component={AddPoll} />
        <Route path="new" component={AddPoll} />
        <Route path="polls" component={MyPolls} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  );
}
