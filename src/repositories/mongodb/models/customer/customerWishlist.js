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

const CustomerWishlistRepository = mongoose.model(
  'customerWishlist',
  Schema,
  'customerWishlist'
);
export default CustomerWishlistRepository;
