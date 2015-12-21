import Bookshelf from '../../bookshelf';

const User = Bookshelf.Model.extend({
  tableName: 'users'
});

export default User;
