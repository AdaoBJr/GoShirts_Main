import { v4 as uuidV4 } from 'uuid';
import { hash, compare } from 'bcrypt';

import ApiError, {
  emailExists,
  emailOrPwdIncorrect,
  expiredSession,
  tokenInvalidOrUnath,
  userAlreadyRemoved,
} from '../../errors';
import {
  generateToken,
  generateRefreshToken,
  checkEmailExists,
  checkUserIdExists,
  generateTokenResetEmail,
  checkTokenExists,
  decodeToken,
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

  const CustomerTokens = async ({ id: userId }) => ({
    items: (await CustomerTokensRepository.findOne({ userId }).exec()).items,
  });

  const CustomerInfo = async ({ id, token }) => ({
    token: generateRefreshToken({ token }),
    customer: await CustomerRepository.findOne({ id }).exec(),
  });

  const UpdateCustomer = async ({ args: { id, token, data } }) => {
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
    const user = await checkEmailExists({ email });
    if (!user) ApiError(emailOrPwdIncorrect);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) ApiError(emailOrPwdIncorrect);

    return { token: generateToken({ userId: user.id }) };
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

  const ResetPassword = async ({ data: { userId, newPassword } }) => {
    const customerToken = await checkTokenExists({ userId });
    if (!customerToken) ApiError(tokenInvalidOrUnath);

    const userExists = await checkUserIdExists({ userId });
    if (!userExists) ApiError(tokenInvalidOrUnath);

    const tokens = customerToken.items;
    if (tokens.length > 1 || !tokens.length) ApiError(tokenInvalidOrUnath);

    const token = decodeToken({ token: tokens[0] });
    if (!token) ApiError(expiredSession);

    const passwordHash = await hash(newPassword, 8);

    const resetedPwd = await CustomerRepository.findOneAndUpdate(
      { id: userId },
      { password: passwordHash },
      { new: true }
    );

    await CustomerTokensRepository.deleteMany({ userId });

    return { newPassword: !!resetedPwd };
  };

  const UpdateAvatarImage = async ({ args: { id, token, file } }) => ({
    token: generateRefreshToken({ token }),
    updated: !!(await CustomerRepository.findOneAndUpdate(
      { id },
      { avatarImage: file },
      { new: true }
    )),
  });

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
    ResetPassword,
    UpdateAvatarImage,
  };
};

export default useCustomer;
