import { CustomerWishlistRepository } from '../../repositories/mongodb/models/customer';

const checkWishlistExist = async ({ id, userId }) =>
  await CustomerWishlistRepository.findOne({ userId: id || userId }).exec();

export default checkWishlistExist;
