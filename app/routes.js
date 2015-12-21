import React from 'react';
import Router from 'react-router';
import MainApp from 'components/MainApp';
import Home from 'components/Home';
import Dashboard from 'components/Dashboard';
import AddPoll from 'components/AddPoll';
import PollList from 'components/PollList';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

let routes = (
  <Route handler={MainApp} path="/">
    <DefaultRoute handler={Home} />
    <Route name="dashboard" handler={Dashboard} path="dashboard">
      <DefaultRoute handler={AddPoll} />
      <Route name="dashboardAdd" path="add" handler={AddPoll} />
      <Route name="dashboardList" path="list" handler={PollList} />
    </Route>
  </Route>
);

export default routes; 

