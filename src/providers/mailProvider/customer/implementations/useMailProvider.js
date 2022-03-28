import requestAPIGateway from '../../../../magicPlace/utils/requestAPIGateway';
import {
  SEND_EMAIL_FORGOT_PASSWORD_MUTATION,
  SEND_EMAIL_WELCOME_NEWSLETTER_MUTATION,
} from '../gql/Customer.gql';

const useMailProvider = () => {
  const SendForgotMail = async ({ userData }) => {
    const { token, email, firstname, lastname } = userData;
    const variables = {
      email,
      firstname,
      lastname,
    };

    const query = SEND_EMAIL_FORGOT_PASSWORD_MUTATION;
    const data = { variables, query, token };
    const response = await requestAPIGateway({ data });

    return { requested: !!response };
  };

  const SendEmailWelcomeNewsletter = async ({ email }) => {
    const variables = { email };

    const query = SEND_EMAIL_WELCOME_NEWSLETTER_MUTATION;
    const data = { variables, query, token: null };

    return await requestAPIGateway({ data });
  };

  return { SendForgotMail, SendEmailWelcomeNewsletter };
};

export default useMailProvider;
