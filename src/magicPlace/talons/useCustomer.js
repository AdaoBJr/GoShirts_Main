import CustomerRepository from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../utils/generateToken';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const Customer = async ({ email }) =>
    await CustomerRepository.findOne({ email }).exec();

  const UpdateCustomerById = async ({ id, data }) => ({
    customer: await CustomerRepository.findOneAndUpdate(id, data, { new: true }),
  });

  const DeleteCustomerByEmail = async ({ email }) => ({
    delete: !!(await CustomerRepository.findOneAndDelete(email)),
  });

  const CreateCustomer = async ({ data }) => {
    const user = await CustomerRepository.findOne({ email: data.email }).exec();
    if (user) throw new Error('User already registered');

    const id = uuidV4();
    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    const customerData = { id, ...data };
    const customer = await CustomerRepository.create(customerData);
    return { customer };
  };

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await CustomerRepository.findOne({ email }).exec();
    if (!user) throw new Error('Email or password incorrect!');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Email or password incorrect!');

    return generateToken({ email });
  };

  return {
    CustomerList,
    Customer,
    UpdateCustomerById,
    DeleteCustomerByEmail,
    CreateCustomer,
    SignInCustomer,
  };
};

export { useCustomer };
