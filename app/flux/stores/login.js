import jwt_decode from 'jwt-decode';

class LoginStore {
  constructor() {
    this.bindActions(this.alt.getActions('login'));
    this._user = null;
    this._jwt = null;
    this._name = null;
  }

  onLoginUserSuccess(jwt) {
    this._jwt = jwt.token;
    this._user = jwt_decode(this._jwt).user;
    this._name = jwt_decode(this._jwt).name;
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
    this._name = null;
    if (process.env.BROWSER) {
      const history = require('utils/routerHistory').default;
      return history.pushState(null, '/');
    }
  }
}

export default LoginStore;
