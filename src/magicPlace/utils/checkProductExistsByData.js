import { ProductRepository } from '../../repositories/mongodb/models/products';
import { productDoesNotExists as error } from '../errors';

const checkProductExistsByData = async ({ data }) => {
  const checked = await Promise.all(
    data.map(async ({ sku, quantity }) => ({
      sku,
      quantity,
      error: !(await ProductRepository.findOne({ sku }).exec()) && error.msg,
    }))
  );
  for (const i in checked) if (checked[i].error !== error.msg) delete checked[i].error;
  return checked;
};

export default checkProductExistsByData;
