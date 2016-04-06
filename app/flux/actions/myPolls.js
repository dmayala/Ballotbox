const APIUtils = require(`../../../shared/API/MyPolls/${ process.env.BROWSER ? 'client' : 'server' }`).default;

export default class MyPollsActions { 

  constructor() {
    this.generateActions(
      'getPollsSuccess',
      'getPollsFail'
    );
  }

  getPolls() {
    return (dispatch, alt) => 
      alt.resolve(async () => {
        try {
          let jwt = this.alt.getStore('login').getState()._jwt;
          const response = await APIUtils.getPolls(jwt);
          this.actions.getPollsSuccess(response);
        } catch (error) {
          console.log(error);
          this.actions.getPollsFail({ error });
        }
      });
  }
}
