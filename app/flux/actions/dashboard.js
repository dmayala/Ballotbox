const APIUtils = require(`../../../shared/API/Dashboard/${ process.env.BROWSER ? 'client' : 'server' }`).default;

class DashboardActions { 

  constructor() {
    this.generateActions(
      'addPollSuccess',
      'addPollFail'
    );
  }

  addPoll(details) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await APIUtils.addPoll(details);
          this.actions.addPollSuccess(details);
        } catch (error) {
          this.actions.addPollFail({ error });
        }
      });
  }
}

export default DashboardActions; 
