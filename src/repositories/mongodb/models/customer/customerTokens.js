import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const CustomerTokensRepository = mongoose.model(
  'customerToken',
  Schema,
  'customerTokens'
);
export default CustomerTokensRepository;
