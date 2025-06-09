import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDB(req.body);

  res.cookie('token', result, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
