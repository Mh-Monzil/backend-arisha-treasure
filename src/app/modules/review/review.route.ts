import { Router } from 'express';
import { verifyRole } from '../../middlewares/VerifyRole';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { ReviewValidations } from './review.validation';
import { ReviewController } from './review.controller';

const router = Router();

//create
router.post(
  '/create',
  verifyRole('user', 'moderator', 'admin'),
  ValidateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview,
);

router.get(
  '/:productId',
  verifyRole('user', 'moderator', 'admin'),
  ReviewController.getReviewsByProductId,
);

router.patch(
  '/:id',
  verifyRole('user', 'moderator', 'admin'),
  ValidateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewController.updateReview,
);

router.delete(
  '/:id',
  verifyRole('user', 'moderator', 'admin'),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
