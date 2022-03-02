import dayjs from 'dayjs';
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
  checkTokenExists,
} from '../utils';
import CustomerRepository from '../../repositories/mongodb/models/customer';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const DeleteCustomer = async ({ email }) => {
    const { id } = await checkEmailExists({ email });
    const userToken = await checkTokenExists({ id });

    if (!id) ApiError(userAlreadyRemoved);

    if (userToken) await CustomerTokensRepository.deleteMany({ userId: id });
    return { delete: !!(await CustomerRepository.findOneAndDelete(email)) };
  };

  const CustomerTokens = async ({ id }) =>
    await CustomerTokensRepository.find({ userId: id });

  const Customer = async ({ id }) => await CustomerRepository.findOne({ id }).exec();

  const UpdateCustomer = async ({ args: { id, data } }) => ({
    customer: await CustomerRepository.findOneAndUpdate(id, data, { new: true }),
  });

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

    const token = generateToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    const customerRefreshToken = {
      userId: user.id,
      refreshToken,
      refreshTokenExpires: dayjs().add(30, 'days').format('DD-MM-YYYY'),
    };
    await CustomerTokensRepository.create(customerRefreshToken);
    return { token };
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
