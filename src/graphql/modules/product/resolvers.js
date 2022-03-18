import { useProduct } from '../../../magicPlace/talons/product';

const { ProductList, PriceRange, CreateProduct } = useProduct();

export default {
  Product: {
    priceRange: (parent) => PriceRange({ parent }),
  },
  Query: {
    productList: async () => await ProductList(),
  },
  Mutation: {
    createProduct: async (_, args) => await CreateProduct({ args }),
  },
};
