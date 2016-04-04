const APIUtils = require(`API/Home/${ process.env.BROWSER ? 'client' : 'server' }`).default;

class HomeActions { 

  constructor() {
    this.generateActions(
      'toggleSignup',
      'signupSuccess',
      'signupFail'
    );
  }

  signup(details) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.signup(details);
          if (response.error) {
            return this.actions.signupFail(response);
          }
          this.actions.signupSuccess(response);
        } catch (error) {
          this.actions.signupFail({ error });
        }
      });
  }
}

export default HomeActions; 
