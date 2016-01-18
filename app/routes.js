import React from 'react';
import { IndexRoute, Route } from 'react-router';

import MainApp from 'components/MainApp';
import Home from 'components/Home';

export default function (flux) {
  return (
    <Route component={MainApp}>
      <Route path="/" component={Home} />
    </Route>
  );
}
