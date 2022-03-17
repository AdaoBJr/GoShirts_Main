import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'customer',
  },
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const CustomerTokensRepository = mongoose.model(
  'customerToken',
  Schema,
  'customerTokens'
);
export default CustomerTokensRepository;
