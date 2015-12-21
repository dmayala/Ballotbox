import React from 'react';
import {Button} from 'react-bootstrap';

class AddPoll extends React.Component {
  render() {
    return (
      <div className="row home">
        <div className="col-lg-4 col-lg-offset-4">
          <h2>New Poll</h2>
          <form name="newpoll">
            <div className="form-group">
              <label htmlFor="name">Name your poll.</label>
              <input id="name" name="poll" placeholder="What is your favorite brand?"
              className="form-control" required />
            </div>
            <div className="form-group">
              <label>Options</label>
              <input placeholder="Coke" className="form-control" required="" />
              <input placeholder="Pepsi" className="form-control" required="" />
            </div>
            <div className="form-buttons" width="350px">
              <Button>More Options</Button> 
              <Button bsStyle="success">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPoll;
