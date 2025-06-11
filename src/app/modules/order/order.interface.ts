import { Document, Types } from 'mongoose';

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  orderId?: string;
  user?: Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  discount: number;
  status?: 'pending' | 'processing' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
  };
  orderItems: IOrderItem[];
  paymentMethod: 'cash on delivery';
  isDeleted?: boolean;
}
