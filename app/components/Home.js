import React from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

import SignupModal from 'components/SignupModal';

if (process.env.BROWSER) {
  require('stylesheets/components/_Home');
}

class Home extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
  };

  state = this.getState();

  getState() {
    return this.context.flux.getStore('home')
                            .getState();
  }

  componentDidMount() {
    this.context.flux.getStore('home')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    var store = this.context.flux.getStore('home');
    store.unlisten(this._onChange);
    this.context.flux.recycle(store);
  }

  _onChange = () => {
    this.setState(this.getState());
  };

  toggleSignup = () => {
    this.context.flux.getActions('home').toggleSignup();
  };

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <div className="container" id="content">
        <SignupModal {...props} show={this.state.showModal} onHide={this.toggleSignup} />
        <header id="banner" className="hero-unit">
          <div className="container">
            <div><h1>Ballotbox</h1>
              <p className="lead">Create custom polls with live results.</p>
              <Button bsStyle="success" bsSize="large" onClick={this.toggleSignup}>Sign up</Button>
            </div>
            <div style={{ display: 'none' }}>
              <h1>Dashboard</h1>
              <p className="lead">What would you like to do today?</p>
              <button className="btn btn-lg btn-success">New Poll</button>
              <button className="btn btn-lg btn-primary">My Polls</button>
            </div>
          </div>
        </header>
        <div className="col-lg-12 home">
          <div className="col-lg-4">
            <i className="fa fa-bolt"></i>
            <h2>Live Results</h2>
            <p>Live graphs show your poll results immediately in an easy to understand format. One graph will not provide the whole picture, that's why we provide multiple graph types to better describe your results.</p>
          </div>
          <div className="col-lg-4">
            <i className="fa fa-globe"></i>
            <h2>Works Everywhere</h2>
            <p>Traditional desktop computers now represent only 30% of Internet traffic. Your poll must work on the tablets, smart phones, netbooks and notebooks that your visitors are using. Our responsive designs do just that.</p>
          </div>
          <div className="col-lg-4">
            <i className="fa fa-facebook"></i>
            <h2>Social Integration</h2>
            <p>Free integrated facebook or traditional comments allow your poll voters to provide immediate feedback and discuss results. Social share buttons encourage your poll voters to help spread the word.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
