import Bookshelf from '../../bookshelf';
import Vote from './vote';

const Choice = Bookshelf.Model.extend({
  tableName: 'choices',

  votes() {
    return this.hasMany(Vote, 'choice_id'); 
  }
});

export default Choice;
