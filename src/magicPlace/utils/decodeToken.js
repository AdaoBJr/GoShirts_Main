import { verify } from 'jsonwebtoken';
import ApiError, { expiredSession } from '../errors';
const { JWT_SECRET } = process.env;

const decodeToken = ({ token, genNewToken }) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    if (!genNewToken) ApiError(expiredSession);
    if (genNewToken) return { expired: true };
  }
};

export default decodeToken;
