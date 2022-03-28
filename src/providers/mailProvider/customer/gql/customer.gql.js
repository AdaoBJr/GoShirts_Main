import { gql } from 'graphql-request';

export const SEND_EMAIL_FORGOT_PASSWORD_MUTATION = gql`
  mutation sendForgotEmail($email: String!, $firstname: String!, $lastname: String!) {
    sendForgotEmail(data: { email: $email, firstname: $firstname, lastname: $lastname }) {
      sent
    }
  }
`;

export const SEND_EMAIL_WELCOME_NEWSLETTER_MUTATION = gql`
  mutation sendEmailWelcomeNewsletter($email: String!) {
    sendEmailWelcomeNewsletter(email: $email) {
      subscribed
    }
  }
`;
