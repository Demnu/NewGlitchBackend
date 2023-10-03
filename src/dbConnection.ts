// db.js
import postgres from 'postgres'

const client = postgres(process.env.CONNECTION_STRING || '', {
    max: 1
  });
export default client