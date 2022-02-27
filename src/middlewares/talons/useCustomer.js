import Customer from '../../repositories/mongodb/models/customer';
import { v4 as uuidV4 } from 'uuid';

const useCustomer = () => {
  const CustomerList = async () => await Customer.find();

  const CustomerById = async ({ id }) => ({
    customer: await Customer.findOne({ id }).exec(),
  });

  const UpdateCustomerById = async ({ id, data }) => ({
    customer: await Customer.findOneAndUpdate(id, data, { new: true }),
  });

  const DeleteCustomerById = async ({ id }) => ({
    delete: !!(await Customer.findOneAndDelete(id)),
  });

  const CreateCustomer = async ({ data }) => {
    const id = uuidV4();
    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };

  return {
    CustomerList,
    CustomerById,
    UpdateCustomerById,
    DeleteCustomerById,
    CreateCustomer,
  };
};

export { useCustomer };
