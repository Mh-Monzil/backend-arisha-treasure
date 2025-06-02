import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const counterModel = model('Counter', counterSchema);

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'cancelled'],
      default: 'pending',
      required: [true, 'Order status is required'],
    },
    shippingAddress: {
      street: {
        type: String,
        required: [true, 'Shipping street is required'],
      },
      city: {
        type: String,
        required: [true, 'Shipping city is required'],
      },
      state: {
        type: String,
      },
      country: {
        type: String,
        required: [true, 'Shipping country is required'],
      },
      zipCode: {
        type: String,
      },
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Order must include at least one item'],
      },
    ],
    paymentMethod: {
      type: String,
      enum: ['cash on delivery'],
      required: [true, 'Payment method is required'],
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

orderSchema.pre('save', async function (next) {
  const counter = await counterModel.findOneAndUpdate(
    { name: 'orderId' },
    { $inc: { count: 1 } },
    { upsert: true, new: true },
  );
  this.orderId = counter.count.toString().padStart(5, '0');
  next();
});

export const orderModel = model<IOrder>('Order', orderSchema);
