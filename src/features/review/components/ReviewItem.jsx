import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { deleteReviewByIdAsync, updateReviewByIdAsync } from '../ReviewSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { motion } from 'framer-motion';

export const ReviewItem = ({ id, username, userid, comment, rating, createdAt }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [edit, setEdit] = useState(false);
  const [editRating, setEditRating] = useState(rating);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOwnReview = userid === loggedInUser?._id;

  const handleDeleteReview = () => {
    dispatch(deleteReviewByIdAsync(id));
    setMenuOpen(false);
  };

  const handleUpdateReview = (data) => {
    const updatedReview = { ...data, _id: id, rating: editRating };
    dispatch(updateReviewByIdAsync(updatedReview));
    setEdit(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Header: User Info and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">{username}</h3>
          <motion.div whileHover={{ scale: 1.1 }}>
            <input
              type="number"
              value={edit ? editRating : rating}
              readOnly={!edit}
              onChange={(e) => setEditRating(Number(e.target.value))}
              className={`w-12 text-center ${edit ? 'border rounded' : 'bg-transparent'}`}
            />
          </motion.div>
        </div>
        <div>
          {isOwnReview && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                ⋮
              </button>
              {menuOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded w-32">
                  <button
                    onClick={() => { setEdit(true); setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteReview}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Comment */}
      <div>
        {edit ? (
          <form onSubmit={handleSubmit(handleUpdateReview)} className="space-y-4">
            <textarea
              {...register('comment', { required: 'Comment is required', value: comment })}
              rows="4"
              className="w-full border rounded p-2 focus:ring-2 "
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2  text-white rounded bg-black hover:scale-90"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:scale-90 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-600">{comment}</p>
        )}
      </div>

      {/* Date */}
      <div className="text-right text-sm text-gray-400">
        {new Date(createdAt).toDateString()}
      </div>
    </div>
  );
};

// PropTypes Validation
ReviewItem.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userid: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};
