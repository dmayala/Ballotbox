import Bookshelf from '../../bookshelf';
import User from './user';

const Vote = Bookshelf.Model.extend({
  tableName: 'votes',

  user() {
    return this.belongsTo(User, 'user_id'); 
  }
});

export default Vote;
