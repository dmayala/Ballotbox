import Bookshelf from '../../bookshelf';
import Choice from '../models/choice';

const Choices = Bookshelf.Collection.extend({
  model: Choice
});

export default Choices;
