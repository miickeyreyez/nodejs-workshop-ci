import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from '../logger';

// Load dotenv
dotenv.config();

const {
  DB_HOST,
  DB_NAME,
} = process.env;

const db = async () => {
  try {
    await mongoose.connect(`${DB_HOST}/${DB_NAME}`, { useNewUrlParser: true });
    log('Database connected');
  } catch (error) {
    log(`Cannot connect to database, error: ${error}`);
  }
};

export default db;
