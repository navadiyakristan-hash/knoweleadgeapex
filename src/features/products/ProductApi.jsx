// import axios from "axios";
// import { axiosi } from "../../config/axios";

// export const addProduct=async(data)=>{
//     try {
//         const res=await axiosi.post('/products',data)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }
// export const fetchProducts = async (filters) => {
//     let queryString = '';
    
//     if (filters?.brand?.length) {
//         filters.brand.forEach((brand) => {
//             queryString += `brand=${brand}&`;
//         });
//     }
//     if (filters?.category?.length) {
//         filters.category.forEach((category) => {
//             queryString += `category=${category}&`;
//         });
//     }
//     if (filters?.pagination) {
//         queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`;
//     }
//     if (filters?.sort) {
//         queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
//     }
//     if (filters?.user) {
//         queryString += `user=${filters.user}&`;
//     }

//     try {
//         const res = await axiosi.get(`/products?${queryString}`);
//         // const res =await axiosi.get(`/products`);
//         // Axios headers are accessed directly
       
//         const totalResults = parseInt(res.headers['x-total-count'], 10) || res.data.length;
//         return { data: res.data, totalResults };
//     } catch (error) {
//         console.log('feact prblem')
//         throw error.response?.data || error.message;
//     }
// };


  
// // export const fetchProducts = async () => {
// //     try {
// //       console.log("Fetching all products without filters...");
// //       const response = await fetch('http://localhost:8000/products');
// //       const data = await response.json();
// //       console.log("Fetched Products:", data);
// //       return data;
// //     } catch (error) {
// //       console.error("Error fetching products:", error);
// //       return [];
// //     }
// //   };
  





// export const fetchProductById=async(id)=>{
//     try {
//         const res=await axiosi.get(`/products/${id}`)
//         // const res = await axiosi.get(`/products`);
//         return res.data
       
        
//     } catch (error) {
//         throw error.response.data
//     }
// }
// export const updateProductById=async(update)=>{
//     try {
//         const res=await axiosi.patch(`/products/${update._id}`,update)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }
// export const undeleteProductById=async(id)=>{
//     try {
//         const res=await axiosi.patch(`/products/undelete/${id}`)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }
// export const deleteProductById=async(id)=>{
//     try {
//         const res=await axiosi.delete(`/products/${id}`)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }









import { axiosi } from "../../config/axios";

// Add Product
export const addProduct = async (data) => {
    try {
        const res = await axiosi.post('/products', data);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Something went wrong";
    }
};

// Fetch Products with Filters
// export const fetchProducts = async (filters = {}) => {
//     const params = new URLSearchParams();

//     if (filters.brand) filters.brand.forEach(brand => params.append('brand', brand));
//     if (filters.category) filters.category.forEach(category => params.append('category', category));
//     if (filters.pagination) {
//         params.append('page', filters.pagination.page);
//         params.append('limit', filters.pagination.limit);
//     }
//     if (filters.sort) {
//         params.append('sort', filters.sort.sort);
//         params.append('order', filters.sort.order);
//     }
//     if (filters.user) params.append('user', filters.user);

//     try {


//         const res = await axiosi.get(`/products?${params.toString()}`);
//         const totalResults = parseInt(res.headers['x-total-count'], 10) || res.data.length;
//         console.log(res.data);
//         return { data: res.data, totalResults };
//     } catch (error) {
//         console.error('Fetch problem:', error);
//         throw error.response?.data || error.message || "Error fetching products";
//     }
// };




export const fetchProducts = async (filters = {}) => {
    const params = new URLSearchParams();
  
    if (filters.brand) filters.brand.forEach(brand => params.append('brand', brand));
    if (filters.category) filters.category.forEach(category => params.append('category', category));
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.q) params.append('q', filters.q);
    if (filters.pagination) {
      params.append('page', filters.pagination.page);
      params.append('limit', filters.pagination.limit);
    }
    if (filters.sort) {
      params.append('sort', filters.sort.sort);
      params.append('order', filters.sort.order);
    }
    if (filters.user) params.append('user', filters.user);
  
    try {
      const res = await axiosi.get(`/products?${params.toString()}`);
      const totalResults = parseInt(res.headers['x-total-count'], 10) || res.data.length;
      return { data: res.data, totalResults };
    } catch (error) {
      console.error('Fetch problem:', error);
      throw error.response?.data || error.message || "Error fetching products";
    }
  };
  

// Fetch Product by ID
export const fetchProductById = async (id) => {
    try {
        const res = await axiosi.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Error fetching product details";
    }
};

// Update Product
export const updateProductById = async (update) => {
    try {
        const res = await axiosi.patch(`/products/${update._id}`, update);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Error updating product";
    }
};

// Restore Deleted Product
export const undeleteProductById = async (id) => {
    try {
        const res = await axiosi.patch(`/products/undelete/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Error restoring product";
    }
};

// Delete Product
export const deleteProductById = async (id) => {
    try {
        const res = await axiosi.delete(`/products/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Error deleting product";
    }
};



export const fetchGroupedByPrice = async () => {
    try {
      const res = await axiosi.get("/products/price-groups");
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message || "Error fetching grouped price data";
    }
  };
  
  
