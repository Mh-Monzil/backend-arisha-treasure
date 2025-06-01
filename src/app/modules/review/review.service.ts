import { IReview } from './review.interface';
import { reviewModel } from './review.model';

const createReviewIntoDB = async (payload: IReview) => {
  const result = await reviewModel.create(payload);
  return result;
};

const getReviewsByProductIdFromDB = async (productId: string) => {
  const result = await reviewModel
    .find({ product: productId, isDeleted: false })
    .lean();
  return result;
};

const updateReviewIntoDB = async (id: string, payload: Partial<IReview>) => {
  const result = await reviewModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteReviewFromDB = async (id: string) => {
  const result = await reviewModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const ReviewService = {
  createReviewIntoDB,
  getReviewsByProductIdFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};
