import React from 'react'

import {Navbar} from '../features/navigation/components/Navbar'
import { Footer } from '../features/footer/Footer'
import Wishlist from './../features/wishlist/components/Wishlist';

export const WishlistPage = () => {
  return (
    <>
    <Navbar/>
    <Wishlist/>
    <Footer/>
    </>
  )
}
