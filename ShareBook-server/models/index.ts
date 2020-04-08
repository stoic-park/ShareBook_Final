/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
import { Sequelize } from 'sequelize-typescript';
// eslint-disable-next-line import/extensions
import { Users } from './Users';
import { Books } from './Books';
import { History } from './History';
import { Chat } from './Chat';
import 'dotenv/config';
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];

// // console.log(config);
// const { database, dialect, username, password, host } = config;
export const sequelize = new Sequelize({
  database: process.env.db_database,
  dialect: 'mysql',
  username: process.env.db_username,
  password: process.env.db_password,
  host: process.env.db_host,
  models: [Users, Books, History, Chat],
});

// TODO: Check connection
sequelize
  .authenticate()
  .then(() => console.log('Connection Successed!'))
  .catch((err: Error) => console.error('Unable to connect to the MySQL', err));
