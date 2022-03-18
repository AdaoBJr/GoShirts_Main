import { v4 as uuidV4 } from 'uuid';

import { ProductRepository } from '../../../repositories/mongodb/models/products';
import ApiError, { productExists } from '../../errors';
import { checkProductExists, generateRefreshToken } from '../../utils';

const useProduct = () => {
  const ProductList = async () => await ProductRepository.find();

  const CreateProduct = async ({ args: { token, data } }) => {
    const product = await checkProductExists({ sku: data.sku });
    if (product) ApiError(productExists);

    const id = uuidV4();
    Object.assign(data, { id });

    return {
      token: generateRefreshToken({ token }),
      products: await ProductRepository.create(data),
    };
  };

  return { ProductList, CreateProduct };
};

export default useProduct;
