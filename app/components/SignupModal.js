import React from 'react';
import {isEmail} from 'validator';
import { Modal, Input, Button } from 'react-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_SignupModal');
}

class SignupModal extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
  };

  state = this.getState();

  getState() {
    return this.context.flux.getStore('signupModal')
                            .getState();
  }

  componentDidMount() {
    this.context.flux.getStore('signupModal')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    var store = this.context.flux.getStore('signupModal');
    store.unlisten(this._onChange);
    this.context.flux.recycle(store);
  }

  _onChange = () => {
    this.setState(this.getState());
  };

  _onSave = (e) => {
    e.preventDefault();
    let { name, email, password } = this.state;
    let actions = this.context.flux.getActions('signupModal');
    let isValid = true;
    
    if(!name.trim()) {
      isValid = false;
      actions.invalidName();
    }

    if(!isEmail(email)) {
      isValid = false;
      actions.invalidEmail();
    }

    let r = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if(!r.test(password.trim())) {
      isValid = false;
      actions.invalidPassword();
    }

    if (isValid) {
      this.context.flux.getActions('home').signup(this.state);
    }
  };

  render() {
    let actions = this.context.flux.getActions('signupModal');
    let { nameValidation, emailValidation, passwordValidation } = this.state;

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form ref="signupForm">
            <Input ref="nameInput" bsStyle={nameValidation.state}
            help={nameValidation.helpBlock} label="Name" name="name" type="text" value={this.state.name}
            onChange={actions.updateName} />
            <Input ref="emailInput" bsStyle={emailValidation.state} label="Email" name="email" type="text" value={this.state.email}
            help={emailValidation.helpBlock} onChange={actions.updateEmail} /> 
            <Input ref="passwordInput" bsStyle={passwordValidation.state} label="Password" name="password" type="password" value={this.state.password}
            help={passwordValidation.helpBlock} onChange={actions.updatePassword} /> 
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
