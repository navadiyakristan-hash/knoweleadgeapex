import React from 'react'
import { Checkout } from '../features/checkout/components/Checkout'
import {Footer} from '../features/footer/Footer'
// import { Navbar } from './../features/navigation/components/Navbar';

export const CheckoutPage = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Checkout/>
    <Footer/>
    </>
  )
}
