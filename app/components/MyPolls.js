import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import {Input, Button, Glyphicon, Alert, Accordion, Panel} from 'react-bootstrap';
import {sortBy} from 'lodash';

export default AuthenticatedComponent(class MyPolls extends React.Component {

  static propTypes = { children: React.PropTypes.element }
  static contextTypes = { 
    flux: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  state = this._getPollsState();

  _getPollsState() {
    let store = this.context.flux.getStore('myPolls');
    let myPollsState = store.getState();

    return {
      polls: myPollsState.polls,
      searchTerm: '' 
    };
  }

  componentWillMount() {
    this.context.flux.getActions('myPolls')
                     .getPolls();
  }

  componentDidMount() {
    this.context.flux.getStore('myPolls')
                     .listen(this._onChange);
  }

  componentWillUnmount() {
    this.context.flux.getStore('myPolls')
                     .unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState(this._getPollsState());
  }

  _handleSearch = () => {
    let state = Object.assign({}, this.state);
    state.searchTerm = this.refs.resultSearch.getValue().toLowerCase();
    this.setState(state);
  }

  render() {
    let polls = this.state.polls.filter((poll) => {
      return poll.name.toLowerCase().indexOf(this.state.searchTerm) !== -1;
    }).map(poll => {
      let choices = sortBy(poll.choices, 'id').map((choice, index) => {
        return (
          <li key={index}>{choice.name} - {choice.votes.length}</li>
        ); 
      });

      return (
        <Panel href="#" key={poll.id} eventKey={poll.id} header={poll.name}>
          <ul>
            { choices }
          </ul>
        </Panel>
      ); 
    });

    return (
      <div className="container" id="results">
        <h2>Results</h2>       
          <Input ref="resultSearch" onChange={this._handleSearch}name="search" type="text" placeholder="Search for polls" /> 
          <Accordion>
            { polls }
          </Accordion>
      </div>
    );
  }
});
