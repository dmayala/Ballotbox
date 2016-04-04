class SignupModalStore {
  constructor() {
    this.bindActions(this.alt.getActions('signupModal'));
    this.bindActions(this.alt.getActions('home'));
    this.name = '';
    this.password = '';
    this.email = '';
    this.nameValidation = { state: null, helpBlock: '' };
    this.passwordValidation = { state: null, helpBlock: '' };
    this.emailValidation = { state: null, helpBlock: '' };
  }

  onSignupFail(error) {
    this.emailValidation = { state: 'error', helpBlock: 'This email is already registered' };
  }

  onUpdateName(e) {
    this.nameValidation = { state: null, helpBlock: '' };
    this.name = e.target.value; 
  }

  onUpdatePassword(e) {
    this.passwordValidation = { state: null, helpBlock: '' };
    this.password = e.target.value;
  }

  onUpdateEmail(e) {
    this.emailValidation = { state: null, helpBlock: '' };
    this.email = e.target.value;
  }

  onInvalidName() {
    this.nameValidation = { state: 'error', helpBlock: 'Please enter a name.' };
  }

  onInvalidEmail() {
    this.emailValidation = { state: 'error', helpBlock: 'Please enter a valid email.' };
  }

  onInvalidPassword() {
    this.passwordValidation = { 
      state: 'error',
      helpBlock: 'A password must be a minimum 8 characters with at least 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character.'
    };
  }
}

export default SignupModalStore;
