import { ProductRepository } from '../../repositories/mongodb/models/products';
import { productDoesNotExists as error } from '../errors';

const checkProductExistsByData = async ({ data }) => {
  const checked = await Promise.all(
    data.map(async ({ sku, quantity }) => ({
      sku,
      quantity,
      fail: !(await ProductRepository.findOne({ sku }).exec()) && error.msg,
    }))
  );
  for (const i in checked) if (checked[i].fail !== error.msg) delete checked[i].fail;
  return checked;
};

export default checkProductExistsByData;
