import { CustomerWishlistRepository } from '../../../repositories/mongodb/models/customer';
import ApiError, { unexpectedError, userDoesNotExist } from '../../errors';
import {
  checkProductExistsByData,
  checkUserIdExists,
  checkWishlistExist,
  generateRefreshToken,
} from '../../utils';

const useCustomerWishlist = () => {
  const AddProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(userDoesNotExist);

    const wishlistExists = await checkWishlistExist({ userId });

    const customerWishlist = { userId, wishlist: data };

    if (wishlistExists)
      await CustomerWishlistRepository.findOneAndUpdate({ userId }, customerWishlist, {
        new: true,
      });

    if (!wishlistExists) {
      const created = await CustomerWishlistRepository.create(customerWishlist);
      if (!created) ApiError(unexpectedError);
    }

    return {
      token: generateRefreshToken({ token }),
      wishlist: await checkProductExistsByData({ data }),
    };
  };

  return { AddProductsToWishlist };
};

export default useCustomerWishlist;
