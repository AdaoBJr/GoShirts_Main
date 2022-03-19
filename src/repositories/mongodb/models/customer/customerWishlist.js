import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  wishlist: {
    type: Array,
    required: true,
  },
});

const CustomerWishlistRepository = mongoose.model(
  'customerWishlist',
  Schema,
  'customerWishlist'
);
export default CustomerWishlistRepository;
