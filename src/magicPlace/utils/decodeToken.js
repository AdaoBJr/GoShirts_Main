import { verify } from 'jsonwebtoken';
const { JWT_SECRET_TOKEN } = process.env;

const decodeToken = ({ token }) => verify(token, JWT_SECRET_TOKEN);

export default decodeToken;
