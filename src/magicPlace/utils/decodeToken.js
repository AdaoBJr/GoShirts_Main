import { verify } from 'jsonwebtoken';
import ApiError, { expiredSession } from '../errors';
const { JWT_SECRET } = process.env;

const decodeToken = ({ token }) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    ApiError(expiredSession);
  }
};

export default decodeToken;
