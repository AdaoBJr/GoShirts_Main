import { CustomerNewsletterRepository } from '../../repositories/mongodb/models/customer';

const checkNewsletterExist = async ({ email }) =>
  await CustomerNewsletterRepository.findOne({ email }).exec();

export default checkNewsletterExist;
