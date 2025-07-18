import { Router } from 'express';
import { verifyRole } from '../../middlewares/VerifyRole';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import upload from '../../middlewares/multer';

const router = Router();

router.post(
  '/create',
  verifyRole('user', 'moderator', 'admin'),
  upload.array('images'),
  ValidateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);

//get
router.get(
  '/:id',
  verifyRole('user', 'moderator', 'admin'),
  ProductController.getSingleProduct,
);
router.get('/', ProductController.getAllProducts);

//update
router.patch(
  '/:id',
  verifyRole('moderator', 'admin'),
  ValidateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct,
);

//delete
router.delete('/:id', verifyRole('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;
