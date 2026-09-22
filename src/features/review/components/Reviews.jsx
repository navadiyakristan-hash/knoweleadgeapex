import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Icons for star rating
import {
  createReviewAsync,
  resetReviewAddStatus,
  resetReviewDeleteStatus,
  resetReviewUpdateStatus,
  selectReviews,
  selectReviewAddStatus,
  selectReviewDeleteStatus,
  selectReviewUpdateStatus,
  selectReviewStatus,
} from '../ReviewSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { ReviewItem } from './ReviewItem';

export const Reviews = ({ productId, averageRating }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const loggedInUser = useSelector(selectLoggedInUser);
  const reviewAddStatus = useSelector(selectReviewAddStatus);
  const reviewDeleteStatus = useSelector(selectReviewDeleteStatus);
  const reviewUpdateStatus = useSelector(selectReviewUpdateStatus);
  const reviewStatus = useSelector(selectReviewStatus);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (reviewAddStatus === 'fulfilled') {
      toast.success('Review added successfully');
      reset();
      setRating(1);
    } else if (reviewAddStatus === 'rejected') {
      toast.error('Error adding review, please try again later');
    }
  }, [reviewAddStatus, reset]);

  useEffect(() => {
    if (reviewDeleteStatus === 'fulfilled') {
      toast.success('Review deleted successfully');
    } else if (reviewDeleteStatus === 'rejected') {
      toast.error('Error deleting review, please try again later');
    }
  }, [reviewDeleteStatus]);

  useEffect(() => {
    if (reviewUpdateStatus === 'fulfilled') {
      toast.success('Review updated successfully');
    } else if (reviewUpdateStatus === 'rejected') {
      toast.error('Error updating review, please try again later');
    }
  }, [reviewUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetReviewAddStatus());
      dispatch(resetReviewDeleteStatus());
      dispatch(resetReviewUpdateStatus());
    };
  }, [dispatch]);

  const handleAddReview = (data) => {
    const review = { ...data, rating, user: loggedInUser._id, product: productId };
    dispatch(createReviewAsync(review));
    setWriteReview(false);
  };

  // Rating Summary Calculation
  const ratingCounts = reviews.reduce(
    (counts, review) => {
      counts[review.rating] = (counts[review.rating] || 0) + 1;
      return counts;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  return (
    <div className="mt-8 flex flex-wrap gap-6">
      {/* ⭐ Review Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{averageRating.toFixed(1)} ⭐</p>
              <p className="text-gray-500">Based on {reviews.length} review(s)</p>
            </div>
            {/* Star Ratings Summary */}
            {Object.keys(ratingCounts).reverse().map((star) => (
              <div key={star} className="flex items-center space-x-4">
                <p>{star} star</p>
                <div className="w-full bg-gray-200 rounded h-3">
                  <motion.div
                    className="bg-black h-3 rounded"
                    style={{ width: `${(ratingCounts[star] / reviews.length) * 100}%` }}
                    animate={{ scale: [0.8, 1] }}
                  ></motion.div>
                </div>
                <p>{((ratingCounts[star] / reviews.length) * 100).toFixed(0)}%</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            {loggedInUser?.isAdmin ? 'No reviews yet.' : 'Be the first to review!'}
          </p>
        )}
      </div>

      {/* 📝 User Reviews */}
      <div className="flex-1">
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem
              key={review._id}
              id={review._id}
              userid={review.user._id}
              comment={review.comment}
              createdAt={review.createdAt}
              rating={review.rating}
              username={review.user.name}
              verified={review.user.purchases?.includes(productId)} // Show Verified Badge
            />
          ))}
        </div>

        {/* ⭐ Add a Review */}
        {writeReview ? (
          <form onSubmit={handleSubmit(handleAddReview)} className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <textarea
              {...register('comment', { required: 'Comment is required' })}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-gray-500"
              placeholder="Write your review here..."
            ></textarea>
            {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}

            {/* Star Rating Component */}
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-lg font-semibold">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-black"
                  whileHover={{ scale: 1.2 }}
                >
                  {star <= rating ? <FaStar size={24} /> : <FaRegStar size={24} />}
                </motion.button>
              ))}
            </div>

            <div className="flex space-x-4 mt-4">
            <motion.button
  type="submit"
  className="px-5 py-2 bg-black text-white rounded"
  whileHover={{ scale: 1.1 }} // Scale the button to 1.1 times its size when hovered
  whileTap={{ scale: 0.9 }} // Scale the button to 0.9 times its size when pressed
>
  Submit
</motion.button>

              <motion.button
                type="button"
                onClick={() => setWriteReview(false)}
                className="px-5 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                whileHover={{ scale: 1.1 }} // Scale the button to 1.1 times its size when hovered
                whileTap={{ scale: 0.9 }} // Scale the button to 0.9 times its size when pressed
              >
                Cancel
              </motion.button>
            </div>
          </form>
        ) : (
          !loggedInUser?.isAdmin && (
            <button
              onClick={() => setWriteReview(true)}
              className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-yellow-600"
            >
              Write a Review
            </button>
          )
        )}
      </div>
    </div>
  );
};

// PropTypes Validation
Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
  averageRating: PropTypes.number.isRequired,
};

