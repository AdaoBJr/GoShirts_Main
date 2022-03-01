import CustomerRepository from '../../repositories/mongodb/models/customer';

const checkEmailExists = async ({ email }) =>
  !!(await CustomerRepository.findOne({ email }).exec());

export { checkEmailExists };
