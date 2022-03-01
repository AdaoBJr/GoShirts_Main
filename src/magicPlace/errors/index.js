export const emailExists = { code: 409, msg: 'Email already registered' };
export const emailOrPwdIncorrect = { code: 401, msg: 'Email or password incorrect!' };
export const tokenIsMissing = { code: 401, msg: 'Token is missing.' };
export const tokenInvalidOrUnath = {
  code: 401,
  msg: 'Invalid token or unauthorized user.',
};

export { default } from './ApiError';
