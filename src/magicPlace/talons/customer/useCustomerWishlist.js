import { CustomerWishlistRepository } from '../../../repositories/mongodb/models/customer';
import ApiError, {
  productDoesNotExists,
  unexpectedError,
  dataEntryIncorrect,
  wishlistDoesNotExistsOrIsEmpty,
} from '../../errors';
import {
  increaseProductWishlist,
  checkProductOnRepos,
  decreaseProductWishlist,
  checkUserIdExists,
  checkWishlistExist,
  generateRefreshToken,
  checkProductExists,
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
          items: wishDB.items,
        }
      : { count: wishDB.count, items: wishDB.items };
  };

  const AddProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(dataEntryIncorrect);

    const wishDB = await checkWishlistExist({ userId });
    const { wishChecked, wishData } = await checkProductOnRepos({ data });

    const items = increaseProductWishlist({ wishDB, wishData });
    const count = items.length;

    const customerWishlist = { userId, items, count };

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
      items: wishChecked,
    };
  };

  const RemoveProductsToWishlist = async ({ args: { id: userId, token, data } }) => {
    const user = await checkUserIdExists({ userId });
    if (!user) ApiError(dataEntryIncorrect);

    const wishDB = await checkWishlistExist({ userId });
    if (!wishDB) ApiError(wishlistDoesNotExistsOrIsEmpty);

    const { wishChecked, wishData } = await checkProductOnRepos({
      userId,
      data,
      decrease: true,
    });
    const items = decreaseProductWishlist({ wishDB, wishData });
    const count = items.length;

    const customerWishlist = { userId, items, count };

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
      items: wishChecked,
    };
  };

  const ProductWishlist = async ({ parent: { sku } }) => {
    const product = await checkProductExists({ sku });
    if (!product) ApiError(productDoesNotExists);

    const { name, description } = product;
    return { name, description };
  };

  return {
    CustomerWishList,
    Wishlist,
    AddProductsToWishlist,
    RemoveProductsToWishlist,
    ProductWishlist,
  };
};

export default useCustomerWishlist;
