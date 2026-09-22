










import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductUpdateStatus,
  selectProductUpdateStatus,
  selectSelectedProduct,
  updateProductByIdAsync,
} from '../../products/ProductSlice';
import { useForm } from 'react-hook-form';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const ProductUpdate = () => {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productUpdateStatus = useSelector(selectProductUpdateStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (productUpdateStatus === 'fulfilled') {
      toast.success('Product Updated');
      navigate('/admin/dashboard');
    } else if (productUpdateStatus === 'rejected') {
      toast.error('Error updating product, please try again later');
    }
  }, [productUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductUpdateStatus());
    };
  }, []);

  const handleProductUpdate = (data) => {
    const productUpdate = {
      ...data,
      _id: selectedProduct._id,
      images: [data?.image0, data?.image1, data?.image2, data?.image3],
    };
    delete productUpdate?.image0;
    delete productUpdate?.image1;
    delete productUpdate?.image2;
    delete productUpdate?.image3;

    dispatch(updateProductByIdAsync(productUpdate));
  };

  return (
    <div className="flex justify-center items-center p-4">
      {selectedProduct && (
        <form
          className="w-full max-w-4xl space-y-6 bg-white p-6 rounded-md shadow-md"
          onSubmit={handleSubmit(handleProductUpdate)}
        >
          {/* Title */}
          <div>
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selectedProduct.title}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Brand and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2">Brand</label>
              <select
                defaultValue={selectedProduct.brand._id}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('brand', { required: 'Brand is required' })}
              >
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Category</label>
              <select
                defaultValue={selectedProduct.category._id}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register('category', { required: 'Category is required' })}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              defaultValue={selectedProduct.description}
              {...register('description', { required: 'Description is required' })}
            ></textarea>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-2">Price</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={selectedProduct.price}
                {...register('price', { required: 'Price is required' })}
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Discount (%)</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={selectedProduct.discountPercentage}
                {...register('discountPercentage', { required: 'Discount is required' })}
              />
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-lg font-medium mb-2">Stock Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selectedProduct.stockQuantity}
              {...register('stockQuantity', { required: 'Stock Quantity is required' })}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-lg font-medium mb-2">Thumbnail</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selectedProduct.thumbnail}
              {...register('thumbnail', { required: 'Thumbnail is required' })}
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-lg font-medium mb-2">Product Images</label>
            <div className="space-y-2">
              {selectedProduct.images.map((image, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={image}
                  {...register(`image${index}`, { required: 'Image is required' })}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <Link
              to="/admin/dashboard"
              className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
