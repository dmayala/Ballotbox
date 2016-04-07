import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';

import SignupModal from 'components/SignupModal';
import LoginModal from 'components/LoginModal';

if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
  };

  state = this._getState();

  _getState() {
    let store = this.context.flux.getStore('login');
    let loginState = store.getState();
    let modalState = {
      showLoginModal: false,
      showSignupModal: false
    };

    if (this.state) {
      let { showLoginModal, showSignupModal } = this.state;
      modalState = { showLoginModal, showSignupModal };
    }

    return Object.assign({
      user: loginState._user,
      jwt: loginState._jwt,
      name: loginState._name
    }, modalState);
  }

  _onChange = () => {
    this.setState(this._getState());
  };

  componentDidMount() {
    this.context.flux
              .getStore('login')
              .listen(this._onChange);
  }

  componentWillUnmount() {
    this.context.flux
              .getStore('login')
              .unlisten(this._onChange);
  }

  _onLogout = (e) => {
    e.preventDefault();
    this.context.flux.getActions('login').logoutUser();
  };

  toggleSignup = (e) => {
    this.setState(Object.assign(this.state, { showSignupModal: !this.state.showSignupModal }));
  };

  toggleLogin = (e) => {
    this.setState(Object.assign(this.state, { showLoginModal: !this.state.showLoginModal }));
  };

  _loggedInNav = () => {
      return [
        (<LinkContainer key={1} to="dashboard">
          <NavItem eventKey={1}>Dashboard</NavItem>
        </LinkContainer>),
        (<LinkContainer key={2} to="settings">
          <NavItem eventKey={2}>Settings</NavItem>
        </LinkContainer>),
        (<NavItem href="/" key={3} eventKey={3} onClick={this._onLogout}>Log Out</NavItem>),
      ];
  };

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ballotbox</Link> 
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse eventKey={0}>
          <Nav navbar>
          </Nav>
          <Nav navbar pullRight>
           { !this.state.user ? 
              [(<NavItem key={1} eventKey={1} href="#" onSelect={this.toggleSignup}>Sign up</NavItem>),
              (<NavItem key={2} eventKey={2} href="#" onSelect={this.toggleLogin}>Login</NavItem>)] :
              this._loggedInNav()
           }
          </Nav>
          <Nav navbar pullRight>
          </Nav>
        </Navbar.Collapse>
        <SignupModal {...props} show={this.state.showSignupModal} onHide={this.toggleSignup} />
        <LoginModal {...props} show={this.state.showLoginModal} onHide={this.toggleLogin} />
      </Navbar>
    );
  }
}

export default Header;
