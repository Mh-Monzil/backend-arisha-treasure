import { z } from 'zod';
import { Types } from 'mongoose';

const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
});

const createOrderZodSchema = z.object({
  body: z.object({
    user: z
      .string()
      .optional()
      .refine((val) => Types.ObjectId.isValid(val!), {
        message: 'Invalid user ObjectId',
      }),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(5, 'Phone number is required'),
    totalPrice: z
      .number()
      .nonnegative('Total price must be a non-negative number'),
    discount: z.number().nonnegative('Discount must be a non-negative number'),
    status: z.enum(['pending', 'processing', 'delivered', 'cancelled']),
    shippingAddress: z.object({
      street: z.string().min(1, 'Street is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().optional(),
      country: z.string().min(1, 'Country is required'),
      zipCode: z.string().optional(),
    }),
    orderItems: z
      .array(orderItemSchema)
      .min(1, 'At least one order item is required'),
    paymentMethod: z.literal('cash on delivery'),
    isDeleted: z.boolean().optional(),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    totalPrice: z.number().optional(),
    discount: z.number().optional(),
    status: z
      .enum(['pending', 'processing', 'delivered', 'cancelled'])
      .optional(),
    shippingAddress: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        zipCode: z.string().optional(),
      })
      .optional(),
    orderItems: z.array(orderItemSchema.optional()).optional(),
    paymentMethod: z.literal('cash on delivery').optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const OrderValidations = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
