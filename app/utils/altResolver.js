import React from 'react';
import Iso from 'iso';

export default class AltResolver {
  constructor() {
    this._toResolve = [];
  }

  resolve(promise, later = false) {
    this._toResolve.push(promise);
  }
  
  async render(Handler, flux, force = false) {
    if (process.env.BROWSER && !force) {
      console.log('`altResolver.render` should not be used in browser, something went wrong');
      return null;
    }

    let content = {};
    // Fire first render to collect XHR promises
    try {
      React.renderToString(React.createElement(Handler, {flux}));
    } catch (err) {
      console.log(err);
    }

    // Resolve all promises collected
    await Promise.all(this._toResolve);

    // Get the new content with promises resolved
    const app = React.renderToString(React.createElement(Handler, {flux}));
 
    // Render the html with state in it
    try {
      content = { body: Iso.render(app, flux.flush()) };
    } catch (err) {
      console.log(err);
    }

    // return the content
    return content;
  }

}
