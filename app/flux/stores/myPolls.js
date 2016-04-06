export default class MyPollsStore {
  constructor() {
    this.bindActions(this.alt.getActions('myPolls'));
    this.polls = [];
  }

  onGetPollsSuccess(polls) {
    this.polls = polls;
  }
}
