import { model, Schema } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

export const categoryModel = model<ICategory>('Category', categorySchema);
