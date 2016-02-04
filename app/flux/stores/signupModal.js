class SignupModalStore {
  constructor() {
    this.bindActions(this.alt.getActions('signupModal'));
    this.name = '';
    this.password = '';
    this.email = '';
    this.helpBlock = '';
    this.nameValidationState = null;
  }

  onUpdateName(e) {
    this.nameValidationState = null;
    this.helpBlock = '';
    this.name = e.target.value; 
  }

  onUpdatePassword(e) {
    this.password = e.target.value;
  }

  onUpdateEmail(e) {
    this.email = e.target.value;
  }

  onInvalidName() {
    this.nameValidationState = 'error';
    this.helpBlock = 'Please enter a name.';
  }
}

export default SignupModalStore;
