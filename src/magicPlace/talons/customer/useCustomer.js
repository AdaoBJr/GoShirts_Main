import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import ApiError, {
  emailExists,
  emailOrPwdIncorrect,
  userAlreadyRemoved,
  userDoesNotExist,
} from '../../errors';
import {
  generateToken,
  generateRefreshToken,
  checkEmailExists,
  checkUserIdExists,
  generateTokenResetEmail,
} from '../../utils';

import {
  CustomerRepository,
  CustomerTokensRepository,
  CustomerAddressRepository,
  CustomerWishlistRepository,
} from '../../../repositories/mongodb/models/customer';

import { useMailProvider } from '../../../providers/mailProvider/customer';

const { SendForgotMail } = useMailProvider();

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const DeleteCustomer = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(userAlreadyRemoved);
    await CustomerTokensRepository.deleteMany({ userId: user.id });
    await CustomerAddressRepository.deleteMany({ userId: user.id });
    await CustomerWishlistRepository.deleteMany({ userId: user.id });

    return { delete: !!(await CustomerRepository.findOneAndDelete({ email })) };
  };

  const CustomerTokens = async ({ id: userId }) =>
    await CustomerTokensRepository.find({ userId });

  const CustomerInfo = async ({ id, token }) => ({
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

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await checkEmailExists({ email: data.email });
    if (!user) ApiError(emailOrPwdIncorrect);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) ApiError(emailOrPwdIncorrect);

    return { token: generateToken({ id: user.id }) };
  };

  const SignOutCustomer = async ({ args: { token } }) => ({
    signOut: !!(await CustomerTokensRepository.findOneAndDelete(token)),
  });

  const RequestPwdResetEmail = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(emailOrPwdIncorrect);

    const token = await generateTokenResetEmail({ id: user.id });
    const userData = { token, email, firstname: user.firstname, lastname: user.lastname };

    return await SendForgotMail({ userData });
  };

  return {
    CustomerList,
    CustomerInfo,
    CustomerTokens,
    UpdateCustomer,
    DeleteCustomer,
    CreateCustomer,
    SignInCustomer,
    SignOutCustomer,
    RequestPwdResetEmail,
  };
};

export default useCustomer;
