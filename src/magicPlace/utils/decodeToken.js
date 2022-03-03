import { verify } from 'jsonwebtoken';
import ApiError, { expiredSession } from '../errors';
const { JWT_SECRET_TOKEN } = process.env;

const decodeToken = ({ token }) => {
  try {
    return verify(token, JWT_SECRET_TOKEN);
  } catch (error) {
    ApiError(expiredSession);
  }
};

export default decodeToken;
