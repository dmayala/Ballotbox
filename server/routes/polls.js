import express from 'express';
import jwt_simple from 'jwt-simple';

import UserCollection from 'collections/users';
import PollCollection from 'collections/polls';
import ChoiceCollection from 'collections/choices';

import PollModel from 'models/poll';

const router = express.Router();

// Return this user's polls
router.get('/', async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);
      let user = await UserCollection.forge()
                                     .query({ where: { email: decoded.user } })
                                     .fetchOne();
      let polls = await PollCollection.forge()
                                      .query({ where: { user_id: user.get('id') } })
                                      .fetch({ withRelated: [ 'choices.votes' ]});

      return res.send(polls);
    }
    return res.status(500).send({ 'error': 'An error has occurred' });
  } catch (err) {
    return next(err);
  }
});


// Create a new poll
router.post('/', async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      let { name, choices } = req.body;
      let token = req.headers.authorization.split(' ')[1];
      let decoded = jwt_simple.decode(token, process.env.JWT_SECRET);

      let user = await UserCollection.forge()
                                     .query({ where: { email: decoded.user } })
                                     .fetchOne();

      let poll = await PollModel.forge({ name, user_id: user.get('id') }).save();

      choices = ChoiceCollection.forge(choices.map((text) => {
        return { name: text, poll_id: poll.get('id') };
      }));

      await Promise.all(choices.invoke('save'));
      let completePoll = await PollModel.forge().where({ id: poll.get('id') }).fetch({ withRelated: [ 'choices' ] });
      return res.send(completePoll);
    }
  } catch (err) {
    return res.status(500).send({ 'error': 'An error has occurred' });
  }

  return res.status(500).send({ 'error': 'An error has occurred' });
});


// Delete a poll
router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;

  try {
    let poll = await PollModel.forge({ id }).fetch({ withRelated: [ 'choices' ] });
    await poll.related('choices').invokeThen('destroy');
    await poll.destroy();
    res.send({ id });
  } catch (err) {
    console.log(err);
    res.status(500).send({ 'error': 'An error has occurred' });
  }
});


module.exports = router;
