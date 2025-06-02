import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  orderId?: string;
  user?: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  discount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
  };
  orderItems: Types.ObjectId[];
  paymentMethod: 'cash on delivery';
  isDeleted?: boolean;
}
