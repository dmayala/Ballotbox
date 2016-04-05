class DashboardStore {
  constructor() {
    this.bindActions(this.alt.getActions('dashboard'));
    this.poll = {};
  }

  onAddPollSuccess(poll) {
    this.poll = poll;
  }
}

export default DashboardStore;
