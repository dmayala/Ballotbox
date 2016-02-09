import jwt_decode from 'jwt-decode';

class LoginStore {
  constructor() {
    this.bindActions(this.alt.getActions('login'));
    this._user = null;
    this._jwt = null;
  }

  onLoginUserSuccess(jwt) {
    this._jwt = jwt.token;
    this._user = jwt_decode(this._jwt).user;
    if (process.env.BROWSER) {
      const history = require('utils/routerHistory').default;
      const [ , nextPath = '/dashboard' ] = window
        .location.search.match(/\?redirect=(.+)$/) || [];
      return history.replaceState(null, nextPath);
    }
  }

  onLogoutUserSuccess() {
    this._jwt = null;
    this._user = null;
    if (process.env.BROWSER) {
      const history = require('utils/routerHistory').default;
      return history.pushState(null, '/');
    }
  }
}

export default LoginStore;
