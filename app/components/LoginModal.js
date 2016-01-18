import React from 'react';
import { Modal, Input, Button } from 'react-bootstrap';

class LoginModal extends React.Component {

  state = {
    email: null,
    password: null
  }
  
  _onSave = (e) => {
    e.preventDefault();
    this.props.flux.actions.HomeActions.login(this.state);
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
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form ref="loginForm">
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

export default LoginModal;
