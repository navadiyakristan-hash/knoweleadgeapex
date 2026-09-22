import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductDetails } from '../features/products/components/ProductDetails'
import { Footer } from '../features/footer/Footer'
import { ProductSlider } from './../features/products/components/ProductSlider';

export const ProductDetailsPage = () => {
  return (
    <>
    <Navbar/>
    <ProductDetails/>
   
    
    <ProductSlider/>
    
    

    <Footer/>
    </>
  )
}
