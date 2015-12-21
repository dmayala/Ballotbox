import React from 'react';
import {Button} from 'react-bootstrap';

class PollList extends React.Component {
  render() {
    return (
      <div className="row dashboard-home">
        <div className="col-lg-4 col-lg-offset-4">
          <ul className="list-group">
            <li className="list-group-item">
              When is today?
              <Button bsStyle="danger">Delete</Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PollList;
