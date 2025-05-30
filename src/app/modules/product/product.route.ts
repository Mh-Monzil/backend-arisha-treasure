import { Router } from 'express';
import { verifyRole } from '../../middlewares/VerifyRole';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router = Router();

router.post(
  '/create',
  verifyRole('user', 'moderator', 'admin'),
  ValidateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);
router.get(
  '/:id',
  verifyRole('user', 'moderator', 'admin'),
  ProductController.getSingleProduct,
);
router.get(
  '/',
  verifyRole('user', 'moderator', 'admin'),
  ProductController.getAllProducts,
);
router.patch(
  '/:id',
  verifyRole('moderator', 'admin'),
  ValidateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct,
);

export const ProductRoutes = router;
