'use strict';

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.seed = function(knex, Promise) {
  let votes = knex('votes');
  let choices = knex('choices');
  let polls = knex('polls');
  let users = knex('users');

  let p = Promise.resolve();
  let list = [
    () => votes.del(),
    () => choices.del(),
    () => polls.del(),
    () => users.del(),
    () => users.insert({ id: 1, 
                         name: 'Bob',
                         email: 'dUqwELoplWCf5xl7@mailinator.com',
                         password: bcrypt.hashSync('tiger', salt)
                       }),
    () => users.insert({ id: 2,
                         name: 'Alice',
                         email: 'PKRfsO43xjTmk8kA@mailinator.com',
                         password: bcrypt.hashSync('fluffy', salt)
                       }),
    () => polls.insert({ id: 1, user_id: 1, name: 'Coke or Pepsi?' }),
    () => polls.insert({ id: 2, user_id: 2, name: 'Bob or Alice?' }),
    () => { return choices.insert([
              { id: 1, poll_id: 1, name: 'Coke' },    
              { id: 2, poll_id: 1, name: 'Pepsi' },   
              { id: 3, poll_id: 1, name: 'Other' },
              { id: 4, poll_id: 2, name: 'Bob' },   
              { id: 5, poll_id: 2, name: 'Alice' },
              { id: 6, poll_id: 2, name: 'Neither' }  
            ])
          },
    () => {
      return knex.raw('select setval(\'users_id_seq\', (select MAX(id) from "users"));');
    },
    () => {
      return knex.raw('select setval(\'polls_id_seq\', (select MAX(id) from "polls"));');
    },
    () => {
      return knex.raw('select setval(\'choices_id_seq\', (select MAX(id) from "choices"));');
    }
  ];

  return list.reduce((pacc, fn) => {
    return pacc = pacc.then(fn);
  }, p);
};
