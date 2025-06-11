import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    sales: { type: Number, default: 0 },
    discount: { type: Number, required: true },
    rating: { type: Number, default: 0 }, // average rating (e.g. 4.5)
    ratingCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const productModel = model<IProduct>('Product', productSchema);
