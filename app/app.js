import React from 'react';
import 'whatwg-fetch';
import history from 'utils/routerHistory';
import createFlux from 'flux/createFlux';
import universalRender from '../shared/universalRender';

const flux = createFlux();


universalRender({ flux, history, container: document.getElementById('ballotbox') })
  .catch(err => console.log(err));
