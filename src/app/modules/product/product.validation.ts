import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.preprocess((val) => Number(val), z.number().nonnegative()),
    stock: z.preprocess((val) => Number(val), z.number().int().nonnegative()),
    discount: z.preprocess((val) => Number(val), z.number().min(0).max(100)),
    category: z.string().min(1, 'Category is required'),
  }),
});

const updateProductZodSchema = createProductZodSchema.partial();

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
