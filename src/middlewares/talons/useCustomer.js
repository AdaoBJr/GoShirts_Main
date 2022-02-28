import Customer from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../utils/generateToken';

const useCustomer = () => {
  const CustomerList = async () => await Customer.find();

  const CustomerById = async ({ id }) => ({
    customer: await Customer.findOne({ id }).exec(),
  });

  const UpdateCustomerById = async ({ id, data }) => ({
    customer: await Customer.findOneAndUpdate(id, data, { new: true }),
  });

  const DeleteCustomerById = async ({ id }) => ({
    delete: !!(await Customer.findOneAndDelete(id)),
  });

  const CreateCustomer = async ({ data }) => {
    const id = uuidV4();
    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await Customer.findOne({ email }).exec();
    if (!user) throw new Error('Email or password incorrect!');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Email or password incorrect!');

    return generateToken({ email });
  };

  return {
    CustomerList,
    CustomerById,
    UpdateCustomerById,
    DeleteCustomerById,
    CreateCustomer,
    SignInCustomer,
  };
};

export { useCustomer };
