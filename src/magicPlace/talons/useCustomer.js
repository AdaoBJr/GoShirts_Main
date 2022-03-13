import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import ApiError, {
  emailExists,
  emailOrPwdIncorrect,
  userAlreadyRemoved,
} from '../errors';
import {
  generateToken,
  generateRefreshToken,
  checkEmailExists,
  decodeToken,
} from '../utils';

import CustomerRepository from '../../repositories/mongodb/models/customer';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const DeleteCustomer = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(userAlreadyRemoved);
    await CustomerTokensRepository.deleteMany({ userId: user.id });

    return { delete: !!(await CustomerRepository.findOneAndDelete(email)) };
  };

  const CustomerTokens = async ({ id }) =>
    await CustomerTokensRepository.find({ userId: id });

  const Customer = async ({ token }) => {
    const { id } = decodeToken({ token });
    return {
      token: generateRefreshToken({ token }),
      customer: await CustomerRepository.findOne({ id }).exec(),
    };
  };

  const UpdateCustomer = async ({ args: { token, data } }) => {
    const { id } = decodeToken({ token });
    const user = await checkEmailExists({ email: data.email });
    if (user) ApiError(emailExists);
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

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await CustomerRepository.findOne({ email }).exec();
    if (!user) ApiError(emailOrPwdIncorrect);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) ApiError(emailOrPwdIncorrect);

    return { token: generateToken({ id: user.id }) };
  };

  return {
    CustomerList,
    Customer,
    CustomerTokens,
    UpdateCustomer,
    DeleteCustomer,
    CreateCustomer,
    SignInCustomer,
  };
};

export { useCustomer };
