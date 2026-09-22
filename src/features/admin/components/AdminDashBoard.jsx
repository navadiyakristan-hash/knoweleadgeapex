//C:\Users\jemis\mernshop\mern-shop\src\features\admin\components\AdminDashBoard.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsAsync,
  deleteProductByIdAsync,
  undeleteProductByIdAsync,
  toggleFilters,
  selectProducts,
  selectProductTotalResults,
  selectProductIsFilterOpen,
} from '../../products/ProductSlice';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard } from '../../products/components/ProductCard';
import { ITEMS_PER_PAGE } from '../../../constants';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


export const AdminDashBoard = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);



  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();



  const navigate = useNavigate();






  useEffect(() => {
    const filtersFromQuery = query.get('filters') ? JSON.parse(query.get('filters')) : {};
    const sortFromQuery = query.get('sort');
    const pageFromQuery = query.get('page') ? Number(query.get('page')) : 1;
  
    setFilters((prev) => (JSON.stringify(prev) !== JSON.stringify(filtersFromQuery) ? filtersFromQuery : prev));
    setSort((prev) => (prev !== sortFromQuery ? sortFromQuery : prev));
    setPage((prev) => (prev !== pageFromQuery ? pageFromQuery : prev));
  }, [query]);
  
  
  useEffect(() => {
    const finalFilters = {
      ...filters,
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort,
    };
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, sort, page, dispatch]);


  useEffect(() => {
    dispatch(fetchProductsAsync({ ...filters, pagination: { page, limit: ITEMS_PER_PAGE }, sort }));
  }, [filters, sort, page, dispatch]);
  
 const updateQueryParams = () => {
  const queryParams = new URLSearchParams();
  if (filters.brand) queryParams.set("filters", JSON.stringify(filters));
  if (sort) queryParams.set("sort", sort);
  queryParams.set("page", page);
  navigate(`?${queryParams.toString()}`);
};

useEffect(() => {
  updateQueryParams();
}, [filters, sort, page]);
  

  // useEffect(() => {
  //   const filtersFromQuery = query.get('filters') ? JSON.parse(query.get('filters')) : {};
  //   const sortFromQuery = query.get('sort');
  //   const pageFromQuery = query.get('page') ? Number(query.get('page')) : 1;

  //   setFilters(filtersFromQuery);
  //   setSort(sortFromQuery);
  //   setPage(pageFromQuery);
  // }, [query]);

  // useEffect(() => {
  //   const finalFilters = {
  //     ...filters,
  //     pagination: { page: page, limit: ITEMS_PER_PAGE },
  //     sort,
  //   };
  //   dispatch(fetchProductsAsync(finalFilters));
  // }, [filters, sort, page, dispatch]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProductByIdAsync(productId));
  };

  const handleProductUnDelete = (productId) => {
    dispatch(undeleteProductByIdAsync(productId));
  };

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  return (
    <div className="p-4">
      {/* Filter Sidebar */}
      <div
        className={`fixed bg-white h-full w-80 p-4 shadow-lg ${
          isProductFilterOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={handleFilterClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        
       
        {/* Brand Filters */}
        <div>
          <h3 className="font-semibold mb-2">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand._id} className="flex items-center space-x-2">
                <input className=' '
                  type="checkbox"
                  value={brand._id}
                  onChange={(e) => {
                    setFilters((prev) => {
                      const updatedBrands = new Set(prev.brand || []);
                      e.target.checked ? updatedBrands.add(e.target.value) : updatedBrands.delete(e.target.value);
                      return { ...prev, brand: Array.from(updatedBrands) };
                    });
                  }}
                  
                />
                <span>{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      

        {/* Category Filters */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category._id}
                  onChange={(e) => {
                    setFilters((prev) => {
                      const updatedCategories = new Set(prev.category || []);
                      e.target.checked ? updatedCategories.add(e.target.value) : updatedCategories.delete(e.target.value);
                      return { ...prev, category: Array.from(updatedCategories) };
                    });
                  }}

                />
                <span>{category.name}</span>    
               
                <span>Catagary</span>
              </label>
            ))}
          </div>
        </div>
      </div>
  
      <div className='flex '>
          <button className='border bg-green-300  m-4 p-4' ><Link to='/'>Passing to user Route</Link></button>
          
        </div>
      {/* Main Content */}
      <div className="ml-0 lg:ml-80 space-y-8">
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className={`${product.isDeleted ? 'opacity-50' : ''}`}>
              <ProductCard
                id={product._id}
                title={product.title}
                thumbnail={product.thumbnail}
                brand={product.brand?.name || 'Unknown'}
                price={product.price}
              />
              <div className="flex space-x-4 mt-2">
                <Link
                  to={`/admin/product-update/${product._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                {product.isDeleted ? (
                  <button
                    onClick={() => handleProductUnDelete(product._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
