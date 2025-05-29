import { ICategory } from './category.interface';
import { categoryModel } from './category.model';

const createCategoryIntoDB = async (category: ICategory) => {
  const result = await categoryModel.create(category);
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
};
