import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchGroupedByPriceAsync,
  selectGroupedProducts,
  selectProductFetchStatus,
} from "../features/products/ProductSlice";

const PriceCategoryGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupedProducts = useSelector(selectGroupedProducts);
  const fetchStatus = useSelector(selectProductFetchStatus);

  useEffect(() => {
    dispatch(fetchGroupedByPriceAsync());
  }, [dispatch]);

  const handleSeeMore = (min, max) => {
    navigate(`/products?minPrice=${min}&maxPrice=${max}`);
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 font-serif">
        Shop by Price
      </h2>

      {fetchStatus === "pending" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 h-52 rounded-xl animate-pulse shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedProducts || {}).map(([maxPrice, group]) => {
            if (!group?.products?.length) return null;

            return (
              <div
                key={maxPrice}
                className=" rounded-xl border hover:border-blue-500 bg-orange-50 bg-opacity-25 p-4 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-700">{group.label}</h3>
                <div className="grid grid-cols-2 gap-2 mb-3 ">
                  {group.products.map((product) => (
                    <div key={product._id}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-fill h-28 w-full rounded-md border"
                      />
                      <p className="text-xs text-gray-500 truncate mt-1">{product.title}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleSeeMore(group.min, group.max)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  See more
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PriceCategoryGrid;
