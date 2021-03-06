import { CustomerAddressRepository } from '../../../repositories/mongodb/models/customer';

import ApiError, {
  addressDoesNotExist,
  emailExists,
  dataEntryIncorrect,
} from '../../errors';

import {
  checkAddressExists,
  checkEmailExists,
  checkUserIdExists,
  generateRefreshToken,
} from '../../utils';

const useCustomerAddress = () => {
  const CustomerAddress = async ({ id: userId }) =>
    await CustomerAddressRepository.find({ userId });

  const CreateCustomerAddress = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(dataEntryIncorrect);

    const customerData = { userId: id, ...data };
    const customerAddress = await CustomerAddressRepository.create(customerData);
    const newToken = generateRefreshToken({ token });

    return { token: newToken, customer: customerAddress };
  };

  const UpdateCustomerAddress = async ({ args: { id, token, data } }) => {
    const user = await checkUserIdExists({ id });
    if (!user) ApiError(dataEntryIncorrect);

    const userExists = await checkEmailExists({ email: data.email });
    if (userExists) ApiError(emailExists);

    return {
      token: generateRefreshToken({ token }),
      customer: await CustomerAddressRepository.findOneAndUpdate({ id }, data, {
        new: true,
      }),
    };
  };

  const DeleteCustomerAddress = async ({ args: { id: userId, ID: _id } }) => {
    const user = await checkUserIdExists({ id: userId });
    if (!user) ApiError(dataEntryIncorrect);

    const address = await checkAddressExists({ _id });
    if (!address) ApiError(addressDoesNotExist);

    return { delete: !!(await CustomerAddressRepository.findOneAndDelete({ _id })) };
  };

  return {
    CustomerAddress,
    CreateCustomerAddress,
    UpdateCustomerAddress,
    DeleteCustomerAddress,
  };
};

export default useCustomerAddress;
