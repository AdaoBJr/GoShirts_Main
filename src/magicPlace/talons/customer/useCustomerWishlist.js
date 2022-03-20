import { CustomerWishlistRepository } from '../../../repositories/mongodb/models/customer';
import ApiError, {
  unexpectedError,
  userDoesNotExist,
  wishlistDoesNotExistsOrIsEmpty,
} from '../../errors';
import {
  increaseProductWishlist,
  checkProductOnRepos,
  decreaseProductWishlist,
  checkUserIdExists,
  checkWishlistExist,
  generateRefreshToken,
} from '../../utils';

const useCustomerWishlist = () => {
  const CustomerWishList = async () => await CustomerWishlistRepository.find();

  const Wishlist = async ({ id, token }) => {
    const wishDB = await checkWishlistExist({ id });
    if (!wishDB) ApiError(wishlistDoesNotExistsOrIsEmpty);

    return token
      ? {
          token: generateRefreshToken({ token }),
          count: wishDB.count,
          items: wishDB.wishlist,
        }
      : { count: wishDB.count, items: wishDB.wishlist };
  };

  const AddProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(userDoesNotExist);

    const wishDB = await checkWishlistExist({ userId });
    const { wishChecked, wishData } = await checkProductOnRepos({ data });

    const wishlist = increaseProductWishlist({ wishDB, wishData });
    const count = wishlist.length;

    const customerWishlist = { userId, wishlist, count };

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
      count,
      wishlist: wishChecked,
    };
  };

  const RemoveProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(userDoesNotExist);

    const wishDB = await checkWishlistExist({ userId });
    if (!wishDB) ApiError(wishlistDoesNotExistsOrIsEmpty);

    const { wishChecked, wishData } = await checkProductOnRepos({
      userId,
      data,
      decrease: true,
    });
    const wishlist = decreaseProductWishlist({ wishDB, wishData });
    const count = wishlist.length;

    const customerWishlist = { userId, wishlist, count };

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
      count,
      wishlist: wishChecked,
    };
  };

  return {
    CustomerWishList,
    Wishlist,
    AddProductsToWishlist,
    RemoveProductsToWishlist,
  };
};

export default useCustomerWishlist;
