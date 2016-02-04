import React from 'react';
import { Modal, Input, Button } from 'react-bootstrap';

if (process.env.BROWSER) {
  require('stylesheets/components/_SignupModal');
}

class SignupModal extends React.Component {

  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
  }

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
  }

  _onSave = (e) => {
    e.preventDefault();
    let { name, email, password } = this.state;
    let actions = this.context.flux.getActions('signupModal');
    
    if(!name.trim()) {
      actions.invalidName();
      this.refs.nameTextField.getInputDOMNode().focus();
    }

    if(!email.trim()) {
      //actions.invalidEmail();
      //this.refs.nameTextField.getInputDOMNode().focus();
    }

    // Remove temporarily
    // this.context.flux.getActions('home').signup(this.state);
  }

  render() {
    let actions = this.context.flux.getActions('signupModal');
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form ref="signupForm">
            <Input ref="nameTextField" bsStyle={this.state.nameValidationState}
            help={this.state.helpBlock} label="Name" name="name" type="text" value={this.state.name}
            onChange={actions.updateName} />
            <Input label="Email" name="email" type="text" value={this.state.email}
            onChange={actions.updateEmail} /> 
            <Input label="Password" name="password" type="password" value={this.state.password}
            onChange={actions.updatePassword} /> 
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
