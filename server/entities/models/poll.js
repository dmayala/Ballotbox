import Bookshelf from '../../bookshelf';
import User from './user';
import Choice from './choice';
import Vote from './vote';

const Poll = Bookshelf.Model.extend({
  tableName: 'polls',
  creator() {
    return this.belongsTo(User, 'user_id');
  },
  choices() {
    return this.hasMany(Choice, 'poll_id');
  }
});

export default Poll;
