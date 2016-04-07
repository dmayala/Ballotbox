import {findIndex} from 'lodash';

export default class MyPollsStore {
  constructor() {
    this.bindActions(this.alt.getActions('myPolls'));
    this.polls = [];
  }

  onGetPollsSuccess(polls) {
    this.polls = polls;
  }

  onRemovePollSuccess(payload) {
    let id = payload.pollId;
    let index = findIndex(this.polls, { id });
    if (index > -1) {
      this.polls.splice(index, 1);
    }
  }
}
