import cookie from 'react-cookie';
const APIUtils = require(`../../../shared/API/Login/${ process.env.BROWSER ? 'client' : 'server' }`).default;

class LoginActions { 

  constructor() {
    this.generateActions(
      'loginUserSuccess',
      'loginUserFail',
      'logoutUserSuccess',
      'logoutUserFail'
    );
  }

  loadUser(jwt) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        this.actions.loginUserSuccess(jwt);
      });
  }

  logoutUser() {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          if (cookie.load('jwt')) {
            cookie.remove('jwt');
            this.actions.logoutUserSuccess();
          }
        } catch (error) {
          this.actions.logoutUserFail({ error });
        }
      });
  }

  loginUser(details) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.login(details);
          cookie.save('jwt', response.token);
          this.actions.loginUserSuccess(response);
        } catch (error) {
          this.actions.loginUserFail({ error });
        }
      });
  }
}

export default LoginActions; 
