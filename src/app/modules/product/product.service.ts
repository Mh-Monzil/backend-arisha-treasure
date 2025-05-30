import { IProduct } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await productModel.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await productModel.find({}).lean();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await productModel.findById(id).lean();
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await productModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
};
