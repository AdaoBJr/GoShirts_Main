import { ProductRepository } from '../../repositories/mongodb/models/products';

const checkProductExistsBySku = async ({ sku }) =>
  await ProductRepository.findOne({ sku }).exec();

export default checkProductExistsBySku;
