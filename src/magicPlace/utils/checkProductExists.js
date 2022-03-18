import { ProductRepository } from '../../repositories/mongodb/models/products';

const checkProductExists = async ({ sku }) =>
  await ProductRepository.findOne({ sku }).exec();

export default checkProductExists;
