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

const getProductByCategoryFromDB = async (category: string) => {
  const result = await productModel.find({ category }).lean();
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await productModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await productModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  getProductByCategoryFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
