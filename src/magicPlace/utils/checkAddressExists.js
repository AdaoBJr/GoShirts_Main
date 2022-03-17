import { CustomerAddressRepository } from '../../repositories/mongodb/models/customer';

const checkAddressExists = async ({ _id }) =>
  await CustomerAddressRepository.findOne({ _id }).exec();

export default checkAddressExists;
