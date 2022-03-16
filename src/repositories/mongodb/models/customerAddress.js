import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
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

const CustomerAddressCollection = 'customerAddresses';
const CustomerAddressRepository = mongoose.model(CustomerAddressCollection, Schema);
export default CustomerAddressRepository;
