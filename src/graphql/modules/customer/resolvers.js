import { useCustomer } from '../../../middlewares/talons/useCustomer';
const { CreateCustomer, CustomerList } = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
  },
  Mutation: {
    createCustomer: async (_, { data }) => CreateCustomer({ data }),
  },
};
