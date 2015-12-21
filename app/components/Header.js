import React from 'react';
import {Link} from 'react-router';
import {Navbar, CollapsibleNav, Nav, DropdownButton, MenuItem, NavItem} from 'react-bootstrap';

import SignupModal from 'components/SignupModal';

if (process.env.BROWSER) {
  require('stylesheets/components/_Header');
}

class Header extends React.Component {

  state = {
    showModal: false  
  }

  toggleSignup = (e) => {
    this.setState({ showModal: !this.state.showModal });
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
            <NavItem eventKey={2} href="#">Login</NavItem>
          </Nav>
        </CollapsibleNav>
        <SignupModal {...props} show={this.state.showModal} onHide={this.toggleSignup} />
      </Navbar>
    );
  }
}

export default Header;
