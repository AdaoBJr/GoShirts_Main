import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import ApiError, {
  emailExists,
  emailOrPwdIncorrect,
  userAlreadyRemoved,
  userDoesNotExist,
} from '../errors';
import {
  generateToken,
  generateRefreshToken,
  checkEmailExists,
  checkUserIdExists,
} from '../utils';

import CustomerRepository from '../../repositories/mongodb/models/customer';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';
import CustomerAddressRepository from '../../repositories/mongodb/models/customerAddress';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const DeleteCustomer = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(userAlreadyRemoved);
    await CustomerTokensRepository.deleteMany({ userId: user.id });
    await CustomerAddressRepository.deleteMany({ userId: user.id });

    return { delete: !!(await CustomerRepository.findOneAndDelete(email)) };
  };

  const CustomerTokens = async ({ id: userId }) =>
    await CustomerTokensRepository.find({ userId });

  const CustomerAddress = async ({ id: userId }) =>
    await CustomerAddressRepository.find({ userId });

  const Customer = async ({ id, token }) => ({
    token: generateRefreshToken({ token }),
    customer: await CustomerRepository.findOne({ id }).exec(),
  });

  const UpdateCustomer = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(userDoesNotExist);

    const userExists = await checkEmailExists({ email: data.email });
    if (userExists) ApiError(emailExists);

    return {
      token: generateRefreshToken({ token }),
      customer: await CustomerRepository.findOneAndUpdate({ id }, data, { new: true }),
    };
  };

  const CreateCustomer = async ({ data }) => {
    const user = await checkEmailExists({ email: data.email });
    if (user) ApiError(emailExists);

    const id = uuidV4();
    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    const customerData = { id, ...data };
    const customer = await CustomerRepository.create(customerData);
    return { customer };
  };

  const CreateCustomerAddress = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(userDoesNotExist);

    const customerData = { userId: id, ...data };
    const customerAddress = await CustomerAddressRepository.create(customerData);
    const newToken = generateRefreshToken({ token });

    return { token: newToken, customer: customerAddress };
  };

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await CustomerRepository.findOne({ email }).exec();
    if (!user) ApiError(emailOrPwdIncorrect);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) ApiError(emailOrPwdIncorrect);

    return { token: generateToken({ id: user.id }) };
  };

  const SignOutCustomer = async ({ args: { token } }) => ({
    signOut: !!(await CustomerTokensRepository.findOneAndDelete(token)),
  });

  return {
    CustomerList,
    Customer,
    CustomerAddress,
    CustomerTokens,
    UpdateCustomer,
    DeleteCustomer,
    CreateCustomer,
    SignInCustomer,
    SignOutCustomer,
    CreateCustomerAddress,
  };
};

export { useCustomer };
