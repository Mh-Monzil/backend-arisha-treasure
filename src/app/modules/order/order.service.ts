import QueryBuilder from '../../builder/QueryBuilder';
import { orderSearchableFields } from './order.constants';
import { IOrder } from './order.interface';
import { orderModel } from './order.model';

const createOrderIntoDB = async (payload: IOrder) => {
  const result = new orderModel(payload);
  await result.save();
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    orderModel
      .find({ isDeleted: false })
      .populate('user', '-password -__v')
      .populate('orderItems', '-__v'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery.lean();
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await orderModel.findById(id).lean();
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const result = await orderModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await orderModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
