require("dotenv").config()
// import fetch from './node_modules/node-fetch/@types/index.d';
const express=require('express')
// const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const paymentsRoutes=require("./routes/Payment")
const { connectToDB } = require("./database/db")


// server init
const server=express()

// database connection
connectToDB()


// middlewares
// server.use(cors({credentials:true,origin:process.env.ORIGIN,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))

const cors = require('cors');
const { deleteProduct, seedProduct } = require("./seed/Product")
const { seedBrand, seedBrandDelet } = require("./seed/Brand")
const { seedCategory } = require("./seed/Category")


server.use(cors());


server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)
server.use("/payment", paymentsRoutes)

// seed data
// seedCategory()
// seedBrand()
// seedBrandDelet()
// deleteProduct()
// seedProduct()


server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

// server.get("/ ", (req,res)=>{
//     res.status(200).json({message:"DataBased Seeded"})

// })

server.listen(8000,()=>{
    console.log('Server started');
})







