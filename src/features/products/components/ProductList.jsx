import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters } from '../ProductSlice'
import { ProductCard } from './ProductCard'

import { selectBrands, selectBrandStatus } from '../../brands/BrandSlice'

import { selectCategories } from '../../categories/CategoriesSlice'

import { ITEMS_PER_PAGE } from '../../../constants/index'
import {createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems} from '../../wishlist/WishlistSlice'
import {selectLoggedInUser} from '../../auth/AuthSlice'
import {toast} from 'react-toastify'
import {banner1, banner2, banner3, banner4, loadingAnimation} from '../../../assets'
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice'
import { motion } from 'framer-motion'
import { ProductBanner } from './ProductBanner'
import { useTheme } from '../../../theme/ThemeContext';
import Lottie from 'lottie-react'


// import Productsideshow from './Productsideshow'



const sortOptions = [
  { id: "price_asc", name: "Price: Low to High", sort: "price_asc" },
  { id: "price_desc", name: "Price: High to Low", sort: "price_desc" },
  { id: "name_asc", name: "Name: A to Z", sort: "name_asc" },
  { id: "name_desc", name: "Name: Z to A", sort: "name_desc" },
  { id: "rating", name: "Best Rating", sort: "rating" }
];


// const bannerImages=[banner1,banner3,banner2,banner4]

export const ProductList = () => {
    const [filters,setFilters]=useState({})
    // const [filters, setFilters] = useState({ brand: [] });

    const [page,setPage]=useState(1)
    const [sort,setSort]=useState(null)
 
    const products=useSelector(selectProducts)
    const totalResults=useSelector(selectProductTotalResults)
    const loggedInUser=useSelector(selectLoggedInUser)

    const productFetchStatus=useSelector(selectProductFetchStatus)

    const wishlistItems=useSelector(selectWishlistItems)
    const wishlistItemAddStatus=useSelector(selectWishlistItemAddStatus)
    const wishlistItemDeleteStatus=useSelector(selectWishlistItemDeleteStatus)

    const cartItemAddStatus=useSelector(selectCartItemAddStatus)

    const isProductFilterOpen=useSelector(selectProductIsFilterOpen)

    const dispatch=useDispatch()

      
  
    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"instant"
        })
    },[])

    useEffect(()=>{
        setPage(1)
    },[totalResults])

    useEffect(() => {
        const finalFilters = { ...filters };
        finalFilters.pagination = { page: page, limit: ITEMS_PER_PAGE };
        finalFilters.sort = sort;
        if (!loggedInUser?.isAdmin) finalFilters.user = true;
    
        dispatch(fetchProductsAsync(finalFilters))
          .unwrap()
          .then((res) => console.log('Fetched Products:', res))
          .catch((err) => console.error('Fetch Error:', err));
    }, [filters, page, sort]);

    const handleAddRemoveFromWishlist=(e,productId)=>{
        if(e.target.checked){
            const data={user:loggedInUser?._id,product:productId}
            dispatch(createWishlistItemAsync(data))
        }

        else if(!e.target.checked){
            const index=wishlistItems.findIndex((item)=>item.product._id===productId)
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        }
    }

    useEffect(()=>{
        if(wishlistItemAddStatus==='fulfilled'){
            toast.success("Product added to wishlist")
        }
        else if(wishlistItemAddStatus==='rejected'){
            toast.error("Error adding product to wishlist, please try again later")
        }

    },[wishlistItemAddStatus])


    useEffect(()=>{
        if(wishlistItemDeleteStatus==='fulfilled'){
            toast.success("Product removed from wishlist")
        }
        else if(wishlistItemDeleteStatus==='rejected'){
            toast.error("Error removing product from wishlist, please try again later")
        }
    },[wishlistItemDeleteStatus])

    useEffect(()=>{
        if(cartItemAddStatus==='fulfilled'){
            toast.success("Product added to cart")
        }
        else if(cartItemAddStatus==='rejected'){
            toast.error("Error adding product to cart, please try again later")
        }
        
    },[cartItemAddStatus])

    useEffect(()=>{
        if(productFetchStatus==='rejected'){
            toast.error("Error fetching products, please try again later")
        }
    },[productFetchStatus])


    
    





    useEffect(()=>{
        return ()=>{
            dispatch(resetProductFetchStatus())
            dispatch(resetWishlistItemAddStatus())
            dispatch(resetWishlistItemDeleteStatus())
            dispatch(resetCartItemAddStatus())
        }
    },[])

    const handleFilterClose=()=>{
        dispatch(toggleFilters())
    }

  return (
    <>
    {/* Filters Sidebar */}
    {productFetchStatus === 'pending' ? (
      <div className="w-[35vh] sm:w-[25rem] h-[calc(100vh-4rem)] flex justify-center mx-auto">
        <Lottie animationData={loadingAnimation} />
      </div>
    ) : (
      <motion.div
        className="fixed h-full p-4 overflow-y-scroll w-full sm:w-80 bg-gray-100 z-50 shadow-lg rounded-r-2xl"
        initial="hide"
        animate={isProductFilterOpen ? 'show' : 'hide'}
        transition={{ ease: 'easeInOut', duration: 0.7, type: 'spring' }}
        variants={{
          show: { left: 0 },
          hide: { left: '-500px' },
        }}
      >
        <div className="mb-20 overflow-y-scroll">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">New Arrivals</h2>
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none"
            onClick={handleFilterClose}
          >
            <motion.div whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }}>
              ✖
            </motion.div>
          </button>
          <div className="space-y-4 mt-4">
            {['Totes', 'Backpacks', 'Travel Bags', 'Hip Bags', 'Laptop Sleeves'].map((category) => (
              <p key={category} className="cursor-pointer font-medium text-xl text-black hover:text-blue-500">
                {category}
              </p>
            ))}
          </div>
         
    
        </div>
      </motion.div>
    )}   
  
    {/* Main Content */}
    <div className="px-4 sm:px-8  gap-8 ml-8  mt-24">
     

      <div className=" lg:flex-row  gap-y-4+ gap-8">
        <div className="relative flex justify-end items-center space-x-2 w-16"> 
          <label htmlFor="sort-dropdown" className=" text-sm font-medium text-gray-700">
            Sort
          </label>
          <select
            id="sort-dropdown"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="block w-full mt-1 border border-dark  rounded-md shadow-sm sm:text-sm"
          >
            <option className=' ' value="">Reset</option>
            {sortOptions.map((option) => (
              <option className='' key={option.id} value={option.sort}>
                {option.name}
              </option>
            ))}
          </select>
        </div>





<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8  ">





  {products.map((product) => (
    <ProductCard
    
      key={product._id} 
      id={product._id}
      title={product.title}
      thumbnail={product.thumbnail} 
      brand={product.brand?.name || 'Unknown'}
      price={product.price}
      handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
    />
  ))}
   
</div>

  
        <div className="flex flex-col justify-center items-center m-12 space-y-4">
          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2  rounded hover:bg-black hover:text-white disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil( ITEMS_PER_PAGE)}
            </span>
            <button
              // disabled={page === Math.ceil(totalResults / ITEMS_PER_PAGE)}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-black hover:scale-110 hover:text-white rounded  disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <p className="text-center text-xl font-bold shadow-lg font-sans  text-gray-800">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {page * ITEMS_PER_PAGE > totalResults ? totalResults : page * ITEMS_PER_PAGE} of {totalResults} results
          </p>
        </div>
      </div>
    </div>
  </>
);
};







