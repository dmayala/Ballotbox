exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (t) {
      t.increments('id').primary();
      t.string('name').notNullable();
      t.string('email').notNullable();
      t.string('password').notNullable();
    })
    .createTable('polls', function (t) {
      t.increments('id').primary();
      t.integer('user_id').unsigned().references('id').inTable('users').notNullable();
      t.string('name');
    })
    .createTable('choices', function (t) {
      t.increments('id').primary();
      t.integer('poll_id').unsigned().references('id').inTable('polls').notNullable();
      t.string('name');
    })
    .createTable('votes', function (t) {
      t.increments('id').primary();
      t.integer('user_id').unsigned().references('id').inTable('users').notNullable();
      t.integer('choice_id').unsigned().references('id').inTable('choices').notNullable();
      t.integer('poll_id').unsigned().references('id').inTable('polls').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes')
                    .dropTable('choices')
                    .dropTable('polls')
                    .dropTable('users');
};
