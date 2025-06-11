import { model, Schema } from 'mongoose';
import { IReview } from './review.interface';
import { productModel } from '../product/product.model';

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.post('save', async function (doc) {
  const productId = doc.product;
  const reviews = await reviewModel.find({ product: productId });

  const ratingCount = reviews.length;
  const ratingSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const rating = ratingSum / ratingCount;

  await productModel.findByIdAndUpdate(productId, { rating, ratingCount });
});

export const reviewModel = model<IReview>('Review', reviewSchema);
