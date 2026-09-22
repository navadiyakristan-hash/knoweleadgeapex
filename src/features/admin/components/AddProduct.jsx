import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
} from '../../products/ProductSlice';
import { useForm } from 'react-hook-form';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (productAddStatus === 'fulfilled') {
      reset();
      toast.success('New product added');
      navigate('/admin/dashboard');
    } else if (productAddStatus === 'rejected') {
      toast.error('Error adding product, please try again later');
    }
  }, [productAddStatus, reset, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, [dispatch]);

  const handleAddProduct = (data) => {
    const newProduct = {
      ...data,
      images: [data.image0, data.image1, data.image2, data.image3],
    };
    delete newProduct.image0;
    delete newProduct.image1;
    delete newProduct.image2;
    delete newProduct.image3;

    dispatch(addProductAsync(newProduct));
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-2">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Brand and Category */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Brand</label>
            <select
              {...register('brand', { required: 'Brand is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Category</label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-2">Description</label>
          <textarea
            rows="4"
            {...register('description', { required: 'Description is required' })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Price and Discount */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Discount Percentage</label>
            <input
              type="number"
              {...register('discountPercentage', { required: 'Discount percentage is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.discountPercentage && (
              <p className="text-red-500 text-sm mt-1">{errors.discountPercentage.message}</p>
            )}
          </div>
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-gray-600 mb-2">Stock Quantity</label>
          <input
            type="number"
            {...register('stockQuantity', { required: 'Stock quantity is required' })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-gray-600 mb-2">Thumbnail</label>
          <input
            type="text"
            {...register('thumbnail', { required: 'Thumbnail is required' })}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-gray-600 mb-2">Product Images</label>
          <div className="space-y-2">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                {...register(`image${index}`, { required: 'Image is required' })}
                placeholder={`Image ${index + 1}`}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Product
          </button>
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
