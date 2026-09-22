import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAddressStatus,
  updateAddressByIdAsync,
  deleteAddressByIdAsync,
} from './../AddressSlice';
import { motion } from 'framer-motion';

export const Address = ({
  id,
  type,
  street,
  postalCode,
  country,
  phoneNumber,
  state,
  city,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [edit, setEdit] = useState(false);

  const status = useSelector(selectAddressStatus);

  const handleRemoveAddress = () => {
    dispatch(deleteAddressByIdAsync(id));
  };

  const handleUpdateAddress = (data) => {
    const updatedAddress = { ...data, _id: id };
    setEdit(false);
    dispatch(updateAddressByIdAsync(updatedAddress));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 mb-4">
      {/* Address Type */}
      <div className="bg-black text-white text-sm font-bold p-2 rounded mb-4">
        {type?.toUpperCase()}
      </div>

      {/* Address Details / Edit Form */}
      <form
        onSubmit={handleSubmit(handleUpdateAddress)}
        className="space-y-4"
        noValidate
      >
        {edit ? (
          <>
            <div>
              <label className="block text-gray-600 mb-1">Type</label>
              <input
                {...register('type', { required: 'Type is required', value: type })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Street</label>
              <input
                {...register('street', { required: 'Street is required', value: street })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Postal Code</label>
              <input
                type="number"
                {...register('postalCode', { required: 'Postal code is required', value: postalCode })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Country</label>
              <input
                {...register('country', { required: 'Country is required', value: country })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="number"
                {...register('phoneNumber', { required: 'Phone number is required', value: phoneNumber })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">State</label>
              <input
                {...register('state', { required: 'State is required', value: state })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">City</label>
              <input
                {...register('city', { required: 'City is required', value: city })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <p>Street: {street}</p>
            <p>Postal Code: {postalCode}</p>
            <p>Country: {country}</p>
            <p>Phone Number: {phoneNumber}</p>
            <p>State: {state}</p>
            <p>City: {city}</p>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {edit ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => { setEdit(false); reset(); }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleRemoveAddress}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </motion.button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

// PropTypes Validation
Address.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};
