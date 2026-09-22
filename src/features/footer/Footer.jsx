import React from 'react';
import { motion } from 'framer-motion';
import {
  QRCodePng,
  appStorePng,
  googlePlayPng,
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
} from '../../assets';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 p-8 space-y-16">
      {/* Upper Section */}
      <div className="flex flex-wrap justify-between gap-8">
        {/* Exclusive */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Exclusive</h3>
          <p>Subscribe to get 10% off your first order</p>
          <div className="flex items-center border border-gray-400 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Support</h3>
          <p className="cursor-pointer hover:text-gray-300">
            11th Main Street, Dhaka, DH 1515, California.
          </p>
          <p className="cursor-pointer hover:text-gray-300">exclusive@gmail.com</p>
          <p className="cursor-pointer hover:text-gray-300">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Account</h3>
          <p className="cursor-pointer hover:text-gray-300">My Account</p>
          <p className="cursor-pointer hover:text-gray-300">Login / Register</p>
          <p className="cursor-pointer hover:text-gray-300">Cart</p>
          <p className="cursor-pointer hover:text-gray-300">Wishlist</p>
          <p className="cursor-pointer hover:text-gray-300">Shop</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <p className="cursor-pointer hover:text-gray-300">Privacy Policy</p>
          <p className="cursor-pointer hover:text-gray-300">Terms of Use</p>
          <p className="cursor-pointer hover:text-gray-300">FAQ</p>
          <p className="cursor-pointer hover:text-gray-300">Contact</p>
        </div>

        {/* Download App */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Download App</h3>
          <p className="text-gray-400">Save $3 with App New User Only</p>
          <div className="flex items-center gap-4">
            <img
              src={QRCodePng}
              alt="QR Code"
              className="w-24 h-24 object-contain"
            />
            <div className="space-y-2">
              <img
                src={googlePlayPng}
                alt="Google Play"
                className="cursor-pointer hover:opacity-80"
              />
              <img
                src={appStorePng}
                alt="App Store"
                className="cursor-pointer hover:opacity-80"
              />
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 mt-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={facebookPng}
              alt="Facebook"
              className="cursor-pointer"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={twitterPng}
              alt="Twitter"
              className="cursor-pointer"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={instagramPng}
              alt="Instagram"
              className="cursor-pointer"
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={linkedinPng}
              alt="LinkedIn"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="text-center">
        <p className="text-gray-500">
          &copy; Mern Store {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
