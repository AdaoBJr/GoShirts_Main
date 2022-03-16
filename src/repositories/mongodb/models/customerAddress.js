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
  rua: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  CEP: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  defaultShipping: {
    type: Boolean,
    required: true,
  },
  defaultBilling: {
    type: Boolean,
    required: true,
  },
});

const CustomerAddressRepository = mongoose.model(
  'customerAddress',
  Schema,
  'customerAddresses'
);
export default CustomerAddressRepository;
