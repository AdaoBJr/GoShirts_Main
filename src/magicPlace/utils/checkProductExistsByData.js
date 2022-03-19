import { ProductRepository } from '../../repositories/mongodb/models/products';
import { productDoesNotExists as error } from '../errors';

const checkProductExistsByData = async ({ data }) => {
  const wishChecked = await Promise.all(
    data.map(async ({ sku, quantity }) => ({
      sku,
      quantity,
      error: !(await ProductRepository.findOne({ sku }).exec()) && error.msg,
    }))
  );
  for (const i in wishChecked)
    if (wishChecked[i].error !== error.msg) delete wishChecked[i].error;
  const wishData = wishChecked.filter((item) => !item.error);

  return { wishChecked, wishData };
};

export default checkProductExistsByData;
