import Customer from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';

const useCustomer = () => {
  const CustomerList = async () => await Customer.find();

  const CustomerById = async ({ data }) => ({
    customer: await Customer.findOne({ id: data.id }).exec(),
  });

  const CreateCustomer = async ({ data }) => {
    const id = uuidV4();
    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };

  return { CustomerList, CustomerById, CreateCustomer };
};

export { useCustomer };
