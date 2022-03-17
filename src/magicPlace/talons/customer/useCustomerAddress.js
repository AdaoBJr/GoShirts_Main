import CustomerAddressRepository from '../../../repositories/mongodb/models/customerAddress';
import ApiError, { userDoesNotExist } from '../../errors';
import { checkUserIdExists, generateRefreshToken } from '../../utils';

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
  return {
    CustomerAddress,
    CreateCustomerAddress,
  };
};

export { useCustomerAddress };
