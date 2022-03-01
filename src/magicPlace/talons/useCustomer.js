import CustomerRepository from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { generateToken } from '../utils/generateToken';
import { checkEmailExists } from '../utils/checkEmailExists';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const Customer = async ({ id }) => await CustomerRepository.findOne({ id }).exec();

  const UpdateCustomer = async ({ args: { id, data } }) => ({
    customer: await CustomerRepository.findOneAndUpdate(id, data, { new: true }),
  });

  const DeleteCustomer = async ({ id }) => ({
    delete: !!(await CustomerRepository.findOneAndDelete(id)),
  });

  const CreateCustomer = async ({ data }) => {
    const user = await checkEmailExists({ email: data.email });
    if (user) throw new Error('Email already registered');

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

    return generateToken({ id: user.id });
  };

  return {
    CustomerList,
    Customer,
    UpdateCustomer,
    DeleteCustomer,
    CreateCustomer,
    SignInCustomer,
  };
};

export { useCustomer };
