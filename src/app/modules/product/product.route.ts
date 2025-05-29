import { Router } from 'express';
import { verifyRole } from '../../middlewares/VerifyRole';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/',
  verifyRole('user', 'moderator', 'admin'),
  ValidateRequest(ProductValidation.createProductSchema),
  ProductController.getAllProducts,
);
router.get(
  '/:id',
  verifyRole('user', 'moderator', 'admin'),
  ProductController.getAllProducts,
);
router.get(
  '/',
  verifyRole('user', 'moderator', 'admin'),
  ProductController.getAllProducts,
);
