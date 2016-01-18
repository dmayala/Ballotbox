class HelmetStore {

  constructor() {
    this.bindActions(this.alt.getActions('helmet'));

    this.title = '';
    this.titleBase = 'Ballotbox';
    this.description = 'A voting application written in JavaScript.';
    this.statusCode = 200;
  }

  onUpdate(props) {
    Object.keys(props)
      .forEach((key) => this[key] = props[key]);
  }

}

export default HelmetStore;
