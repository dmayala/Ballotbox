import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { isConnected } from 'utils/routesHooks';

import MainApp from 'components/MainApp';
import Home from 'components/Home';
import Dashboard from 'components/Dashboard';
import AddPoll from 'components/AddPoll';
import PollList from 'components/PollList';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <IndexRoute component={Home} />
      <Route path="dashboard">
        <IndexRoute component={AddPoll} />
        <Route path="add" component={AddPoll} />
        <Route path="list" component={PollList} />
      </Route>
    </Route>
  );
}
