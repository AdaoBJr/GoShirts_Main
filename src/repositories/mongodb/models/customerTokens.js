import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenExpires: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CustomerTokensCollection = 'customerTokens';
const CustomerTokensRepository = mongoose.model(CustomerTokensCollection, Schema);
export default CustomerTokensRepository;
