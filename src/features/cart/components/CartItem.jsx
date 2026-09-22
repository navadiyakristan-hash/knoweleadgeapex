import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from '../CartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const CartItem = ({
  id,
  thumbnail,
  title,
  brand,
  price,
  quantity,
  stockQuantity,
  productId,
}) => {
  const dispatch = useDispatch();
  const totalPrice = price * quantity;

  const handleAddQty = () => {
    if (quantity < stockQuantity) {
      dispatch(updateCartItemByIdAsync({ _id: id, quantity: quantity + 1 }));
    }
  };

  const handleRemoveQty = () => {
    if (quantity === 1) {
      dispatch(deleteCartItemByIdAsync(id));
    } else {
      dispatch(updateCartItemByIdAsync({ _id: id, quantity: quantity - 1 }));
    }
  };

  const handleProductRemove = () => {
    dispatch(deleteCartItemByIdAsync(id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 bg-white p-4 rounded-2xl shadow-xl mb-4 items-center">
      <Link to={`/product-details/${productId}`} className="w-24 h-24 sm:w-32 sm:h-32">
        <img
          src={thumbnail}
          alt={`${title} image unavailable`}
          className="w-full h-full object-contain rounded-xl border"
        />
      </Link>

      <div className="space-y-2">
        <Link
          to={`/product-details/${productId}`}
          className="text-xl font-semibold hover:text-yellow-500 transition"
        >
          {title}
        </Link>
        <p className="text-gray-500 text-sm">{brand}</p>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleRemoveQty}
            className="p-2 border rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-[2rem] text-center font-medium">{quantity}</span>
          <button
            onClick={handleAddQty}
            disabled={quantity >= stockQuantity}
            className="p-2 border rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="text-base text-gray-500">Unit: Rs{price.toFixed(2)}</p>
        <p className="text-lg font-bold">Total: Rs  {totalPrice.toFixed(2)}</p>
        <button
          onClick={handleProductRemove}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  stockQuantity: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};
