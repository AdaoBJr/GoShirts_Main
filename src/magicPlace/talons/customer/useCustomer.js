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
  checkNewsletterExist,
} from '../../utils';

import {
  CustomerRepository,
  CustomerTokensRepository,
  CustomerAddressRepository,
  CustomerWishlistRepository,
  CustomerNewsletterRepository,
} from '../../../repositories/mongodb/models/customer';

import { useMailProvider } from '../../../providers/mailProvider/customer';
import { dataEntryIncorrect } from '../../errors/msgError';

const { SendMailForgotPwd, SendChangeEmail, SendEmailWelcomeNewsletter } =
  useMailProvider();

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

  const SubscribeNewsletter = async ({ email }) => {
    const userExistInNewsletter = await checkNewsletterExist({ email });
    if (userExistInNewsletter) return { subscribed: true };

    const user = await checkEmailExists({ email });
    if (user && !user.subscribe) {
      await CustomerRepository.findOneAndUpdate(
        { email },
        { subscribe: true },
        { new: true }
      );
      const customerData = { userId: user.id, email };
      await CustomerNewsletterRepository.create(customerData);
    }

    const userId = uuidV4();
    const customerData = { userId, email };
    await CustomerNewsletterRepository.create(customerData);

    return await SendEmailWelcomeNewsletter({ email });
  };

  const UnsubscribeNewsletter = async ({ email }) => {
    const userExistInNewsletter = await checkNewsletterExist({ email });
    if (!userExistInNewsletter) return { unsubscribed: true };

    const user = await checkEmailExists({ email });
    if (user && user.subscribe) {
      await CustomerRepository.findOneAndUpdate(
        { email },
        { subscribe: false },
        { new: true }
      );
      await CustomerNewsletterRepository.deleteMany({ email });
    }

    return { unsubscribed: !!(await CustomerNewsletterRepository.deleteMany({ email })) };
  };

  const CustomerInfo = async ({ id, token }) => ({
    token: generateRefreshToken({ token }),
    customer: await CustomerRepository.findOne({ id }).exec(),
  });

  const UpdateCustomer = async ({ args: { id, token, data } }) => {
    const { email } = data;

    const userExists = await checkEmailExists({ email });
    if (userExists) ApiError(emailExists);

    if (data.subscribe) await SendEmailWelcomeNewsletter({ email });
    if (!data.subscribe) UnsubscribeNewsletter({ email });

    return {
      token: generateRefreshToken({ token }),
      customer: await CustomerRepository.findOneAndUpdate({ id }, data, { new: true }),
    };
  };

  const CreateCustomer = async ({ data }) => {
    const { email } = data;

    const user = await checkEmailExists({ email });
    if (user) ApiError(emailExists);

    if (data.subscribe) await SendEmailWelcomeNewsletter({ email });

    const userExistInNewsletter = await checkNewsletterExist({ email });

    let id = '';
    if (userExistInNewsletter) {
      id = userExistInNewsletter.userId;
      data.subscribe = true;
    } else {
      id = uuidV4();
    }

    const passwordHash = await hash(data.password, 8);

    Object.assign(data, { id, password: passwordHash });
    const customer = await CustomerRepository.create(data);
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

  const RequestResetPwd = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(dataEntryIncorrect);
    const { id, firstname } = user;

    const token = await generateTokenResetEmail({ id });
    const userData = { token, email, firstname };

    return await SendMailForgotPwd({ userData });
  };

  const RequestResetEmail = async ({ email }) => {
    const user = await checkEmailExists({ email });
    if (!user) ApiError(dataEntryIncorrect);
    const { id, firstname } = user;

    const token = await generateTokenResetEmail({ id });
    const userData = { token, email, firstname };

    return await SendChangeEmail({ userData });
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

  const ResetEmail = async ({ data: { userId, newEmail } }) => {
    const customerToken = await checkTokenExists({ userId });
    if (!customerToken) ApiError(tokenInvalidOrUnath);

    const userExists = await checkUserIdExists({ userId });
    if (!userExists) ApiError(tokenInvalidOrUnath);

    const tokens = customerToken.items;
    if (tokens.length > 1 || !tokens.length) ApiError(tokenInvalidOrUnath);

    const token = decodeToken({ token: tokens[0] });
    if (!token) ApiError(expiredSession);

    const changedEmail = await CustomerRepository.findOneAndUpdate(
      { id: userId },
      { email: newEmail },
      { new: true }
    );

    await CustomerTokensRepository.deleteMany({ userId });

    return { newEmail: !!changedEmail };
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
    SubscribeNewsletter,
    UnsubscribeNewsletter,
    CustomerInfo,
    CustomerTokens,
    UpdateCustomer,
    DeleteCustomer,
    CreateCustomer,
    SignInCustomer,
    SignOutCustomer,
    RequestResetPwd,
    RequestResetEmail,
    ResetPassword,
    ResetEmail,
    UpdateAvatarImage,
  };
};

export default useCustomer;
