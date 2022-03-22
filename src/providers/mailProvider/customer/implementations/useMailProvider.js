import requestAPIGateway from '../../../../magicPlace/utils/requestAPIGateway';
import { SENT_FORGOT_EMAIL_MUTATION } from '../gql/Customer.gql';

const useMailProvider = () => {
  const SendForgotMail = async ({ userData }) => {
    const { token, email, firstname, lastname } = userData;
    const variables = {
      email,
      firstname,
      lastname,
    };

    const query = SENT_FORGOT_EMAIL_MUTATION;
    const data = { variables, query, token };
    const response = await requestAPIGateway({ data });

    return { requested: !!response };
  };

  return { SendForgotMail };
};

export default useMailProvider;
