import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import {RouteHandler} from 'react-router';

if (process.env.BROWSER) {
  require('stylesheets/app');
}

class MainApp extends React.Component {
  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <div>
        <Header {...props}/>
        <RouteHandler {...props}/>
        <Footer />
      </div>
    );
  }
}

export default MainApp;
