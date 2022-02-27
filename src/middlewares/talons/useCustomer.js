import Customer from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';

const useCustomer = () => {
  const CustomerList = async () => await Customer.find();

  const CreateCustomer = async ({ data }) => {
    const id = uuidV4();
    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };

  return { CreateCustomer, CustomerList };
};

export { useCustomer };
