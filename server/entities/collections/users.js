import Bookshelf from '../../bookshelf';
import User from '../models/user';

const Users = Bookshelf.Collection.extend({
  model: User
});

export default Users;
