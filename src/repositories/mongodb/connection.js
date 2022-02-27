import mongoose from 'mongoose';
const { DB_URL, DB_NAME, MONGO_PORT } = process.env;

mongoose.connect(`${DB_URL}:${MONGO_PORT}/${DB_NAME}`);
