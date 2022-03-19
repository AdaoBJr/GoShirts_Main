import { CustomerWishlistRepository } from '../../repositories/mongodb/models/customer';

const checkWishlistExist = async ({ userId }) =>
  await CustomerWishlistRepository.findOne({ userId }).exec();

export default checkWishlistExist;
