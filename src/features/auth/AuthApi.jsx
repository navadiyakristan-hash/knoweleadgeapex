// import {axiosi} from '../../config/axios'
import { axiosi } from './../../config/axios';

// export const signup=async(cred)=>{
//     try {
//         const res=await axiosi.post("auth/signup",cred)
//         console.log('res', res.data)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }


export const signup = async (cred) => {
    console.log('cred in signup API:', cred); // Debugging credentials in API
    try {
        const res = await axiosi.post("auth/signup", cred);
        console.log('API response:', res.data); // Debugging API response
        return res.data;
    } catch (error) {
        console.error('API error:', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};



export const login=async(cred)=>{
    try {
        const res=await axiosi.post("auth/login",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const verifyOtp = async (cred) => {
    console.log("Sending OTP verification payload:", cred); // Debugging
    try {
      const res = await axiosi.post("auth/verify-otp", cred);
      console.log("Response from OTP verification API:", res.data); // Debugging
      return res.data;
    } catch (error) {
      console.error("Error in OTP verification API:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };
  
export const resendOtp=async(cred)=>{
    try {
        const res=await axiosi.post("auth/resend-otp",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/forgot-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}


export const checkAuth=async(cred)=>{
    try {
        const res=await axiosi.get("auth/check-auth",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}