import * as dotenv from 'dotenv';

dotenv.config();
export default () => ({
  database: {
    dbUri: process.env.DATABASE_URI || 'mongodb://localhost:27022',
    username: process.env.DATABASE_USER || 'lex',
    password: process.env.DATABASE_PASS || '123456',
    databaseName: process.env.DATABASE_NAME || 'projectdb',
  },
});
