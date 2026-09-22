import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetCurrentOrder, selectCurrentOrder } from '../features/order/OrderSlice';
import { selectUserInfo } from '../features/user/UserSlice';
import { orderSuccessAnimation } from '../assets';
import Lottie from 'lottie-react';


export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  const userDetails = useSelector(selectUserInfo);
  const { id } = useParams();

  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-md flex flex-col items-center gap-6 max-w-md w-full">
        {/* Animation */}
        <div className="w-40 h-28">
          <Lottie animationData={orderSuccessAnimation} />
        </div>

        {/* Order Confirmation Text */}
        <div className="text-center space-y-2">
          <h6 className="text-lg font-normal">Hey {userDetails?.name}</h6>
          <h5 className="text-xl font-semibold">
            Your Order #{currentOrder?._id} is confirmed
          </h5>
          <p className="text-sm text-gray-500">Thank you for shopping with us ❤️</p>
        </div>

        {/* Button */}
        <Link
          to="/orders"
          onClick={() => dispatch(resetCurrentOrder())}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
        >
          Check order status in my orders
        </Link>
      </div>
    </div>
  );
};
