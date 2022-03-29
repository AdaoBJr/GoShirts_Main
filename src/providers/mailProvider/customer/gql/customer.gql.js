import { gql } from 'graphql-request';

export const SEND_EMAIL_FORGOT_PASSWORD_MUTATION = gql`
  mutation sendMailForgotPwd($email: String!, $firstname: String!) {
    sendMailForgotPwd(data: { email: $email, firstname: $firstname }) {
      requested
    }
  }
`;

export const SEND_CHANGE_EMAIL_MUTATION = gql`
  mutation sendChangeMail($email: String!, $firstname: String!) {
    sendChangeMail(data: { email: $email, firstname: $firstname }) {
      requested
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
