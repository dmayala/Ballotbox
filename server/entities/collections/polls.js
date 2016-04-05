import Bookshelf from '../../bookshelf';
import Poll from '../models/poll';

const Polls = Bookshelf.Collection.extend({
  model: Poll
});

export default Polls;
