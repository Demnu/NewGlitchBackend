// db.js
import postgres from 'postgres';

const databaseClient = postgres(process.env.CONNECTION_STRING || '', {
  max: 1
});
export default databaseClient;
