import ApiError, { productExists } from '../../errors';
import { checkProductExistsByData, generateRefreshToken } from '../../utils';

const useCustomerWishlist = () => {
  const AddProductsToWishlist = async ({ args: { id, token, data } }) => {
    const checkedProducts = await checkProductExistsByData({ data });
    console.log('CHECKED', checkedProducts);
    // if (!product) ApiError(productExists);
    return { token: generateRefreshToken({ token }), wishlist: data };
  };

  return { AddProductsToWishlist };
};

export default useCustomerWishlist;
