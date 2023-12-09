import dotenv from 'dotenv'; //loads enviornment variables.
dotenv.config(); // we can keep credentials enviornment specific.

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.xtfwqif.mongodb.net/?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
