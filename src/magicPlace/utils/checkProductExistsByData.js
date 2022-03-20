import { CustomerWishlistRepository } from '../../repositories/mongodb/models/customer';
import { ProductRepository } from '../../repositories/mongodb/models/products';
import { productDoesNotExists as error } from '../errors';

const checkProductExistsByData = async ({ userId, data, decrease }) => {
  const wishChecked = await Promise.all(
    data.map(async ({ sku, quantity }) => {
      const prodRepo = await ProductRepository.findOne({ sku }).exec();
      const wishRepo = decrease
        ? await CustomerWishlistRepository.findOne({ userId }).exec()
        : !decrease;
      const prodInWish = wishRepo && wishRepo.wishlist.find((item) => item.sku === sku);

      return {
        sku,
        quantity,
        error: (!prodRepo || !prodInWish) && error.msg,
      };
    })
  );
  for (const i in wishChecked)
    if (wishChecked[i].error !== error.msg) delete wishChecked[i].error;
  const wishData = wishChecked.filter((item) => !item.error);

  return { wishChecked, wishData };
};

export default checkProductExistsByData;
