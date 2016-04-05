import React from 'react';
import {Button} from 'react-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_Dashboard');
}

class Dashboard extends React.Component {

  render() {
    return (
      <div className="container" id="content">
        <header id="banner" className="hero-unit">
          <div className="container">
            <h1>Dashboard</h1>
            <p className="lead">What would you like to do today?</p>
            <Button bsStyle="success" bsSize="large">New Poll</Button>
            { ' ' }
            <Button bsStyle="primary" bsSize="large">My Polls</Button>
          </div>
        </header>
        <div className="col-lg-12">
        </div>
      </div>
    );
  }
}

export default Dashboard;
