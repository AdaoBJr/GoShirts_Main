import { ProductRepository } from '../../repositories/mongodb/models/products';
import { productDoesNotExists } from '../errors';

const checkProductExistsByData = ({ data }) => {
  const productsResult = data.map(({ sku }) => {
    const product = ProductRepository.findOne({ sku }).exec();
    const result = {
      sku,
      msgError: !product ? productDoesNotExists : false,
    };
    console.log('CHECK_PRODUCT', result);
    return result;
  });
  // const productsResult = [];
  console.log('CHECK_RESULT', productsResult);
  return productsResult;
};

export default checkProductExistsByData;
