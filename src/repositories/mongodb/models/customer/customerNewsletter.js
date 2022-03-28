import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const CustomerNewsletterRepository = mongoose.model(
  'customerNewsletter',
  Schema,
  'customerNewsletter'
);
export default CustomerNewsletterRepository;
