import { gql } from 'graphql-request';

export const SENT_FORGOT_EMAIL_MUTATION = gql`
  mutation sendForgotEmail($email: String!, $firstname: String!, $lastname: String!) {
    sendForgotEmail(data: { email: $email, firstname: $firstname, lastname: $lastname }) {
      sent
    }
  }
`;
