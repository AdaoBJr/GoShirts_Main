import requestAPIGateway from '../../../../magicPlace/utils/requestAPIGateway';
import {
  SEND_CHANGE_EMAIL_MUTATION,
  SEND_EMAIL_FORGOT_PASSWORD_MUTATION,
  SEND_EMAIL_WELCOME_NEWSLETTER_MUTATION,
} from '../gql/Customer.gql';

const useMailProvider = () => {
  const SendMailForgotPwd = async ({ userData }) => {
    const { token, email, firstname } = userData;
    const variables = {
      email,
      firstname,
    };

    const query = SEND_EMAIL_FORGOT_PASSWORD_MUTATION;
    const data = { variables, query, token };

    return await requestAPIGateway({ data });
  };

  const SendChangeEmail = async ({ userData }) => {
    const { token, email, firstname } = userData;
    const variables = {
      email,
      firstname,
    };

    const query = SEND_CHANGE_EMAIL_MUTATION;
    const data = { variables, query, token };

    return await requestAPIGateway({ data });
  };

  const SendEmailWelcomeNewsletter = async ({ email }) => {
    const variables = { email };

    const query = SEND_EMAIL_WELCOME_NEWSLETTER_MUTATION;
    const data = { variables, query, token: null };

    return await requestAPIGateway({ data });
  };

  return { SendMailForgotPwd, SendChangeEmail, SendEmailWelcomeNewsletter };
};

export default useMailProvider;
