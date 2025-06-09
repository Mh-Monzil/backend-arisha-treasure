import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constants';
import { IProduct } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
  const result = await productModel.create(payload);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    productModel.find({ isDeleted: false }),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort();

  const result = await productQuery.modelQuery.lean();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await productModel.findById(id).lean();
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
  updateProductIntoDB,
  deleteProductFromDB,
};
