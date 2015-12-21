const APIUtils = require(`utils/API/Home/${ process.env.BROWSER ? 'client' : 'server' }`)

class HomeActions { 

  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
      'loginSuccess',
      'loginFail'
    );
  }

  signup(details) {
    let promise = APIUtils.signup(details);
    promise.then((result) => {
      this.actions.signupSuccess(result);
    }, (reason) => {
      this.actions.signupFail(reason);
    });
    this.alt.resolve(promise);
  }

  login(details) {
    let promise = APIUtils.signup(details);
    promise.then((result) => {
      this.actions.loginSuccess(result);
    }, (reason) => {
      this.actions.loginFail(reason);
    });
    this.alt.resolve(promise);
  }

}

export default HomeActions; 
