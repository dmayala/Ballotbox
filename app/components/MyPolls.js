import React from 'react';
import AuthenticatedComponent from 'components/AuthenticatedComponent';
import {Input, Button, Glyphicon, Accordion, Panel, Modal} from 'react-bootstrap';
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
      searchTerm: '',
      showModal: false
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

  _openModal = (pollId) => {
    this.setState(Object.assign(this.state, { showModal: true, removePollId: pollId }));
  }

  _removePoll = () => {
    this.setState(Object.assign(this.state, { showModal: false }));
    this.context.flux.getActions('myPolls')
                     .removePoll(this.state.removePollId);
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

      let title = (
        <div className="clearfix">
          {poll.name} 
          <Button onClick={(e) => { e.stopPropagation(); this._openModal(poll.id) }} className="pull-right" bsStyle="danger" bsSize="xsmall">
            <Glyphicon glyph="trash" />
          </Button>
        </div>
      );

      return (
        <Panel href="#" key={poll.id} eventKey={poll.id} header={title}>
          <ul>
            { choices }
          </ul>
        </Panel>
      ); 
    });

    let close = () => this.setState(Object.assign(this.state, { showModal: false }));

    return (
      <div id="myPolls">
        <h2>My Polls</h2>       
          <Input ref="resultSearch" onChange={this._handleSearch}name="search" type="text" placeholder="Search for polls" /> 
          <Accordion>
            { polls }
          </Accordion>
          <Modal show={this.state.showModal} onHide={close}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Poll</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this poll?
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger" onClick={this._removePoll}>Delete</Button>
              <Button onClick={close}>Cancel</Button>
            </Modal.Footer>
          </Modal>
      </div>
    );
  }
});
