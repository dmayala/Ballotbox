import React from 'react';
import { Modal, Input, Button } from 'react-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_SignupModal');
}

class SignupModal extends React.Component {

  state = {
    name: null,
    password: null,
    email: null
  }
  
  _onSave = (e) => {
    e.preventDefault();
    this.props.flux.actions.HomeActions.signup(this.state);
    this.props.onHide();
    //this.context.router.transitionTo('dashboard');
  }

  _onChange = (e) => {
    let state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value; 
    this.setState(state);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form ref="signupForm">
            <Input label="Name" name="name" type="text" value={this.state.name}
            onChange={this._onChange} /> 
            <Input label="Email" name="email" type="text" value={this.state.email}
            onChange={this._onChange} /> 
            <Input label="Password" name="password" type="password" value={this.state.password}
            onChange={this._onChange} /> 
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this._onSave} bsStyle="primary">Sign up</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SignupModal;
