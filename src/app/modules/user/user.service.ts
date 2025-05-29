import { userModel } from './user.model';

const getSingleUserFromDB = async (id: string) => {
  const result = await userModel.findById(id).lean();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await userModel.find({}).lean();
  return result;
};

export const UserService = {
  getSingleUserFromDB,
  getAllUsersFromDB,
};
