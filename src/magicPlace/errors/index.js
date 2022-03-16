export const emailExists = { code: 409, msg: 'Email already registered' };
export const userAlreadyRemoved = { code: 409, msg: 'User already removed' };
export const emailOrPwdIncorrect = { code: 401, msg: 'Email or password incorrect!' };
export const tokenIsMissing = { code: 401, msg: 'Token is missing.' };
export const tokenInvalidOrUnath = {
  code: 401,
  msg: 'Invalid token or unauthorized user.',
};
export const expiredSession = { code: 401, msg: 'Expired session.' };
export const userDoesNotExist = { code: 401, msg: 'User does not exists.' };

export { default } from './ApiError';
