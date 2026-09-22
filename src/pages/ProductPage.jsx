import React from "react";

import { Navbar } from './../features/navigation/components/Navbar';
import { Footer } from './../features/footer/Footer';
import SelectedProduct from './../features/products/components/SelectedProduct';

 const ProductPage = () => {
  return (
    <>
      <Navbar  isProductList={true} />
      <SelectedProduct />
      <Footer />
    </>
  );
};

export default ProductPage;
