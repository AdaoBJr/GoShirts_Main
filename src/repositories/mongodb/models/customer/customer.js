import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
  avatarImage: {
    type: String,
  },
});

const CustomerRepository = mongoose.model('customer', Schema, 'customers');
export default CustomerRepository;
