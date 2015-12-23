import React from 'react';
import {Link} from 'react-router';
import {Navbar, CollapsibleNav, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';

import SignupModal from 'components/SignupModal';
import LoginModal from 'components/LoginModal';

if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  state = {
    showLoginModal: false,
    showSignupModal: false
  }

  toggleSignup = (e) => {
    this.setState({ showSignupModal: !this.state.showSignupModal });
  }

  toggleLogin = (e) => {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  render() {
    const props = Object.assign({}, this.state, this.props);
    return (
      <Navbar brand={<Link to="/">Ballotbox</Link>} toggleNavKey={0}>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
          </Nav>
          <Nav navbar right>
            <NavItem eventKey={1} href="#" onSelect={this.toggleSignup}>Sign up</NavItem>
            <NavItem eventKey={2} href="#" onSelect={this.toggleLogin}>Login</NavItem>
          </Nav>
        </CollapsibleNav>
        <SignupModal {...props} show={this.state.showSignupModal} onHide={this.toggleSignup} />
        <LoginModal {...props} show={this.state.showLoginModal} onHide={this.toggleLogin} />
      </Navbar>
    );
  }
}

export default Header;
