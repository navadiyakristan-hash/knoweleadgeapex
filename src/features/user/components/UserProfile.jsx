import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressUpdateStatus,
  selectAddressAddStatus,
  selectAddressDeleteStatus,
  selectAddressUpdateStatus,
  selectAddresses,
} from '../../address/AddressSlice';
import { selectUserInfo } from '../UserSlice';
import { Address } from '../../address/components/Address';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTheme } from '../../../theme/ThemeContext';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const theme = useTheme();
  const [addAddress, setAddAddress] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (addressAddStatus === 'fulfilled') {
      toast.success('Address added');
    } else if (addressAddStatus === 'rejected') {
      toast.error('Error adding address. Please try again later.');
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === 'fulfilled') {
      toast.success('Address updated');
    } else if (addressUpdateStatus === 'rejected') {
      toast.error('Error updating address. Please try again later.');
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === 'fulfilled') {
      toast.success('Address deleted');
    } else if (addressDeleteStatus === 'rejected') {
      toast.error('Error deleting address. Please try again later.');
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, [dispatch]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-start h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* User Details */}
        <div
          className="bg-gray-100 text-center p-4 rounded-md space-y-2"
          style={{ color: theme.colors.primary.main, fontFamily: theme.typography.fontFamily }}
        >
          <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto"></div>
          <h2 className="text-lg font-semibold">{userInfo?.name}</h2>
          <p className="text-gray-600">{userInfo?.email}</p>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          {/* Manage Addresses Heading */}
          <div className="flex items-center justify-between">
            <h3
              className="text-lg font-medium"
              style={{ fontFamily: theme.typography.fontFamily }}
            >
              Manage Addresses
            </h3>
            <button
              onClick={() => setAddAddress(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Add Address Form */}
          {addAddress && (
            <form
              onSubmit={handleSubmit(handleAddAddress)}
              className="space-y-4"
              style={{ fontFamily: theme.typography.fontFamily }}
            >
              <div>
                <label className="block text-gray-600 mb-1">Type</label>
                <input
                  {...register('type', { required: true })}
                  placeholder="Eg. Home, Business"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Street</label>
                <input
                  {...register('street', { required: true })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Postal Code</label>
                <input
                  {...register('postalCode', { required: true })}
                  type="number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Country</label>
                <input
                  {...register('country', { required: true })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <input
                  {...register('phoneNumber', { required: true })}
                  type="number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">State</label>
                <input
                  {...register('state', { required: true })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">City</label>
                <input
                  {...register('city', { required: true })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAddAddress(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Display Addresses */}
          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <Address
                  key={address._id}
                  id={address._id}
                  city={address.city}
                  country={address.country}
                  phoneNumber={address.phoneNumber}
                  postalCode={address.postalCode}
                  state={address.state}
                  street={address.street}
                  type={address.type}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have no added addresses.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
