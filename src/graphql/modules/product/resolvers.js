import { useProduct } from '../../../magicPlace/talons/product';

const { ProductList, CreateProduct } = useProduct();

export default {
  Product: {
    priceRange: async (parent) => {
      const { maxPrice, minPrice, currency } = parent;
      const priceRange = {
        minPrice: {
          value: minPrice,
          currency,
        },
        maxPrice: {
          value: maxPrice,
          currency,
        },
      };
      return priceRange;
    },
  },
  Query: {
    productList: async () => await ProductList(),
  },
  Mutation: {
    createProduct: async (_, args) => await CreateProduct({ args }),
  },
};
