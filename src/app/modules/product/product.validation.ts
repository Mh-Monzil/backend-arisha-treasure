import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be positive'),
    image: z
      .array(z.string().url({ message: 'Each image must be a valid URL' }))
      .nonempty('At least one image is required'),
    category: z.string().min(1, 'Category is required'),
    stock: z.number().int().nonnegative('Stock must be 0 or more'),
    discount: z.number().min(0).max(100).optional().default(0),
  }),
});

const updateProductZodSchema = createProductZodSchema.partial();

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
