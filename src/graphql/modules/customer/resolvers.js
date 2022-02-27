import { useCustomer } from '../../../middlewares/talons/useCustomer';
const { CustomerList, CustomerById, CreateCustomer } = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customerById: async (_, { data }) => await CustomerById({ data }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
  },
};
