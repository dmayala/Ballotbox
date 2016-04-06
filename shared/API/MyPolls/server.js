import Polls from 'collections/polls';
import Users from 'collections/users';

import jwt_simple from 'jwt-simple';

export default {
  async getPolls(token) {
    try {
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);

      let user = await Users.forge()
                            .query({ where: { email: decoded.user } })
                            .fetchOne();

      let polls = await Polls.forge()
                             .query({ where: { user_id: user.get('id') } })
                             .fetch({ withRelated: [ 'choices.votes' ]});

      return polls.toJSON();
    } catch (err) {
      throw new Error(err);
    }
  }
}
