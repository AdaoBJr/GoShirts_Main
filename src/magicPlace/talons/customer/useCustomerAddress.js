import CustomerAddressRepository from '../../../repositories/mongodb/models/customerAddress';
import ApiError, { emailExists, userDoesNotExist } from '../../errors';
import { checkEmailExists, checkUserIdExists, generateRefreshToken } from '../../utils';

const useCustomerAddress = () => {
  const CustomerAddress = async ({ id: userId }) =>
    await CustomerAddressRepository.find({ userId });

  const CreateCustomerAddress = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(userDoesNotExist);

    const customerData = { userId: id, ...data };
    const customerAddress = await CustomerAddressRepository.create(customerData);
    const newToken = generateRefreshToken({ token });

    return { token: newToken, customer: customerAddress };
  };

  const UpdateCustomerAddress = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(userDoesNotExist);

    const userExists = await checkEmailExists({ email: data.email });
    if (userExists) ApiError(emailExists);

    return {
      token: generateRefreshToken({ token }),
      customer: await CustomerAddressRepository.findOneAndUpdate({ id }, data, {
        new: true,
      }),
    };
  };

  return {
    CustomerAddress,
    CreateCustomerAddress,
    UpdateCustomerAddress,
  };
};

export { useCustomerAddress };
