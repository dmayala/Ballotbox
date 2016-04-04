class HomeStore {
  constructor() {
    this.bindActions(this.alt.getActions('home'));
    this.showModal = false;
  }

  onSignupSuccess(response) {
    this.showModal = false;
    if (process.env.BROWSER) {
      const history = require('utils/routerHistory').default;
      const [ , nextPath = '/dashboard' ] = window
        .location.search.match(/\?redirect=(.+)$/) || [];
      return history.replaceState(null, nextPath);
    }
  }

  onToggleSignup() {
    this.showModal = !this.showModal;
  }
}

export default HomeStore;
