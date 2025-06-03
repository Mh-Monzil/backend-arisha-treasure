import { ICategory } from './category.interface';
import { categoryModel } from './category.model';

const createCategoryIntoDB = async (category: ICategory) => {
  const result = await categoryModel.create(category);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await categoryModel.find({}).lean();
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
