import Bookshelf from 'bookshelf';
import knex from 'knex';

let dbConfig = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

let dbConnection = Bookshelf(dbConfig);

export default dbConnection;
