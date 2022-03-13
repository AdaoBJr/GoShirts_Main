import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CustomerTokensCollection = 'customerTokens';
const CustomerTokensRepository = mongoose.model(CustomerTokensCollection, Schema);
export default CustomerTokensRepository;
