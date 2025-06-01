import cloudinary from '../../config/cloudinary';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { MulterRequest } from './product.interface';
import { ProductService } from './product.service';
import fs from 'fs';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);
  try {
    const { title, description, price, category, stock, discount } = req.body;
    const files = (req as MulterRequest).files;

    const imgUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imgUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    const payload = {
      title,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      discount: Number(discount),
      images: imgUrls,
    };

    const result = await ProductService.createProductIntoDB(payload);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    throw new AppError(400, 'Something went wrong');
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProductIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProductFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
