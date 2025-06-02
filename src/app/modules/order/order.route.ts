import { Router } from 'express';
import { verifyRole } from '../../middlewares/VerifyRole';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';

const router = Router();

router.post(
  '/create',
  verifyRole('user', 'moderator', 'admin'),
  ValidateRequest(OrderValidations.createOrderZodSchema),
  OrderController.createOrder,
);

router.get(
  '/:id',
  verifyRole('moderator', 'admin'),
  OrderController.getSingleOrder,
);
router.get('/', verifyRole('moderator', 'admin'), OrderController.getAllOrders);

router.patch(
  '/:id',
  verifyRole('moderator', 'admin'),
  ValidateRequest(OrderValidations.updateOrderZodSchema),
  OrderController.updateOrder,
);

router.delete(
  '/:id',
  verifyRole('moderator', 'admin'),
  OrderController.deleteOrder,
);

export const OrderRoutes = router;
