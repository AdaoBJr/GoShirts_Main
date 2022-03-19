import { CustomerWishlistRepository } from '../../../repositories/mongodb/models/customer';
import ApiError, {
  unexpectedError,
  userDoesNotExist,
  wishlistDoesNotExistsOrIsEmpty,
} from '../../errors';
import {
  checkAddProductWishlist,
  checkProductExistsByData,
  checkUserIdExists,
  checkWishlistExist,
  generateRefreshToken,
} from '../../utils';

const useCustomerWishlist = () => {
  const AddProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(userDoesNotExist);

    const wishDB = await checkWishlistExist({ userId });
    const { wishChecked, wishData } = await checkProductExistsByData({ data });
    const wishlist = checkAddProductWishlist({ wishDB, wishData });

    const customerWishlist = { userId, wishlist };

    if (wishDB)
      await CustomerWishlistRepository.findOneAndUpdate({ userId }, customerWishlist, {
        new: true,
      });

    if (!wishDB) {
      const created = await CustomerWishlistRepository.create(customerWishlist);
      if (!created) ApiError(unexpectedError);
    }

    return {
      token: generateRefreshToken({ token }),
      wishlist: wishChecked,
    };
  };

  const RemoveProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(userDoesNotExist);

    const wishlistExists = await checkWishlistExist({ userId });
    if (!wishlistExists) ApiError(wishlistDoesNotExistsOrIsEmpty);
  };

  return { AddProductsToWishlist, RemoveProductsToWishlist };
};

export default useCustomerWishlist;
