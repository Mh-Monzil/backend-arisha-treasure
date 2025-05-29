import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { userModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (user: TUser) => {
  const { email } = user;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    throw new AppError(400, 'User already exist');
  }

  const result = await userModel.create(user);
  return result;
};

const loginUserIntoDB = async (user: Partial<TUser>) => {
  const { email, password } = user;

  const isUserExist = await userModel.findOne({ email });
  if (!isUserExist) {
    throw new AppError(400, 'User does not exist');
  }

  const isMatch = await bcrypt.compare(password!, isUserExist.password);
  if (!isMatch) {
    throw new AppError(400, 'Something went wrong');
  }

  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const secret: string = config.jwt_secret!;

  const token = jwt.sign(jwtPayload, secret, {
    expiresIn: '365d',
  });

  return token;
};

export const AuthService = {
  createUserIntoDB,
  loginUserIntoDB,
};
